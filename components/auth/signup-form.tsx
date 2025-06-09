"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertCircle, Loader2, UserPlus } from "lucide-react"

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormData = z.infer<typeof signupSchema>

interface SignupFormProps {
  onSuccess?: () => void
  onLoginClick?: () => void
}

export function SignupForm({ onSuccess, onLoginClick }: SignupFormProps) {
  const { signup } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await signup(data.name, data.email, data.password)

      if (result.success) {
        onSuccess?.()
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-lg dark:bg-gray-900">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          <span className="text-yellow-500">Create</span> an account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="name"
              placeholder="Full name"
              {...register("name")}
              className={`transition-all duration-200 ${
                errors.name ? "border-red-500" : "focus:border-yellow-500 focus:ring-yellow-500"
              }`}
              disabled={isSubmitting}
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

          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              {...register("email")}
              className={`transition-all duration-200 ${
                errors.email ? "border-red-500" : "focus:border-yellow-500 focus:ring-yellow-500"
              }`}
              disabled={isSubmitting}
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

          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`transition-all duration-200 ${
                errors.password ? "border-red-500" : "focus:border-yellow-500 focus:ring-yellow-500"
              }`}
              disabled={isSubmitting}
            />
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className={`transition-all duration-200 ${
                errors.confirmPassword ? "border-red-500" : "focus:border-yellow-500 focus:ring-yellow-500"
              }`}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-yellow-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-yellow-600"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-400">
              I agree to the{" "}
              <a href="#" className="text-yellow-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-yellow-500 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 rounded-lg transition-all duration-200"
          >
            {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UserPlus className="w-4 h-4 mr-2" />}
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pt-0">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">or</span>
          </div>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-500 dark:text-gray-400">Already have an account? </span>
          <button
            type="button"
            onClick={onLoginClick}
            className="text-yellow-500 hover:text-yellow-600 font-medium hover:underline"
          >
            Login
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}
