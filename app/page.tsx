"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Star, Quote, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContactForm } from "@/components/contact-form"
import { NewsletterForm } from "@/components/newsletter-form"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { MobileFooter } from "@/components/mobile-footer"
import { Navigation } from "@/components/navigation"

export default function Portfolio() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const projectsRef = useRef(null)
  const reviewsRef = useRef(null)
  const contactRef = useRef(null)

  const heroInView = useInView(heroRef, { once: true })
  const aboutInView = useInView(aboutRef, { once: true })
  const servicesInView = useInView(servicesRef, { once: true })
  const projectsInView = useInView(projectsRef, { once: true })
  const reviewsInView = useInView(reviewsRef, { once: true })
  const contactInView = useInView(contactRef, { once: true })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // WhatsApp click handler
  const handleWhatsAppClick = () => {
    const phoneNumber = "2349057542748" // Your WhatsApp number
    const message = "Hi! I'm interested in your web development services. Can we discuss my project?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const navigationItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ]

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that provide exceptional user experiences.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Fast, efficient websites optimized for speed and search engine visibility.",
    },
  ]

  const projects = [
    {
      title: "FinTech Payment Platform",
      description:
        "Secure payment processing system with multi-bank integration, real-time transactions, and comprehensive admin dashboard for Nigerian financial services.",
      tech: ["React", "Node.js", "PostgreSQL", "Paystack", "Redis"],
      image: "/placeholder.svg?height=300&width=500&text=FinTech+Platform",
    },
    {
      title: "E-Learning Management System",
      description:
        "Comprehensive LMS with video streaming, progress tracking, certificate generation, and mobile-responsive design for educational institutions.",
      tech: ["Next.js", "TypeScript", "Prisma", "AWS S3", "Stripe"],
      image: "/placeholder.svg?height=300&width=500&text=E-Learning+System",
    },
    {
      title: "Real Estate Marketplace",
      description:
        "Property listing platform with advanced search, virtual tours, mortgage calculator, and agent management system for the Nigerian market.",
      tech: ["React Native", "Firebase", "Google Maps", "Cloudinary"],
      image: "/placeholder.svg?height=300&width=500&text=Real+Estate+App",
    },
    {
      title: "Inventory Management System",
      description:
        "Enterprise-level inventory tracking with barcode scanning, automated reordering, analytics dashboard, and multi-location support.",
      tech: ["Vue.js", "Laravel", "MySQL", "Chart.js", "PWA"],
      image: "/placeholder.svg?height=300&width=500&text=Inventory+System",
    },
    {
      title: "Healthcare Appointment App",
      description:
        "Telemedicine platform connecting patients with doctors, featuring video consultations, prescription management, and health records.",
      tech: ["Flutter", "Node.js", "MongoDB", "WebRTC", "Socket.io"],
      image: "/placeholder.svg?height=300&width=500&text=Healthcare+App",
    },
    {
      title: "Logistics Tracking Platform",
      description:
        "End-to-end delivery management system with real-time GPS tracking, route optimization, and customer notification system.",
      tech: ["React", "Express.js", "PostgreSQL", "Google Maps", "Twilio"],
      image: "/placeholder.svg?height=300&width=500&text=Logistics+Platform",
    },
  ]

  const reviews = [
    {
      name: "Adebayo Ogundimu",
      role: "CEO, Lagos Tech Hub",
      content:
        "Outstanding developer! Built our fintech platform from scratch. The attention to detail and technical expertise is unmatched. Highly professional throughout the project.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Chioma Okwu",
      role: "Founder, Nkem Digital",
      content:
        "Delivered exactly what we needed for our e-commerce site. Great communication, met all deadlines, and the website performs beautifully. Will definitely work with again.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ibrahim Musa",
      role: "CTO, Abuja Innovations",
      content:
        "Exceptional work on our mobile app. Clean code, modern design, and excellent user experience. The project was completed ahead of schedule.",
      rating: 4.5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Funmi Adebisi",
      role: "Marketing Director, Zenith Creative",
      content:
        "Transformed our online presence completely. The new website increased our leads by 300%. Professional, reliable, and incredibly talented developer.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Emeka Okafor",
      role: "Managing Director, Port Harcourt Solutions",
      content:
        "Built a complex inventory management system for our business. The solution is robust, scalable, and has improved our operations significantly.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Aisha Garba",
      role: "Product Manager, Kano Tech",
      content:
        "Great experience working together. The dashboard he created is intuitive and powerful. Our team loves using it daily. Excellent technical skills.",
      rating: 4.5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Olumide Fashola",
      role: "Founder, Lagos Startup Collective",
      content:
        "Helped us launch our MVP in record time. The code quality is excellent and the architecture is solid. A true professional who delivers results.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Blessing Eze",
      role: "Operations Manager, Enugu Digital",
      content:
        "Outstanding developer with great problem-solving skills. Built our booking platform with seamless payment integration. Highly recommend his services.",
      rating: 4,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Yusuf Abdullahi",
      role: "CEO, Kaduna Web Solutions",
      content:
        "Professional, punctual, and produces high-quality work. The website he built for us is fast, responsive, and exactly what we envisioned.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ngozi Okonkwo",
      role: "Director, Owerri Business Hub",
      content:
        "Excellent communication throughout the project. Delivered a beautiful, functional website that our clients love. Will definitely hire again for future projects.",
      rating: 4.5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Tunde Bakare",
      role: "Tech Lead, Ibadan Innovations",
      content:
        "Impressive technical skills and attention to detail. The web application he developed is robust and user-friendly. Great experience working with him.",
      rating: 4.5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Fatima Aliyu",
      role: "Founder, Maiduguri Digital Agency",
      content:
        "Delivered beyond expectations! The e-learning platform he built is amazing. Students and teachers love the interface. Truly exceptional work.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-x-hidden transition-colors duration-300">
      {/* Cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-yellow-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* WhatsApp Float */}
      <WhatsAppFloat />

      {/* Navigation */}
      <Navigation items={navigationItems} />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black"
        />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              Web <span className="text-yellow-500">Developer</span>
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={heroInView ? { width: "100%" } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8 max-w-xs"
            />
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light">
              Creating digital experiences that combine beautiful design with powerful functionality
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex justify-center space-x-6"
            >
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                View Work
              </Button>
              <Button size="lg" className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-black">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8">
                About <span className="text-yellow-500">Me</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                I'm a passionate web developer with expertise in modern technologies and a keen eye for design. I
                specialize in creating seamless digital experiences that drive results.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                With years of experience in full-stack development, I help businesses establish their digital presence
                through custom solutions and strategic consulting.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow hover:bg-yellow-500 hover:text-black group"
                >
                  <Github className="w-5 h-5 group-hover:text-black" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow hover:bg-yellow-500 hover:text-black group"
                >
                  <Linkedin className="w-5 h-5 group-hover:text-black" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow-md transition-shadow hover:bg-yellow-500 hover:text-black group"
                >
                  <Mail className="w-5 h-5 group-hover:text-black" />
                </motion.a>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="aspect-square relative overflow-hidden rounded-2xl shadow-2xl">
                {/* Enhanced 4K-style image container */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/20 z-10" />
                <img
                  src="/images/profile.jpg"
                  alt="Professional headshot"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter contrast-110 saturate-110"
                />

                {/* Professional overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-20" />

                {/* Floating accent elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-500 rounded-full opacity-20 z-30"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-yellow-500 rounded-full opacity-30 z-30"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              <span className="text-yellow-500">Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive web development and consulting services tailored to your needs
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md dark:bg-gray-900 dark:hover:bg-gray-800 transition-all duration-300 h-full group">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-gray-100 dark:bg-gray-800 group-hover:bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300"
                    >
                      <service.icon className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-black transition-colors duration-300" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              <span className="text-yellow-500">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A selection of recent work showcasing modern web development
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="border-0 shadow-sm hover:shadow-xl dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full bg-gray-300 dark:bg-gray-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Button size="sm" className="rounded-full bg-yellow-500 hover:bg-yellow-600 text-black">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" ref={reviewsRef} className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Client <span className="text-yellow-500">Reviews</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              What clients say about working with me
            </p>
          </motion.div>

          {/* Scrollable Reviews Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#EAB308 #f3f4f6" }}
            >
              {reviews.map((review, index) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={reviewsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex-none w-80 snap-start"
                >
                  <Card className="border-0 shadow-sm hover:shadow-md dark:bg-gray-900 dark:hover:bg-gray-800 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Quote className="w-8 h-8 text-yellow-500 mb-2" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed italic text-sm">
                        "{review.content}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex-shrink-0" />
                          <div className="min-w-0">
                            <h4 className="font-semibold text-sm truncate">{review.name}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{review.role}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1 flex-shrink-0">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(review.rating)
                                  ? "fill-yellow-500 text-yellow-500"
                                  : i < review.rating
                                    ? "fill-yellow-500/50 text-yellow-500"
                                    : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(Math.ceil(reviews.length / 3))].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-32 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Let's Work <span className="text-yellow-500">Together</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6">Prefer to reach out directly?</p>
            <div className="flex justify-center space-x-8">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="mailto:your.email@example.com"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>your.email@example.com</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer - Desktop */}
      <footer className="hidden md:block bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold mb-4">
                <span className="text-yellow-500">{"<"}</span>
                Portfolio
                <span className="text-yellow-500">{"/>"}</span>
              </motion.div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Creating exceptional digital experiences through innovative web development and design solutions.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-yellow-500 rounded-lg transition-colors group"
                >
                  <Github className="w-5 h-5 group-hover:text-black" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-yellow-500 rounded-lg transition-colors group"
                >
                  <Linkedin className="w-5 h-5 group-hover:text-black" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="p-2 bg-gray-800 hover:bg-yellow-500 rounded-lg transition-colors group"
                >
                  <Mail className="w-5 h-5 group-hover:text-black" />
                </motion.a>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">Stay Updated</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Get the latest updates on web development trends, project insights, and exclusive content.
              </p>
              <NewsletterForm />
              <p className="text-xs text-gray-500 mt-3">No spam, unsubscribe at any time.</p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">Services</h3>
              <ul className="space-y-3">
                {[
                  "Web Development",
                  "UI/UX Design",
                  "E-commerce Solutions",
                  "Mobile Apps",
                  "Performance Optimization",
                  "Consulting",
                ].map((service) => (
                  <li key={service}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      {service}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "About", href: "#about" },
                  { name: "Projects", href: "#projects" },
                  { name: "Reviews", href: "#reviews" },
                  { name: "Contact", href: "#contact" },
                  { name: "Blog", href: "#" },
                  { name: "FAQ", href: "#" },
                ].map((link) => (
                  <li key={link.name}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={link.href}
                      className="text-gray-400 hover:text-yellow-500 transition-colors"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-500">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-400">your.email@example.com</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppClick}
                  className="flex items-center space-x-3 text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer group"
                >
                  <div className="w-5 h-5 flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-500 group-hover:fill-yellow-400">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
                    </svg>
                  </div>
                  <span>+234 905 754 2748</span>
                </motion.button>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-400">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span className="text-gray-400">Mon - Fri: 9AM - 6PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 Portfolio. All rights reserved. Crafted with <span className="text-yellow-500">♥</span> and
                attention to detail.
              </p>
              <div className="flex space-x-6 text-sm">
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Privacy Policy
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Terms of Service
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Sitemap
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer */}
      <MobileFooter handleWhatsAppClick={handleWhatsAppClick} />
    </div>
  )
}
