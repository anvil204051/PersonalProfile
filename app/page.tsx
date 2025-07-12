"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Phone, ExternalLink, Download, Award, Users, Target, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import emailjs from "emailjs-com";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);

  // Page loading effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  }

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  }

  const cardHoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Loading screen variants
  const loadingVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Main content variants - Remove scale and y transforms that might cause flashing
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  }

  const skillsData = [
    { name: "Java", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "C", category: "Languages" },
    { name: "JavaScript", category: "Languages" },
    { name: "TypeScript", category: "Languages" },
    { name: "HTML", category: "Languages" },
    { name: "CSS", category: "Languages" },
    { name: "Kotlin", category: "Languages" },
    { name: "SQL", category: "Languages" },
    { name: "React", category: "Frameworks" },
    { name: "ReactJS", category: "Frameworks" },
    { name: "Next.js", category: "Frameworks" },
    { name: "Node.js", category: "Frameworks" },
    { name: "Flask", category: "Frameworks" },
    { name: "PyTorch", category: "Frameworks" },
    { name: "AWT", category: "Frameworks" },
    { name: "Swing", category: "Frameworks" },
    { name: "Google Cloud Platform", category: "Tools" },
    { name: "Microsoft Azure", category: "Tools" },
    { name: "PyCharm", category: "Tools" },
    { name: "BlueJ", category: "Tools" },
    { name: "Supabase", category: "Tools" },
    { name: "Git", category: "Tools" },
    { name: "GitHub", category: "Tools" },
    { name: "Vercel", category: "Tools" },
    { name: "pandas", category: "Libraries" },
    { name: "NumPy", category: "Libraries" },
    { name: "Matplotlib", category: "Libraries" },
    { name: "LLaMa", category: "Libraries" },
    { name: "OCR", category: "Libraries" },
    { name: "Linear Regression", category: "Libraries" },
    { name: "Neural Networks", category: "Libraries" },
    { name: "Support Vector Machines", category: "Libraries" },
    { name: "Bayesian Methods", category: "Libraries" },
  ]

  const skillCategories = [
    { name: "Languages", color: "from-blue-500 to-blue-600" },
    { name: "Frameworks", color: "from-indigo-500 to-indigo-600" },
    { name: "Tools", color: "from-slate-500 to-slate-600" },
    { name: "Libraries", color: "from-blue-600 to-indigo-600" },
  ]

  const projects = [
    {
      title: "SkillMapper",
      description:
        "Built and deployed a full-stack web application using Next.js, React, and TypeScript that generates personalized career roadmaps with reliable, accessible resources tailored to the user's experience level and chosen career path.",
      tech: ["TypeScript", "Next.js", "ReactJS", "Tailwind CSS", "Vercel"],
      github: "https://github.com/anvil204051/SkillMapper",
      demo: "https://skill-mapper-eta.vercel.app/",
      date: "July 2025",
      showLinks: true,
      demoText: "Website",
    },
    {
      title: "Remodel",
      description:
        "Led backend development using Python, Supabase, and Flask to build a platform for creating custom AI apps, integrating LLaMA and OCR for processing complex inputs like PDFs and images.",
      tech: ["Python", "Flask", "ReactJS", "LLaMA", "OCR"],
      github: "https://github.com/anvil204051/remodel",
      demo: "https://youtu.be/cVle1uUzEwk",
      date: "Sept. 2023",
      showLinks: true,
      demoText: "Demo",
    },
    {
      title: "Personal Portfolio",
      description:
        "Designed and developed a modern, responsive portfolio website using React, Next.js, and Framer Motion. Features dynamic animations, dark mode support, and optimized performance with a clean, professional design showcasing projects and experience.",
      tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
      github: "https://github.com/anvil204051/PersonalProfile",
      demo: "#",
      date: "July 2025",
      showLinks: true,
    },
    {
      title: "Restaurant Booking System",
      description:
        "Interactive restaurant booking system with Java graphics and user-friendly interfaces. Designed with Java in BlueJ, incorporating interactive UI with Swing and AWT for seamless user experience.",
      tech: ["Java", "BlueJ", "AWT", "Swing"],
      date: "July 2023",
      showLinks: false,
    },
    {
      title: "Tesla Stock Prediction",
      description:
        "Machine learning project exploring 20+ models for accurate stock price predictions. Used Microsoft Azure, SQL databases, and virtual machines for AI analysis. Developed robust data pipelines, performed feature engineering, and compared model performance to optimize prediction accuracy.",
      tech: ["Python", "Linear Regression", "Neural Networks", "Azure"],
      date: "June 2022",
      showLinks: false,
    },
  ]

  const professionalExperiences = [
    {
      title: "Research Scholar",
      company: "Lumiere Research Program",
      location: "Remote",
      period: "June 2022 - Sep. 2022",
      description: [
        "Developed a machine learning model utilizing Bayesian probabilistic techniques to automate the process of data cleansing, improving accuracy in detecting and correcting errors in large datasets.",
        "Implemented probabilistic algorithms to identify misspellings and impute missing values, achieving high precision in pattern recognition across diverse data domains.",
      ],
    },
    {
      title: "Artificial Intelligence Intern",
      company: "Corporate Gurukul",
      location: "Remote",
      period: "June 2022 - Aug. 2022",
      description: [
        "Led a project on Tesla stock price prediction using linear regression, exploring 20+ models to identify the most accurate scatter plots and graphical projections.",
        "Gained hands-on experience with Neural Networks, Support Vector Machines, and variance functions, using software and hardware provided by Hewlett Packard Enterprise.",
      ],
    },
  ]

  const beyondCodeExperiences = [
    {
      title: "President",
      company: "Maryland Dhoom - South Asian Fusion Dance Team",
      location: "University of Maryland, College Park, MD",
      period: "April 2025 – Present",
      description: "Lead and manage a competitive collegiate fusion dance team at University of Maryland",
      achievements: [
        "Lead and manage a competitive collegiate fusion dance team, overseeing choreography, recruitment, and performance planning for national competitions",
        "Coordinate with university officials, event organizers, and external teams to handle logistics, registrations, and promotional efforts",
        "Foster a collaborative team environment by organizing practices, giving creative direction, and supporting member development both on and off stage",
      ],
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Fundraising Lead",
      company: "Two Left Feet",
      location: "Bangalore, India",
      period: "June 2024 – Aug. 2024",
      description:
        "Led a dance workshop fundraiser, teaching 30+ participants and donating proceeds to NGO Karunashraya",
      achievements: [
        "Designed and developed website using HTML for participant registration and payments, handling all technical aspects of the online platform",
        "Taught choreography to 30+ participants across multiple sessions, adapting teaching methods for different skill levels and age groups",
        "Successfully donated all proceeds to NGO Karunashraya through self-run initiative, managing financial transparency and donor communications",
        "Coordinated venue logistics, scheduling, and promotional activities across social media platforms to maximize participation and community engagement",
      ],
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: "House Captain",
      company: "Greenwood High International School",
      location: "Bangalore, India",
      period: "June 2022 – May 2023",
      description: "Led and coordinated a team of 100+ students across multiple school events and activities",
      achievements: [
        "Led and coordinated a team of 100+ students across multiple school events, including sports competitions, cultural fests, and inter-house activities, fostering teamwork and school spirit",
        "Organized and hosted house assemblies, motivating peers and setting a positive tone through speeches, planning, and student engagement",
        "Acted as a liaison between students and faculty, managing responsibilities, resolving conflicts, and ensuring smooth execution of house initiatives",
      ],
      icon: <Award className="h-6 w-6" />,
    },
  ]

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    emailjs
      .sendForm(
        "service_qugok1j",      // Your Service ID
        "template_akodk38",     // Your Template ID
        form.current,
        "84G26c8tysSM7P-YL"     // Your Public Key
      )
      .then(
        () => {
          setStatusMessage("Message sent!");
          form.current?.reset();
          setTimeout(() => setStatusMessage(null), 5000);
        },
        () => {
          setStatusMessage("Failed to send message. Please try again.");
          setTimeout(() => setStatusMessage(null), 5000);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          // Loading Screen
          <motion.div
            key="loading"
            variants={loadingVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center"
          >
            {/* Animated Background for Loading */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="text-center z-10">
              {/* Logo Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-1"
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="/IMG_2293.JPG" 
                    alt="Anvay Moghe" 
                    className="w-full h-full object-cover object-top"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </div>
              </motion.div>

              {/* Loading Text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl font-bold text-white mb-4"
              >
                Anvay Moghe
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-slate-400 mb-8"
              >
                Loading Portfolio...
              </motion.p>

              {/* Progress Bar */}
              <div className="w-64 mx-auto">
                <div className="bg-slate-700/50 rounded-full h-2 mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${loadingProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <motion.p
                  className="text-sm text-slate-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {Math.round(loadingProgress)}%
                </motion.p>
              </div>

              {/* Loading Dots */}
              <div className="flex justify-center space-x-2 mt-8">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          // Main Content
          <motion.div
            key="content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            className="relative z-10"
          >
            {/* Dynamic Animated Background - Much More Dynamic */}
            <div className="fixed inset-0 z-0">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(79, 70, 229, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 60% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)
            `,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -3, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Enhanced Floating Particles with Multiple Types */}
              {[...Array(50)].map((_, i) => {
                const particleType = i % 4
                const colors = ["bg-blue-400/40", "bg-indigo-400/40", "bg-purple-400/40", "bg-cyan-400/40"]
                const sizes = ["w-1 h-1", "w-2 h-2", "w-1.5 h-1.5", "w-0.5 h-0.5"]

                return (
                  <motion.div
                    key={i}
                    className={`absolute ${sizes[particleType]} ${colors[particleType]} rounded-full`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -150 - Math.random() * 100, 0],
                      x: [0, Math.random() * 60 - 30, 0],
                      opacity: [0, 0.8, 0.4, 0.8, 0],
                      scale: [0.5, 1.2, 0.8, 1, 0.5],
                    }}
                    transition={{
                      duration: Math.random() * 8 + 12,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 10,
                      ease: "easeInOut",
                    }}
                  />
                )
              })}

              {/* Pulsing Orbs */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`orb-${i}`}
                  className="absolute rounded-full blur-xl"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 100 + 50}px`,
                    height: `${Math.random() * 100 + 50}px`,
                    background: `radial-gradient(circle, ${
                      [
                        "rgba(59, 130, 246, 0.1)",
                        "rgba(99, 102, 241, 0.1)",
                        "rgba(147, 51, 234, 0.1)",
                        "rgba(6, 182, 212, 0.1)",
                      ][i % 4]
                    } 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                    x: [0, Math.random() * 100 - 50, 0],
                    y: [0, Math.random() * 100 - 50, 0],
                  }}
                  transition={{
                    duration: Math.random() * 15 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Shooting Stars */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    x: [0, 200],
                    y: [0, 100],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 15 + 5,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Connecting Lines Animation */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                {[...Array(12)].map((_, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1={`${Math.random() * 100}%`}
                    y1={`${Math.random() * 100}%`}
                    x2={`${Math.random() * 100}%`}
                    y2={`${Math.random() * 100}%`}
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                      x1: [0, Math.random() * 50 - 25],
                      y1: [0, Math.random() * 50 - 25],
                    }}
                    transition={{
                      duration: Math.random() * 8 + 6,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 10,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Geometric Shapes */}
              {[...Array(15)].map((_, i) => {
                const shapes = ["rounded-full", "rounded-lg", "rounded-none", "rounded-xl"]
                const shape = shapes[i % 4]

                return (
                  <motion.div
                    key={`shape-${i}`}
                    className={`absolute w-3 h-3 border border-blue-400/30 ${shape}`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      rotate: [0, 360],
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.2, 0.6, 0.2],
                      x: [0, Math.random() * 80 - 40, 0],
                      y: [0, Math.random() * 80 - 40, 0],
                    }}
                    transition={{
                      duration: Math.random() * 12 + 8,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 8,
                      ease: "linear",
                    }}
                  />
                )
              })}

              {/* Color-changing Dots */}
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`color-dot-${i}`}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    backgroundColor: [
                      "rgba(59, 130, 246, 0.4)",
                      "rgba(99, 102, 241, 0.4)",
                      "rgba(147, 51, 234, 0.4)",
                      "rgba(6, 182, 212, 0.4)",
                      "rgba(59, 130, 246, 0.4)",
                    ],
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 0.8, 0.3],
                    y: [0, -80, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Navigation */}
            <motion.nav
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50"
            >
              <div className="flex justify-between items-center py-4 px-8 w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition-colors duration-300"
                  onClick={() => scrollToSection("hero")}
                >
                  Anvay Moghe
                </motion.div>

                <div className="hidden md:flex space-x-8">
                  {["About", "Education", "Projects", "Experience", "Skills", "Contact"].map((item, index) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="relative px-4 py-2 text-slate-300 hover:text-white transition-all duration-300 group"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.nav>

            {/* Hero Section */}
            <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20 relative z-10">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center max-w-4xl mx-auto"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <motion.div
                    className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-1"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img 
                        src="/IMG_2293.JPG" 
                        alt="Anvay Moghe" 
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: 'center 20%' }}
                      />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent leading-tight py-2"
                >
                  Anvay Moghe
                </motion.h1>

                <motion.p variants={itemVariants} className="text-2xl md:text-3xl text-slate-300 mb-6 font-light">
                  Computer Science Student & Full-Stack Developer
                </motion.p>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  Passionate about building innovative solutions with machine learning, web development, and data
                  science. Currently pursuing Computer Science at University of Maryland.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-8">
                  <Button
                    onClick={() =>
                      window.open(
                        "https://drive.google.com/file/d/1OR6wgj642fgLjetqRk085DhTO8FngmFE/view?usp=sharing",
                        "_blank",
                      )
                    }
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white border-0 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    View Resume
                  </Button>
                  <Button
                    onClick={() => scrollToSection("projects")}
                    variant="outline"
                    size="lg"
                    className="border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400 px-8 py-3 rounded-lg font-semibold backdrop-blur-sm transition-all duration-300"
                  >
                    View My Projects
                  </Button>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    variant="outline"
                    size="lg"
                    className="border-2 border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10 hover:border-indigo-400 px-8 py-3 rounded-lg font-semibold backdrop-blur-sm transition-all duration-300"
                  >
                    Get in Touch
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center space-x-6">
                  {[
                    {
                      icon: <Github className="h-6 w-6" />,
                      href: "https://github.com/anvil204051",
                      color: "bg-slate-700 hover:bg-slate-600",
                    },
                    {
                      icon: <Linkedin className="h-6 w-6" />,
                      href: "https://www.linkedin.com/in/anvaym/",
                      color: "bg-blue-600 hover:bg-blue-700",
                    },
                    {
                      icon: <Mail className="h-6 w-6" />,
                      href: "mailto:anvay.moghe2005@gmail.com",
                      color: "bg-indigo-600 hover:bg-indigo-700",
                    },
                    {
                      icon: <Phone className="h-6 w-6" />,
                      href: "tel:240-501-3750",
                      color: "bg-slate-600 hover:bg-slate-500",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full ${social.color} text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl font-bold text-center mb-12 text-blue-400"
                  >
                    About Me
                  </motion.h2>
                  <motion.div
                    className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-lg text-slate-300 leading-relaxed space-y-6">
                      <p className="text-xl">
                        I'm a Computer Science student at the University of Maryland with a minor in Statistics and Data
                        Science. My passion lies in leveraging technology to solve real-world problems through
                        innovative software solutions.
                      </p>
                      <p>
                        With experience in machine learning, full-stack development, and data analysis, I've worked on
                        projects ranging from AI-powered career guidance platforms to stock prediction models. I'm
                        particularly interested in the intersection of artificial intelligence and web development.
                      </p>
                      <p>
                        Beyond coding, I'm actively involved in community initiatives, having led fundraising efforts
                        for NGOs and taught dance choreography to support charitable causes.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-24 px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl font-bold text-center mb-12 text-blue-400"
                  >
                    Education
                  </motion.h2>

                  <div className="space-y-6">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -3 }}
                      transition={{ duration: 0.3 }}
                      className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">University of Maryland, College Park</h4>
                          <p className="text-lg text-blue-300 font-medium">Bachelor of Science in Computer Science</p>
                          <p className="text-slate-400">Minor in Statistics and Data Science</p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <p className="text-slate-400 font-medium">May 2027</p>
                          <p className="text-slate-500">College Park, MD</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                          <span className="text-slate-300">
                            Relevant Coursework: Data Structures & Algorithms, Object Oriented Programming, Probability
                            Theory, Calc 3
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                          <span className="text-slate-300">
                            Activities: Maryland Dhoom Dance Team (President), Dean's List 2023 - 2025
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, y: -3 }}
                      transition={{ duration: 0.3 }}
                      className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-white mb-2">Greenwood High International School</h4>
                          <p className="text-lg text-blue-300 font-medium">High School Diploma</p>
                          <p className="text-slate-400">Indian School Certificate Programme</p>
                        </div>
                        <div className="text-right mt-2 md:mt-0">
                          <p className="text-slate-400 font-medium">May 2023</p>
                          <p className="text-slate-500">Bangalore, India</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                          <span className="text-slate-300">
                            ISC Subjects: Computer Science, Higher Level Mathematics, Physics
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></span>
                          <span className="text-slate-300">
                            Leadership: House Captain, Student Council Member, Academic Excellence Award
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Projects Section - Bigger Cards for Better Legibility */}
            <section id="projects" className="py-24 px-4 relative z-10">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl font-bold text-center mb-12 text-blue-400"
                  >
                    Featured Projects
                  </motion.h2>

                  {/* Top row - 3 projects */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {projects.slice(0, 3).map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        variants={cardHoverVariants}
                        whileHover="hover"
                        className="group cursor-pointer"
                      >
                        <Card className="h-[420px] bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-500 overflow-hidden">
                          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                          <CardContent className="p-8 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                {project.title}
                              </h3>
                              <span className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full min-w-[90px] text-center">
                                {project.date}
                              </span>
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed text-base flex-grow">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tech.slice(0, 4).map((tech, techIndex) => (
                                <motion.span
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: techIndex * 0.1 }}
                                  className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                            <div className="flex justify-between items-center mt-auto">
                              {project.showLinks && (
                                <div className="flex space-x-4">
                                  <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-slate-400 hover:text-blue-400 transition-colors group/link text-sm"
                                  >
                                    <Github className="h-4 w-4 mr-2 group-hover/link:scale-110 transition-transform" />
                                    Code
                                  </a>
                                  {project.title !== "Personal Portfolio" && (
                                    <a
                                      href={project.demo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center text-slate-400 hover:text-blue-400 transition-colors group/link text-sm"
                                    >
                                      <ExternalLink className="h-4 w-4 mr-2 group-hover/link:scale-110 transition-transform" />
                                      {project.demoText || "Demo"}
                                    </a>
                                  )}
                                </div>
                              )}
                              <button
                                onClick={() => scrollToSection("contact")}
                                className={`flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium ${
                                  !project.showLinks ? "ml-auto" : ""
                                }`}
                              >
                                Learn More
                                <ArrowDown className="h-4 w-4 ml-1" />
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom row - 2 projects centered */}
                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {projects.slice(3, 5).map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: (index + 3) * 0.1 }}
                        viewport={{ once: true }}
                        variants={cardHoverVariants}
                        whileHover="hover"
                        className="group cursor-pointer"
                      >
                        <Card className="h-[420px] bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-500 overflow-hidden">
                          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                          <CardContent className="p-8 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                {project.title}
                              </h3>
                              <span className="text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-full min-w-[90px] text-center">
                                {project.date}
                              </span>
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed text-base flex-grow">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tech.slice(0, 4).map((tech, techIndex) => (
                                <motion.span
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.4, delay: techIndex * 0.1 }}
                                  className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                            <div className="flex justify-end mt-auto">
                              <button
                                onClick={() => scrollToSection("contact")}
                                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
                              >
                                Learn More
                                <ArrowDown className="h-4 w-4 ml-1" />
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24 px-4 relative z-10">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl font-bold text-center mb-16 text-blue-400"
                  >
                    Experience
                  </motion.h2>

                  {/* Professional Experience */}
                  <div className="mb-16">
                    <motion.h3
                      variants={titleVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="text-3xl font-semibold mb-8 text-slate-200"
                    >
                      Professional Experience
                    </motion.h3>
                    <div className="space-y-8">
                      {professionalExperiences.map((exp, index) => (
                        <motion.div
                          key={exp.title}
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 group"
                        >
                          <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6"></div>
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                            <div>
                              <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                                {exp.title}
                              </h4>
                              <p className="text-xl text-blue-300 font-medium">{exp.company}</p>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                              <p className="text-slate-400 font-medium">{exp.period}</p>
                              <p className="text-slate-500">{exp.location}</p>
                            </div>
                          </div>
                          <ul className="space-y-3 mb-6">
                            {exp.description.map((item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-slate-300 flex items-start leading-relaxed"
                              >
                                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-3">
                            {exp.title === "Research Scholar" && (
                              <>
                                <a
                                  href="https://drive.google.com/file/d/1OmmX5ndI4mY7kw-b1kfNOYG18Zwk1-jp/view?usp=sharing"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-400/30 hover:border-blue-400/50 hover:bg-blue-600/30 transition-all duration-300 text-sm font-medium"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Certificate
                                </a>
                                <a
                                  href="https://docs.google.com/document/u/1/d/1NDd2u09-8Tql8XNDeNKT-fbzlQqzefvJ0IVFgzPdaDc/pub"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center px-4 py-2 bg-indigo-600/20 text-indigo-300 rounded-lg border border-indigo-400/30 hover:border-indigo-400/50 hover:bg-indigo-600/30 transition-all duration-300 text-sm font-medium"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Publication
                                </a>
                              </>
                            )}
                            {exp.title === "Artificial Intelligence Intern" && (
                              <a
                                href="https://drive.google.com/file/d/1geU4FLFgnebgExxn4PMzVEVRuScvw3p0/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg border border-blue-400/30 hover:border-blue-400/50 hover:bg-blue-600/30 transition-all duration-300 text-sm font-medium"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Certificate
                              </a>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Beyond Code Section */}
                  <div>
                    <motion.h3
                      variants={titleVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="text-3xl font-semibold mb-8 text-slate-200"
                    >
                      Beyond Code
                    </motion.h3>
                    <div className="space-y-8">
                      {beyondCodeExperiences.map((exp, index) => (
                        <motion.div
                          key={exp.title}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-400/30 transition-all duration-500 group"
                        >
                          <div className="h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-6"></div>
                          <div className="flex items-start mb-6">
                            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 mr-4 flex-shrink-0">
                              {exp.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                <div>
                                  <h4 className="text-2xl font-semibold mb-6 text-white group-hover:text-indigo-400 transition-colors duration-300">
                                    {exp.title}
                                  </h4>
                                  <p className="text-xl text-indigo-300 font-medium">{exp.company}</p>
                                  <p className="text-slate-400 mt-2">{exp.description}</p>
                                </div>
                                <div className="text-right mt-2 md:mt-0">
                                  <p className="text-slate-400 font-medium">{exp.period}</p>
                                  <p className="text-slate-500">{exp.location}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <ul className="space-y-3 ml-16">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-slate-300 flex items-start leading-relaxed"
                              >
                                <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                {achievement}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Skills Section - Compact and Uniform */}
            <section id="skills" className="py-24 px-4 relative z-10">
              <div className="max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl font-bold text-center mb-12 text-blue-400"
                  >
                    Frameworks & Tools
                  </motion.h2>

                  {/* 2x2 Grid Layout - Smaller and Uniform */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {skillCategories.map((category, categoryIndex) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, y: -3 }}
                        className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-500 h-64"
                      >
                        {/* Category Header */}
                        <div className="flex items-center mb-4">
                          <div className={`h-0.5 w-8 bg-gradient-to-r ${category.color} rounded-full mr-3`}></div>
                          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                        </div>

                        {/* Skills Grid within Category */}
                        <div className="grid grid-cols-3 gap-2 h-40 overflow-hidden">
                          {skillsData
                            .filter((skill) => skill.category === category.name)
                            .slice(0, 9)
                            .map((skill, index) => (
                              <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.03 }}
                                viewport={{ once: true }}
                                whileHover={{
                                  scale: 1.05,
                                  y: -1,
                                  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.15)",
                                }}
                                className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-2 text-center border border-slate-600/50 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group flex items-center justify-center"
                              >
                                <span className="text-xs font-medium text-slate-300 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                                  {skill.name}
                                </span>
                              </motion.div>
                            ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-4 relative z-10">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl font-bold text-center mb-12 text-blue-400"
                  >
                    Contact Me
                  </motion.h2>
                  <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50"
                    >
                      <h3 className="text-2xl font-semibold mb-6 text-white">Get in Touch</h3>
                      <div className="space-y-6">
                        {[
                          {
                            icon: <Mail className="h-6 w-6" />,
                            text: "anvay.moghe2005@gmail.com",
                            color: "bg-blue-600 hover:bg-blue-700",
                            href: "mailto:anvay.moghe2005@gmail.com",
                          },
                          {
                            icon: <Phone className="h-6 w-6" />,
                            text: "240-501-3750",
                            color: "bg-indigo-600 hover:bg-indigo-700",
                            href: "tel:240-501-3750",
                          },
                          {
                            icon: <Github className="h-6 w-6" />,
                            text: "github.com/anvil204051",
                            color: "bg-slate-600 hover:bg-slate-700",
                            href: "https://github.com/anvil204051",
                          },
                          {
                            icon: <Linkedin className="h-6 w-6" />,
                            text: "linkedin.com/in/anvaym",
                            color: "bg-blue-700 hover:bg-blue-800",
                            href: "https://www.linkedin.com/in/anvaym/",
                          },
                        ].map((contact, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center group cursor-pointer"
                            onClick={() => window.open(contact.href, "_blank")}
                          >
                            <div
                              className={`p-3 rounded-xl ${contact.color} mr-4 group-hover:scale-110 transition-transform duration-300`}
                            >
                              {contact.icon}
                            </div>
                            <span className="text-slate-300 group-hover:text-white transition-colors">
                              {contact.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.form
                      ref={form}
                      onSubmit={sendEmail}
                      className="space-y-6"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                        <input
                          name="name"
                          placeholder="Your Name"
                          className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 rounded-xl p-3 focus:outline-none transition-colors duration-300"
                          required
                        />
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                        <input
                          name="email"
                          type="email"
                          placeholder="Your Email"
                          className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 rounded-xl p-3 focus:outline-none transition-colors duration-300"
                          required
                        />
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                        <input
                          name="title"
                          placeholder="Subject"
                          className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 rounded-xl p-3 focus:outline-none transition-colors duration-300"
                          required
                        />
                      </div>
                      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          className="w-full bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 rounded-xl p-3 h-32 resize-none focus:outline-none transition-colors duration-300"
                          required
                        />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        Send Message
                      </Button>
                    </motion.form>
                    {statusMessage && (
                      <div className="mt-4 text-center text-lg font-semibold text-green-400">
                        {statusMessage}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
