"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactProps {
  theme: string
}

export default function Contact({ theme }: ContactProps) {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    }, 1500)

    // In a real implementation, you would send the form data to an API endpoint
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    // const data = await response.json();
    // setIsSubmitting(false);
    // if (response.ok) {
    //   setSubmitSuccess(true);
    //   setFormData({ name: '', email: '', subject: '', message: '' });
    // }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "muhammadmuzamilumrani@gmail.com",
      link: "mailto:muhammadmuzamilumrani@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "03147419170",
      link: "tel:03147419170",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Hyderabad, Sindh, Pakistan",
      link: "https://maps.google.com/?q=Hyderabad,Sindh,Pakistan",
    },
  ]

  return (
    <section
      id="contact"
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
              Get In Touch
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
              Have a project in mind or want to discuss opportunities? I'd love to hear from you!
            </p>
          </motion.div>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-white"} shadow-xl`}
          >
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={i}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-start space-x-4 p-4 rounded-lg ${
                    theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                  } transition-all duration-300`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 flex items-center justify-center text-white">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {info.title}
                    </h4>
                    <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-8">
              <h4 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Connect With Me
              </h4>
              <div className="flex space-x-4">{/* Social media icons would go here */}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-xl ${theme === "dark" ? "bg-gray-900" : "bg-white"} shadow-xl`}
          >
            <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`${
                      theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`${
                      theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`${
                    theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${
                    theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"
                  }`}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 hover:from-purple-600 hover:via-blue-600 hover:to-teal-600 text-white py-3 rounded-md font-medium transition-all duration-300"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-md bg-green-500/20 text-green-500 text-center"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-20 text-center">
        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
          © {new Date().getFullYear()} Muhammad Muzamil. All rights reserved.
        </p>
      </div>
    </section>
  )
}
