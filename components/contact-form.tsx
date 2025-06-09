"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react"
import { submitContactForm } from "@/app/actions/contact"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await submitContactForm(data)

      if (result.success) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-lg dark:bg-gray-900 max-w-2xl mx-auto">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4 text-yellow-500" />
              Name
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your full name"
              className={`transition-all duration-200 ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "focus:border-yellow-500 focus:ring-yellow-500"
              }`}
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.name.message}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-500" />
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className={`transition-all duration-200 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "focus:border-yellow-500 focus:ring-yellow-500"
              }`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.email.message}
              </motion.p>
            )}
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-yellow-500" />
              Subject
            </label>
            <Input
              id="subject"
              {...register("subject")}
              placeholder="Project inquiry, consultation, etc."
              className={`transition-all duration-200 ${
                errors.subject
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "focus:border-yellow-500 focus:ring-yellow-500"
              }`}
            />
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.subject.message}
              </motion.p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
              rows={6}
              className={`transition-all duration-200 resize-none ${
                errors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "focus:border-yellow-500 focus:ring-yellow-500"
              }`}
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.message.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                <p className="font-medium">Message sent successfully!</p>
              </div>
              <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                Thank you for reaching out. I'll get back to you within 24 hours.
              </p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">Failed to send message</p>
              </div>
              <p className="text-sm text-red-600 dark:text-red-500 mt-1">
                Please try again or contact me directly at your.email@example.com
              </p>
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
