"use client"

// Shared data structure for syncing between homepage and dashboard
export interface SharedData {
  skills: Skill[]
  projects: Project[]
  certificates: Certificate[]
  experiences: Experience[]
  resume: Resume | null
}

export interface Skill {
  id: string
  name: string
  icon: string
  category: string
  level: string
  color: string
  image?: string
  url?: string
}

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  github: string
  demo: string
  image: string
  featured: boolean
  url?: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialId: string
  image: string
  description: string
  url?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  description: string
  achievements: string[]
  logo: string
  image?: string
  url?: string
}

export interface Resume {
  id: string
  filename: string
  url: string
  uploadDate: string
  size: string
}

// Default data that syncs between homepage and dashboard
export const defaultData: SharedData = {
  skills: [
    { id: "1", name: "React", icon: "⚛️", category: "Frontend", level: "Expert", color: "from-blue-400 to-blue-600" },
    { id: "2", name: "Next.js", icon: "▲", category: "Frontend", level: "Expert", color: "from-gray-400 to-gray-600" },
    {
      id: "3",
      name: "TypeScript",
      icon: "📘",
      category: "Frontend",
      level: "Advanced",
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "4",
      name: "React Native",
      icon: "📱",
      category: "Mobile",
      level: "Expert",
      color: "from-green-400 to-green-600",
    },
    { id: "5", name: "Flutter", icon: "🦋", category: "Mobile", level: "Advanced", color: "from-cyan-400 to-cyan-600" },
    {
      id: "6",
      name: "Node.js",
      icon: "🟢",
      category: "Backend",
      level: "Advanced",
      color: "from-green-500 to-green-700",
    },
    {
      id: "7",
      name: "Python",
      icon: "🐍",
      category: "Backend",
      level: "Advanced",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "8",
      name: "MongoDB",
      icon: "🍃",
      category: "Database",
      level: "Advanced",
      color: "from-green-600 to-green-800",
    },
    {
      id: "9",
      name: "PostgreSQL",
      icon: "🐘",
      category: "Database",
      level: "Intermediate",
      color: "from-blue-600 to-blue-800",
    },
    {
      id: "10",
      name: "AWS",
      icon: "☁️",
      category: "Cloud",
      level: "Intermediate",
      color: "from-orange-400 to-orange-600",
    },
    {
      id: "11",
      name: "Docker",
      icon: "🐳",
      category: "DevOps",
      level: "Intermediate",
      color: "from-blue-500 to-blue-700",
    },
    { id: "12", name: "Git", icon: "🔀", category: "Tools", level: "Expert", color: "from-red-400 to-red-600" },
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Mobile App",
      description:
        "A full-featured mobile shopping app with real-time inventory, secure payments, and personalized recommendations.",
      tech: ["React Native", "Firebase", "Stripe", "Redux"],
      github: "https://github.com/dhyeyvisodiya",
      demo: "https://dhyeyvisodiya.com",
      image: "/placeholder.svg?height=200&width=300&text=E-Commerce+App",
      featured: true,
    },
    {
      id: "2",
      title: "AI-Powered Task Manager",
      description:
        "Intelligent project management tool with AI suggestions, real-time collaboration, and advanced analytics.",
      tech: ["Next.js", "OpenAI API", "MongoDB", "Socket.io"],
      github: "https://github.com/dhyeyvisodiya",
      demo: "https://dhyeyvisodiya.com",
      image: "/placeholder.svg?height=200&width=300&text=AI+Task+Manager",
      featured: true,
    },
    {
      id: "3",
      title: "Weather Forecast App",
      description: "Beautiful weather app with location-based forecasts, interactive maps, and severe weather alerts.",
      tech: ["Flutter", "Dart", "OpenWeather API", "Maps SDK"],
      github: "https://github.com/dhyeyvisodiya",
      demo: "https://dhyeyvisodiya.com",
      image: "/placeholder.svg?height=200&width=300&text=Weather+App",
      featured: false,
    },
    {
      id: "4",
      title: "Social Media Analytics",
      description:
        "Comprehensive analytics dashboard for social media management with data visualization and scheduling.",
      tech: ["React", "D3.js", "Node.js", "PostgreSQL"],
      github: "https://github.com/dhyeyvisodiya",
      demo: "https://dhyeyvisodiya.com",
      image: "/placeholder.svg?height=200&width=300&text=Analytics+Dashboard",
      featured: false,
    },
  ],
  certificates: [
    {
      id: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-SAA-2023-001",
      image: "/placeholder.svg?height=200&width=300&text=AWS+Certificate",
      description: "Comprehensive certification covering AWS cloud architecture and best practices.",
    },
    {
      id: "2",
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023",
      credentialId: "GCP-PD-2023-002",
      image: "/placeholder.svg?height=200&width=300&text=GCP+Certificate",
      description: "Advanced certification in Google Cloud Platform development and deployment.",
    },
    {
      id: "3",
      title: "Meta React Native Specialist",
      issuer: "Meta",
      date: "2022",
      credentialId: "META-RN-2022-003",
      image: "/placeholder.svg?height=200&width=300&text=Meta+Certificate",
      description: "Specialized certification in React Native development and mobile app architecture.",
    },
    {
      id: "4",
      title: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2022",
      credentialId: "MDB-DEV-2022-004",
      image: "/placeholder.svg?height=200&width=300&text=MongoDB+Certificate",
      description: "Professional certification in MongoDB database design and development.",
    },
  ],
  experiences: [
    {
      id: "1",
      title: "Senior App Developer",
      company: "TechFlow Solutions",
      period: "2022 - Present",
      location: "San Francisco, CA",
      description:
        "Leading mobile app development team, architecting scalable solutions, and mentoring junior developers.",
      achievements: [
        "Led development of 5+ mobile applications with 100K+ downloads",
        "Reduced app crash rate by 85% through performance optimization",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Mentored 8 junior developers and conducted technical interviews",
      ],
      logo: "🚀",
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "InnovateLab",
      period: "2020 - 2022",
      location: "Remote",
      description:
        "Developed end-to-end web applications using modern technologies and collaborated with cross-functional teams.",
      achievements: [
        "Built 10+ responsive web applications using React and Node.js",
        "Integrated payment systems processing $2M+ in transactions",
        "Optimized database queries improving response time by 40%",
        "Collaborated with design team to implement pixel-perfect UIs",
      ],
      logo: "💻",
    },
    {
      id: "3",
      title: "Mobile App Developer",
      company: "StartupHub",
      period: "2019 - 2020",
      location: "Austin, TX",
      description: "Focused on React Native development and cross-platform mobile solutions for startup clients.",
      achievements: [
        "Developed 15+ mobile apps for various startup clients",
        "Achieved 4.8+ average app store rating across all projects",
        "Reduced development time by 30% using reusable components",
        "Implemented real-time features using WebSocket technology",
      ],
      logo: "📱",
    },
    {
      id: "4",
      title: "Junior Software Developer",
      company: "CodeCraft Inc",
      period: "2018 - 2019",
      location: "New York, NY",
      description: "Started career focusing on web development and learning modern JavaScript frameworks.",
      achievements: [
        "Contributed to 8+ web development projects",
        "Learned React, Node.js, and modern development practices",
        "Participated in code reviews and agile development processes",
        "Built responsive user interfaces with attention to detail",
      ],
      logo: "🌟",
    },
  ],
  resume: {
    id: "1",
    filename: "Dhyey_Visodiya_Resume.pdf",
    url: "/placeholder.pdf",
    uploadDate: "2024-01-15",
    size: "2.5 MB",
  },
}

// Social media links
export const socialLinks = {
  github: "https://github.com/dhyeyvisodiya",
  linkedin: "https://linkedin.com/in/dhyeyvisodiya",
  email: "mailto:dhyeyvisodiya@gmail.com",
  twitter: "https://twitter.com/dhyeyvisodiya",
  instagram: "https://instagram.com/dhyeyvisodiya",
  website: "https://dhyeyvisodiya.com",
}
