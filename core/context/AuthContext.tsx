'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import apiClient from '@/core/clients/apiClient'
import { authConfig } from '@/core/configs/clientConfig'
import { loginRequest } from '@/components/auth/client/authClient'
import { getAuthResponseUser } from '@/components/auth/utils/authUser'
import { getErrorMessage } from '@/core/utils/apiError'
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
  setLoading: () => null,
  setAuthData: () => null
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

const setAuthData = (response: AuthResponse): void => {
  const { token, refreshToken } = response
  const userData = getAuthResponseUser(response)

  localStorage.setItem(authConfig.storageTokenKeyName, token)

  if (userData) {
    localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(userData))
  } else {
    localStorage.removeItem(authConfig.storageUserDataKeyName)
  }

  if (refreshToken) {
    localStorage.setItem(authConfig.storageRefreshTokenKeyName, refreshToken)
  } else {
    localStorage.removeItem(authConfig.storageRefreshTokenKeyName)
  }

  document.cookie = `${authConfig.cookieName}=${token}; path=/; max-age=${authConfig.cookieMaxAge}; SameSite=${authConfig.cookieSameSite}${
    authConfig.cookieSecure ? '; Secure' : ''
  }`

  if (userData?.role) {
    document.cookie = `userRole=${userData.role}; path=/; max-age=${authConfig.cookieMaxAge}; SameSite=${authConfig.cookieSameSite}${
      authConfig.cookieSecure ? '; Secure' : ''
    }`
  } else {
    document.cookie = `userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
  }

  setUser(userData ? { ...userData, freshLogin: true } : null)
}

  const login = async (credentials: LoginCredentials, onError?: ErrorCallback): Promise<void> => {
    try {
      setIsLoading(true)
      const response = await loginRequest(credentials)
      setAuthData(response)
    } catch (error) {
      console.error('Login failed:', error)
      onError?.(getErrorMessage(error, 'Login failed. Please try again.'))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (
    credentials: SignupPayload,
    onError?: ErrorCallback,
    redirect = true
  ): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await apiClient.post<AuthResponse>(
        authConfig.signupEndpoint,
        credentials,
        { timeout: authConfig.requestTimeout }
      )

      setAuthData(response.data)

      if (redirect) {
        router.push(authConfig.homePageURL)
      }

      return true
    } catch (error) {
      console.error('Signup failed:', error)
      const message = error instanceof Error ? error.message : 'Signup failed. Please try again.'
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
  document.cookie = `userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`

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
    setLoading: setIsLoading,
    setAuthData
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

