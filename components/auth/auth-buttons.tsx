"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth/auth-modal"
import { UserDropdown } from "@/components/auth/user-dropdown"
import { LogIn, UserPlus } from "lucide-react"

export function AuthButtons() {
  const { isAuthenticated, isLoading } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const openLoginModal = () => {
    setAuthMode("login")
    setIsModalOpen(true)
  }

  const openSignupModal = () => {
    setAuthMode("signup")
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <div className="h-10 w-20 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
  }

  if (isAuthenticated) {
    return <UserDropdown />
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={openLoginModal}
          className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Button>
        <Button size="sm" onClick={openSignupModal} className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <UserPlus className="w-4 h-4 mr-2" />
          Sign Up
        </Button>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialMode={authMode} />
    </>
  )
}
