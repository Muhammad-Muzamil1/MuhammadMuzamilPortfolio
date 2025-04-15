"use client"

import { useEffect, useRef } from "react"

interface CursorTrailProps {
  theme: string
}

export default function CursorTrail({ theme }: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: {
      x: number
      y: number
      size: number
      color: string
      vx: number
      vy: number
      life: number
      maxLife: number
    }[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 3 + 1
      const colors = theme === "dark" ? ["#8b5cf6", "#3b82f6", "#14b8a6"] : ["#a855f7", "#3b82f6", "#0d9488"]
      const color = colors[Math.floor(Math.random() * colors.length)]
      const vx = (Math.random() - 0.5) * 2
      const vy = (Math.random() - 0.5) * 2
      const maxLife = Math.random() * 50 + 50

      particles.push({
        x,
        y,
        size,
        color,
        vx,
        vy,
        life: 0,
        maxLife,
      })
    }

    const updateParticles = () => {
      particles = particles.filter((p) => p.life < p.maxLife)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life += 1
        p.size = p.size * (1 - p.life / p.maxLife)
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        ctx.globalAlpha = 1 - p.life / p.maxLife
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      for (let i = 0; i < 3; i++) {
        createParticle(x, y)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      updateParticles()
      drawParticles()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
}
