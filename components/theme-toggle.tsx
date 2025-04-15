"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  theme: string
  toggleTheme: () => void
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={toggleTheme}
      className={`p-2 rounded-full ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-lg transition-all duration-300 hover:scale-110`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-blue-600" />}
    </motion.button>
  )
}
