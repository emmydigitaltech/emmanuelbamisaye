"use server"

import { z } from "zod"
import { UserService } from "@/lib/user-service"
import { getSupabaseClient } from "@/lib/supabase"
import { headers } from "next/headers"

const newsletterSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export async function subscribeToNewsletter(data: NewsletterFormData) {
  try {
    // Validate the data
    const validatedData = newsletterSchema.parse(data)

    // Get current user if logged in
    const supabase = getSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Create a mock request object for tracking
    const headersList = headers()
    const mockRequest = {
      headers: {
        get: (name: string) => headersList.get(name),
      },
    } as Request

    // Subscribe to newsletter in Supabase
    const success = await UserService.subscribeToNewsletter(validatedData.email, user?.id, mockRequest)

    if (success) {
      // Also subscribe to EmailOctopus if you want to keep both
      const listId = "a4aa28f8-3ddd-11f0-944b-41222a104c52"
      const apiKey = process.env.EMAILOCTOPUS_API_KEY

      if (apiKey) {
        try {
          await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              email_address: validatedData.email,
              fields: {
                FirstName: validatedData.firstName,
                LastName: validatedData.lastName,
              },
              tags: ["portfolio-newsletter", "website-signup"],
              status: "SUBSCRIBED",
            }),
          })
        } catch (emailOctopusError) {
          console.error("EmailOctopus error:", emailOctopusError)
          // Continue even if EmailOctopus fails since we saved to Supabase
        }
      }

      return {
        success: true,
        message: "Successfully subscribed to newsletter",
      }
    } else {
      return {
        success: false,
        message: "Failed to subscribe. Please try again.",
      }
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please check all fields and try again",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Failed to subscribe. Please try again.",
    }
  }
}
