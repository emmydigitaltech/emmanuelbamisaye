"use server"

import { z } from "zod"
import { UserService } from "@/lib/user-service"
import { getSupabaseClient } from "@/lib/supabase"
import { headers } from "next/headers"

const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
})

type ContactFormData = z.infer<typeof contactSchema>

export async function submitContactForm(data: ContactFormData) {
  try {
    // Validate the data
    const validatedData = contactSchema.parse(data)

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

    // Submit to Supabase
    const success = await UserService.submitContactForm(
      validatedData.name,
      validatedData.email,
      validatedData.subject,
      validatedData.message,
      user?.id,
      mockRequest,
    )

    if (success) {
      return {
        success: true,
        message: "Message sent successfully",
      }
    } else {
      return {
        success: false,
        message: "Failed to send message. Please try again.",
      }
    }
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid form data",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "Failed to send message. Please try again.",
    }
  }
}
