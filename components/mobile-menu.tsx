"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileMenuProps {
  items: { name: string; href: string }[]
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-menu]")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div className="md:hidden" data-mobile-menu>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        aria-expanded={isOpen}
        aria-label="Toggle menu"
        className="relative z-50"
      >
        <AnimatePresence initial={false} mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black border-l border-gray-200 dark:border-gray-700 shadow-2xl z-40 flex flex-col"
            >
              {/* Header with Theme Toggle */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl font-bold"
                >
                  <span className="text-yellow-500">{"<"}</span>
                  Menu
                  <span className="text-yellow-500">{"/>"}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <ThemeToggle />
                </motion.div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-6 space-y-6 flex-1">
                {items.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                    className="text-2xl font-light text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors relative group"
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-yellow-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </nav>

              {/* Footer with CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
              >
                <div className="flex flex-col space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                    onClick={() => {
                      setIsOpen(false)
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    View Work
                  </Button>
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-yellow-500 hover:bg-yellow-600 text-black transition-all duration-300"
                    onClick={() => {
                      setIsOpen(false)
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Get in Touch
                  </Button>
                </div>

                {/* Small branding */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-gray-500 text-center mt-4"
                >
                  Crafted with <span className="text-yellow-500">♥</span> for great experiences
                </motion.p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
