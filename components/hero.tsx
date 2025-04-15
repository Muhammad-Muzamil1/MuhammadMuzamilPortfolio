"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Text3D, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"

interface HeroProps {
  theme: string
}

function Model() {
  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12} position={[-2.5, 0.5, 0]}>
          MUHAMMAD
          <meshStandardMaterial color="#8b5cf6" />
        </Text3D>
        <Text3D font="/fonts/Geist_Bold.json" size={0.5} height={0.1} curveSegments={12} position={[-1.5, -0.2, 0]}>
          MUZAMIL
          <meshStandardMaterial color="#3b82f6" />
        </Text3D>
        <mesh position={[0, -1, -1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={0x111111} roughness={0.8} metalness={0.2} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Hero({ theme }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Model />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
              Java Developer
            </span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Building scalable, high-performance applications with passion and precision
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:from-purple-600 hover:via-blue-600 hover:to-teal-600 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore My Work
          </Button>
          <Button
            variant="outline"
            className={`px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${
              theme === "dark" ? "border-white text-white" : "border-gray-800 text-gray-800"
            }`}
            onClick={() => {
              // In a real implementation, this would download the actual resume
              const link = document.createElement("a")
              link.href = "/resume.pdf" // This would be the actual path to the resume
              link.download = "Muhammad_Muzamil_Resume.pdf"
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
          >
            <ArrowDown
              className={`h-8 w-8 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
