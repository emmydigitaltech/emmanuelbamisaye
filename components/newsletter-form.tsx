"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Send, CheckCircle, AlertCircle, Users, ChevronDown, User } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions/newsletter"

const newsletterSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name too long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name too long"),
  email: z.string().email("Please enter a valid email address"),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export function NewsletterForm() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const emailValue = watch("email")

  const handleInitialSubmit = () => {
    if (!isExpanded) {
      // First click - expand the form if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailValue && emailRegex.test(emailValue)) {
        setIsExpanded(true)
      } else {
        // If email is invalid, let the form validation handle it
        handleSubmit(onSubmit)()
      }
    } else {
      // Form is expanded - submit normally
      handleSubmit(onSubmit)()
    }
  }

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const result = await subscribeToNewsletter(data)

      if (result.success) {
        setSubmitStatus("success")
        setIsExpanded(false)
        reset()
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.message)
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Email Field - Always Visible */}
        <div className="relative">
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email address"
            className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-12 focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-200 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 flex items-center gap-1 mt-1"
            >
              <AlertCircle className="w-3 h-3" />
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Expandable Name Fields */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-3"
              >
                {/* Name Fields Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Input
                      {...register("firstName")}
                      type="text"
                      placeholder="First name"
                      className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-200 ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 flex items-center gap-1 mt-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.firstName.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="relative">
                    <Input
                      {...register("lastName")}
                      type="text"
                      placeholder="Last name"
                      className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-yellow-500 transition-all duration-200 ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 flex items-center gap-1 mt-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.lastName.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Personalization Message */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/50 p-2 rounded-lg"
                >
                  <User className="w-3 h-3 text-yellow-500" />
                  <span>We'll personalize your newsletter experience with your name</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            onClick={handleInitialSubmit}
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
              />
            ) : (
              <>
                {!isExpanded ? (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe to Newsletter
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Complete Subscription
                  </>
                )}
              </>
            )}
          </Button>
        </motion.div>

        {/* Collapse Button (when expanded) */}
        <AnimatePresence>
          {isExpanded && !isSubmitting && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="w-full text-gray-400 hover:text-white hover:bg-gray-800"
              >
                Just email for now
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-green-900/30 border border-green-700 rounded-lg"
          >
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-4 h-4" />
              <p className="text-sm font-medium">Welcome to the newsletter!</p>
            </div>
            <p className="text-xs text-green-500 mt-1">
              You'll receive personalized updates on web development trends and project insights.
            </p>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-900/30 border border-red-700 rounded-lg"
          >
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm font-medium">Subscription failed</p>
            </div>
            <p className="text-xs text-red-500 mt-1">{errorMessage || "Please try again later."}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Stats */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Users className="w-3 h-3" />
        <span>Join 500+ developers getting personalized weekly insights</span>
      </div>
    </div>
  )
}
