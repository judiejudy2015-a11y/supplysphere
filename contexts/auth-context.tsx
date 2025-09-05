"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type User, type AuthState, authenticateUser, registerUser } from "@/lib/auth"

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("supplysphere_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const userData = await authenticateUser(email, password)
      if (userData) {
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem("supplysphere_user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const register = async (email: string, password: string, name: string, role: User["role"]): Promise<boolean> => {
    try {
      const userData = await registerUser(email, password, name, role)
      if (userData) {
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem("supplysphere_user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("supplysphere_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
