"use client"

import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "@/components/mobile-menu"
import { AuthButtons } from "@/components/auth/auth-buttons"

interface NavigationProps {
  items: { name: string; href: string }[]
}

export function Navigation({ items }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} className="text-xl font-bold">
          <span className="text-yellow-500">{"<"}</span>
          Portfolio
          <span className="text-yellow-500">{"/>"}</span>
        </motion.div>
        <div className="hidden md:flex space-x-8 items-center">
          {items.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AuthButtons />
          </div>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <AuthButtons />
          <MobileMenu items={items} />
        </div>
      </div>
    </motion.nav>
  )
}
