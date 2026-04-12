'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { authConfig } from '@/core/configs/clientConfig'
import type {
  User,
  LoginCredentials,
  SignupPayload,
  AuthResponse,
  AuthContextType,
  ErrorCallback
} from '@/core/configs/authConfig'

const defaultProvider: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(false),
  logout: () => Promise.resolve(),
  setUser: () => null,
  setLoading: () => null
}

const AuthContext = createContext<AuthContextType>(defaultProvider)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const isAuthenticated = !!user

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem(authConfig.storageTokenKeyName)
        const userData = localStorage.getItem(authConfig.storageUserDataKeyName)
        if (token && userData) {
          const parsedUser = JSON.parse(userData) as User
          setUser(parsedUser)
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error)
        localStorage.removeItem(authConfig.storageTokenKeyName)
        localStorage.removeItem(authConfig.storageUserDataKeyName)
        localStorage.removeItem(authConfig.storageRefreshTokenKeyName)
      } finally {
        setIsLoading(false)
      }
    }
    initAuth()
  }, [])

const login = async (credentials: LoginCredentials, onError?: ErrorCallback): Promise<void> => {
  try {
    setIsLoading(true)
    const response = await axios.post<AuthResponse>(`${authConfig.baseURL}${authConfig.loginEndpoint}`, credentials, {
      timeout: authConfig.requestTimeout
    })
    const { user: userData, accessToken, refreshToken } = response.data

    localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
    localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(userData))
    if (refreshToken) {
      localStorage.setItem(authConfig.storageRefreshTokenKeyName, refreshToken)
    }

    const isIncompleteAgencyOwner = userData.role === 'agencyOwner' && userData.agencyStatus === 'incomplete'

    if (!isIncompleteAgencyOwner) {
      document.cookie = `${authConfig.cookieName}=${accessToken}; path=/; max-age=${authConfig.cookieMaxAge}; SameSite=${authConfig.cookieSameSite}${authConfig.cookieSecure ? '; Secure' : ''}`
      router.push(authConfig.homePageURL)
    }

    setUser({ ...userData, freshLogin: true })
  } catch (error) {
    console.error('Login failed:', error)
    const message =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : 'Login failed. Please try again.'
    onError?.(message)
  } finally {
    setIsLoading(false)
  }
}

  const signup = async (credentials: SignupPayload, onError?: ErrorCallback): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await axios.post<AuthResponse>(
        `${authConfig.baseURL}${authConfig.signupEndpoint}`,
        credentials,
        { timeout: authConfig.requestTimeout }
      )
      const { user: userData, accessToken, refreshToken } = response.data

      localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
      localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(userData))
      if (refreshToken) {
        localStorage.setItem(authConfig.storageRefreshTokenKeyName, refreshToken)
      }

      document.cookie = `${authConfig.cookieName}=${accessToken}; path=/; max-age=${authConfig.cookieMaxAge}; SameSite=${authConfig.cookieSameSite}${authConfig.cookieSecure ? '; Secure' : ''}`

      setUser(userData)
      return true
    } catch (error) {
      console.error('Signup failed:', error)
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Signup failed. Please try again.'
      onError?.(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async (): Promise<void> => {
    setUser(null)
    localStorage.removeItem(authConfig.storageTokenKeyName)
    localStorage.removeItem(authConfig.storageUserDataKeyName)
    localStorage.removeItem(authConfig.storageRefreshTokenKeyName)
    document.cookie = `${authConfig.cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
    router.push(authConfig.loginPageURL)
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    setUser,
    setLoading: setIsLoading
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthContext }
