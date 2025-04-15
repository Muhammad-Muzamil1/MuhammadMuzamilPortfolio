"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import CursorTrail from "@/components/cursor-trail"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  const [theme, setTheme] = useState("dark")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / totalHeight
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <CursorTrail theme={theme} />
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div
        className="fixed left-0 top-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>
      <Navbar theme={theme} />
      <Hero theme={theme} />
      <About theme={theme} />
      <Skills theme={theme} />
      <Projects theme={theme} />
      <Contact theme={theme} />
    </main>
  )
}
