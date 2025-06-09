import { supabase } from "./supabase"

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: string
  bio?: string
  website?: string
  location?: string
  created_at: string
  updated_at: string
}

export interface UserActivity {
  id: string
  user_id: string
  activity_type: "login" | "logout" | "signup" | "profile_update" | "contact_form" | "newsletter_signup" | "page_view"
  activity_data?: any
  ip_address?: string
  user_agent?: string
  created_at: string
}

export class UserService {
  // Create user profile after signup
  static async createUserProfile(userId: string, email: string, fullName?: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .insert({
          id: userId,
          email,
          full_name: fullName,
          role: "user",
        })
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error creating user profile:", error)
      return null
    }
  }

  // Get user profile
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error fetching user profile:", error)
      return null
    }
  }

  // Update user profile
  static async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error updating user profile:", error)
      return null
    }
  }

  // Track user activity
  static async trackActivity(
    userId: string,
    activityType: UserActivity["activity_type"],
    activityData?: any,
    request?: Request,
  ): Promise<void> {
    try {
      const ip = request?.headers.get("x-forwarded-for") || request?.headers.get("x-real-ip")
      const userAgent = request?.headers.get("user-agent")

      await supabase.from("user_activities").insert({
        user_id: userId,
        activity_type: activityType,
        activity_data: activityData,
        ip_address: ip,
        user_agent: userAgent,
      })
    } catch (error) {
      console.error("Error tracking activity:", error)
    }
  }

  // Get user activities
  static async getUserActivities(userId: string, limit = 50): Promise<UserActivity[]> {
    try {
      const { data, error } = await supabase
        .from("user_activities")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Error fetching user activities:", error)
      return []
    }
  }

  // Submit contact form
  static async submitContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
    userId?: string,
    request?: Request,
  ): Promise<boolean> {
    try {
      const ip = request?.headers.get("x-forwarded-for") || request?.headers.get("x-real-ip")

      const { error } = await supabase.from("contact_submissions").insert({
        user_id: userId,
        name,
        email,
        subject,
        message,
        ip_address: ip,
      })

      if (error) throw error

      // Track activity if user is logged in
      if (userId) {
        await this.trackActivity(userId, "contact_form", { subject }, request)
      }

      return true
    } catch (error) {
      console.error("Error submitting contact form:", error)
      return false
    }
  }

  // Subscribe to newsletter
  static async subscribeToNewsletter(email: string, userId?: string, request?: Request): Promise<boolean> {
    try {
      const { error } = await supabase.from("newsletter_subscriptions").upsert({
        user_id: userId,
        email,
        status: "active",
      })

      if (error) throw error

      // Track activity if user is logged in
      if (userId) {
        await this.trackActivity(userId, "newsletter_signup", { email }, request)
      }

      return true
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      return false
    }
  }
}
