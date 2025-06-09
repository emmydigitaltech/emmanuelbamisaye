"use client"

import { supabase } from '../lib/supabase'


import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { getSupabaseClient } from "@/lib/supabase"
import { UserService, type UserProfile } from "@/lib/user-service"

type User = {
  id: string
  email: string
  name: string
  role: string
  profile?: UserProfile
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const supabase = getSupabaseClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        await handleUserSession(session.user)
      }
      setIsLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await handleUserSession(session.user)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleUserSession = async (supabaseUser: SupabaseUser) => {
    try {
      // Get or create user profile
      let profile = await UserService.getUserProfile(supabaseUser.id)

      if (!profile) {
        // Create profile if it doesn't exist
        profile = await UserService.createUserProfile(
          supabaseUser.id,
          supabaseUser.email!,
          supabaseUser.user_metadata?.full_name,
        )
      }

      const user: User = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: profile?.full_name || supabaseUser.user_metadata?.full_name || supabaseUser.email!.split("@")[0],
        role: profile?.role || "user",
        profile,
      }

      setUser(user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Error handling user session:", error)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, message: error.message }
      }

      if (data.user) {
        // Track login activity
        await UserService.trackActivity(data.user.id, "login")
        return { success: true, message: "Login successful" }
      }

      return { success: false, message: "Login failed" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        return { success: false, message: error.message }
      }

      if (data.user) {
        // Track signup activity
        await UserService.trackActivity(data.user.id, "signup", { name })
        return {
          success: true,
          message: "Account created successfully! Please check your email to verify your account.",
        }
      }

      return { success: false, message: "Signup failed" }
    } catch (error) {
      console.error("Signup error:", error)
      return { success: false, message: "An error occurred during signup" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      if (user) {
        await UserService.trackActivity(user.id, "logout")
      }
      await supabase.auth.signOut()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return false

    try {
      const updatedProfile = await UserService.updateUserProfile(user.id, updates)
      if (updatedProfile) {
        setUser((prev) => (prev ? { ...prev, profile: updatedProfile } : null))
        await UserService.trackActivity(user.id, "profile_update", updates)
        return true
      }
      return false
    } catch (error) {
      console.error("Profile update error:", error)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile,
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
