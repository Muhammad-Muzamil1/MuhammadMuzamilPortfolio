"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  theme: string
}

export default function Navbar({ theme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled
          ? `${theme === "dark" ? "bg-gray-900/80" : "bg-white/80"} backdrop-blur-md shadow-lg`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <a href="#home" className="text-xl font-bold tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
                Muhammad Muzamil
              </span>
            </a>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
              } focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}
