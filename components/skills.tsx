"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Database, Server, Cpu, PenToolIcon as Tool, Layers } from "lucide-react"

interface SkillsProps {
  theme: string
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

export default function Skills({ theme }: SkillsProps) {
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

  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      icon: <Code className="h-6 w-6" />,
      skills: ["Java", "SQL", "HTML 5", "CSS3", "JavaScript"],
    },
    {
      title: "Frameworks",
      icon: <Layers className="h-6 w-6" />,
      skills: ["Spring Boot", "Bootstrap", "Tailwind CSS", "Hibernate", "Collection Framework"],
    },
    {
      title: "Databases",
      icon: <Database className="h-6 w-6" />,
      skills: ["MySQL", "MongoDB", "Redis"],
    },
    {
      title: "Tools",
      icon: <Tool className="h-6 w-6" />,
      skills: ["IntelliJ IDE", "VS Code", "Postman", "Git", "Linux", "GitHub"],
    },
    {
      title: "Backend",
      icon: <Server className="h-6 w-6" />,
      skills: ["RESTful APIs", "Spring Security", "JWT", "Swagger", "Kafka"],
    },
    {
      title: "Concepts",
      icon: <Cpu className="h-6 w-6" />,
      skills: ["OOP", "SOLID Principles", "MVC Architecture", "JUnit", "Soft Skills"],
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <section
      id="skills"
      ref={containerRef}
      className={`min-h-screen py-20 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
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
              My Skills
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
              A comprehensive toolkit that enables me to build robust, scalable applications
            </p>
          </motion.div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              } shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 flex items-center justify-center text-white">
                  {category.icon}
                </div>
                <h3 className={`ml-4 text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + j * 0.05, duration: 0.3 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-800"
                    } hover:bg-gradient-to-r hover:from-purple-500 hover:via-blue-500 hover:to-teal-500 hover:text-white transition-all duration-300`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
