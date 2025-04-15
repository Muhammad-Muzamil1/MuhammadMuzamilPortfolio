"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from "@react-three/drei"

interface ProjectsProps {
  theme: string
}

interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
  link: string
  github: string
  period: string
  location: string
}

export default function Projects({ theme }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const projects: Project[] = [
    {
      title: "Abu-Hanan's Urban School",
      description:
        "A comprehensive web-based School Management System built with Spring Boot, Spring Security, MongoDB Atlas, and Thymeleaf, featuring dedicated portals for Admin, Student, Teacher, and Manager. The system integrates RESTful APIs, Role-Based Authorization, JWT Authentication, and Redis caching for performance.",
      technologies: ["Spring Boot", "MongoDB", "Spring Security", "JWT", "Redis", "Thymeleaf"],
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
      github: "#",
      period: "01/2025-03/2025",
      location: "Hyderabad City, Pakistan",
    },
    {
      title: "University Entry Test System",
      description:
        "A Java-based desktop application built using JavaFX, Java Swing, and MySQL, designed to streamline university entry test management. The system features admin and student portals, where admins can create and manage test questions, set exam schedules, and evaluate results, while students can register, attempt tests, and view scores.",
      technologies: ["Java", "JavaFX", "Java Swing", "MySQL", "JDBC"],
      image: "/placeholder.svg?height=400&width=600",
      link: "#",
      github: "#",
      period: "02/2024-03/2024",
      location: "University Project",
    },
  ]

  const [currentProject, setCurrentProject] = useState(0)

  const nextProject = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  function ProjectCard3D({ project, index }: { project: Project; index: number }) {
    return (
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <Html transform distanceFactor={10} position={[0, 0, 0]} rotation={[0, 0, 0]} className="w-[600px]">
          <div
            className={`w-full p-6 rounded-xl shadow-2xl ${
              theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
              {project.title}
            </h3>
            <div className="flex items-center text-sm mb-4">
              <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {project.period} • {project.location}
              </span>
            </div>
            <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:from-purple-600 hover:via-blue-600 hover:to-teal-600 text-white"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Project
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`${theme === "dark" ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"}`}
              >
                <Github className="mr-2 h-4 w-4" />
                Source Code
              </Button>
            </div>
          </div>
        </Html>
      </Float>
    )
  }

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`min-h-screen py-20 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <motion.div style={{ opacity, y }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
              My Projects
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Showcasing my work and technical expertise through real-world applications
            </p>
          </motion.div>
        </div>

        <div ref={ref} className="relative">
          <div className="h-[600px] w-full">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 15]} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
              <ProjectCard3D project={projects[currentProject]} index={currentProject} />
              <Environment preset="city" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                autoRotate={false}
                minPolarAngle={Math.PI / 2 - 0.5}
                maxPolarAngle={Math.PI / 2 + 0.5}
              />
            </Canvas>
          </div>

          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
              onClick={prevProject}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex space-x-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentProject(i)}
                  className={`w-3 h-3 rounded-full ${
                    i === currentProject
                      ? "bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"
                      : theme === "dark"
                        ? "bg-gray-700"
                        : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
              onClick={nextProject}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
