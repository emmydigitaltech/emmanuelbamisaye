"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"

type AuthMode = "login" | "signup"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: AuthMode
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)

  const handleSuccess = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none">
        {mode === "login" ? (
          <LoginForm onSuccess={handleSuccess} onSignupClick={() => setMode("signup")} />
        ) : (
          <SignupForm onSuccess={handleSuccess} onLoginClick={() => setMode("login")} />
        )}
      </DialogContent>
    </Dialog>
  )
}
