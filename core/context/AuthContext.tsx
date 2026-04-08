'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { authConfig } from '@/core/configs/clientConfig'
import { getAuthResponseUser } from '@/components/auth/utils/authUser'
import type {
  User,
  SignupPayload,
  AuthResponse,
  AuthContextType,
  ErrorCallback
} from '@/core/configs/authConfig'

const defaultProvider: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signup: () => Promise.resolve(),
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
    const { accessToken, refreshToken } = response
    const userData = getAuthResponseUser(response)

    localStorage.setItem(authConfig.storageTokenKeyName, accessToken)
    if (userData) {
      localStorage.setItem(authConfig.storageUserDataKeyName, JSON.stringify(userData))
    } else {
      localStorage.removeItem(authConfig.storageUserDataKeyName)
    }

    if (refreshToken) {
      localStorage.setItem(authConfig.storageRefreshTokenKeyName, refreshToken)
    }

    document.cookie = `${authConfig.cookieName}=${accessToken}; path=/; max-age=${authConfig.cookieMaxAge}; SameSite=${authConfig.cookieSameSite}${
      authConfig.cookieSecure ? '; Secure' : ''
    }`

    setUser(userData)
  }

  const signup = async (_credentials: SignupPayload, onError?: ErrorCallback): Promise<void> => {
    try {
      setIsLoading(true)
    } catch (error) {
      console.error('Signup failed:', error)
      const message = error instanceof Error ? error.message : 'Signup failed. Please try again.'
      onError?.(message)
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
