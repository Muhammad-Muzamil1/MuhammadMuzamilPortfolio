"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface AboutProps {
  theme: string
}

export default function About({ theme }: AboutProps) {
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

  const journeyItems = [
    {
      year: "2022",
      title: "Started Software Engineering",
      description: "Began my journey at Quaid-e-Awam University of Engineering",
    },
    {
      year: "2024",
      title: "First Project",
      description: "Developed University Entry Test System as a desktop application",
    },
    {
      year: "2024",
      title: "Java Internship",
      description: "Completed Java Programming Internship at CodeAlpha Infotech",
    },
    {
      year: "2025",
      title: "Backend Development",
      description: "Specialized in Java Backend Web Development at EcodeCamp",
    },
    {
      year: "2025",
      title: "School Management System",
      description: "Built comprehensive web-based School Management System",
    },
  ]

  return (
    <section
      id="about"
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
              About Me
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
              I'm a passionate Backend Java Developer with a love for building scalable, high-performance applications.
              My journey in software development is driven by curiosity and a desire to solve complex problems.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`p-6 rounded-xl ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-xl`}
          >
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              My Story
            </h3>
            <div className={`space-y-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              <p>
                I specialize in Java technologies, API development, and database management, with a solid understanding
                of frontend technologies. My approach combines technical expertise with creative problem-solving to
                deliver robust solutions.
              </p>
              <p>
                Beyond coding, I'm constantly exploring new technologies and methodologies to stay at the forefront of
                the ever-evolving tech landscape. I believe in writing clean, maintainable code that not only works
                efficiently but is also easy for others to understand and build upon.
              </p>
              <p>
                My goal is to create software that makes a meaningful impact, whether it's streamlining business
                processes, enhancing user experiences, or solving complex technical challenges.
              </p>
            </div>
          </motion.div>

          <div ref={ref} className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
              My Journey
            </h3>
            {journeyItems.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className={`flex items-start space-x-4 p-4 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                } shadow-md transition-all duration-300 hover:shadow-xl`}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {item.title}
                  </h4>
                  <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
