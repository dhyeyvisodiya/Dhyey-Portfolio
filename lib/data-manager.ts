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

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  tags: string[]
  publishDate: string
  readTime: number
  featured: boolean
  url?: string
}

export interface Resume {
  id: string
  filename: string
  url: string
  uploadDate: string
  size: string
}

export interface Settings {
  language: "en" | "es" | "fr"
  analytics: boolean
}

export interface PortfolioData {
  skills: Skill[]
  projects: Project[]
  certificates: Certificate[]
  experiences: Experience[]
  blogPosts: BlogPost[]
  resume: Resume | null
  profileImage: string
  settings: Settings
}

class DataManager {
  private data: PortfolioData
  private subscribers: (() => void)[] = []
  private storageKey = "portfolio-data"

  constructor() {
    this.data = this.loadData()
  }

  private loadData(): PortfolioData {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        return {
          ...this.getDefaultData(),
          ...parsed,
        }
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error)
    }
    return this.getDefaultData()
  }

  private getDefaultData(): PortfolioData {
    return {
      skills: [],
      projects: [],
      certificates: [],
      experiences: [],
      blogPosts: [],
      resume: null,
      profileImage: "/placeholder.svg?height=400&width=400&text=Profile+Photo",
      settings: {
        language: "en",
        analytics: true,
      },
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data))
      this.notifySubscribers()
    } catch (error) {
      console.error("Error saving data to localStorage:", error)
    }
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback())
  }

  // Public methods
  getData(): PortfolioData {
    return { ...this.data }
  }

  subscribe(callback: () => void): () => void {
    this.subscribers.push(callback)
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback)
    }
  }

  // Skills CRUD
  addSkill(skill: Omit<Skill, "id">): void {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString(),
    }
    this.data.skills.push(newSkill)
    this.saveData()
  }

  updateSkill(id: string, updates: Partial<Skill>): void {
    const index = this.data.skills.findIndex((skill) => skill.id === id)
    if (index !== -1) {
      this.data.skills[index] = { ...this.data.skills[index], ...updates }
      this.saveData()
    }
  }

  deleteSkill(id: string): void {
    this.data.skills = this.data.skills.filter((skill) => skill.id !== id)
    this.saveData()
  }

  // Projects CRUD
  addProject(project: Omit<Project, "id">): void {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    }
    this.data.projects.push(newProject)
    this.saveData()
  }

  updateProject(id: string, updates: Partial<Project>): void {
    const index = this.data.projects.findIndex((project) => project.id === id)
    if (index !== -1) {
      this.data.projects[index] = { ...this.data.projects[index], ...updates }
      this.saveData()
    }
  }

  deleteProject(id: string): void {
    this.data.projects = this.data.projects.filter((project) => project.id !== id)
    this.saveData()
  }

  // Certificates CRUD
  addCertificate(certificate: Omit<Certificate, "id">): void {
    const newCertificate: Certificate = {
      ...certificate,
      id: Date.now().toString(),
    }
    this.data.certificates.push(newCertificate)
    this.saveData()
  }

  updateCertificate(id: string, updates: Partial<Certificate>): void {
    const index = this.data.certificates.findIndex((cert) => cert.id === id)
    if (index !== -1) {
      this.data.certificates[index] = { ...this.data.certificates[index], ...updates }
      this.saveData()
    }
  }

  deleteCertificate(id: string): void {
    this.data.certificates = this.data.certificates.filter((cert) => cert.id !== id)
    this.saveData()
  }

  // Experiences CRUD
  addExperience(experience: Omit<Experience, "id">): void {
    const newExperience: Experience = {
      ...experience,
      id: Date.now().toString(),
    }
    this.data.experiences.push(newExperience)
    this.saveData()
  }

  updateExperience(id: string, updates: Partial<Experience>): void {
    const index = this.data.experiences.findIndex((exp) => exp.id === id)
    if (index !== -1) {
      this.data.experiences[index] = { ...this.data.experiences[index], ...updates }
      this.saveData()
    }
  }

  deleteExperience(id: string): void {
    this.data.experiences = this.data.experiences.filter((exp) => exp.id !== id)
    this.saveData()
  }

  // Blog Posts CRUD
  addBlogPost(post: Omit<BlogPost, "id">): void {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
    }
    this.data.blogPosts.push(newPost)
    this.saveData()
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): void {
    const index = this.data.blogPosts.findIndex((post) => post.id === id)
    if (index !== -1) {
      this.data.blogPosts[index] = { ...this.data.blogPosts[index], ...updates }
      this.saveData()
    }
  }

  deleteBlogPost(id: string): void {
    this.data.blogPosts = this.data.blogPosts.filter((post) => post.id !== id)
    this.saveData()
  }

  // Resume management
  setResume(resume: Resume): void {
    this.data.resume = resume
    this.saveData()
  }

  // Profile image
  setProfileImage(imageUrl: string): void {
    this.data.profileImage = imageUrl
    this.saveData()
  }

  // Settings
  updateSettings(updates: Partial<Settings>): void {
    this.data.settings = { ...this.data.settings, ...updates }
    this.saveData()
  }

  // Search functionality
  search(query: string): {
    skills: Skill[]
    projects: Project[]
    certificates: Certificate[]
    experiences: Experience[]
    blogPosts: BlogPost[]
  } {
    const searchTerm = query.toLowerCase()

    return {
      skills: this.data.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchTerm) ||
          skill.category.toLowerCase().includes(searchTerm) ||
          skill.level.toLowerCase().includes(searchTerm),
      ),
      projects: this.data.projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm) ||
          project.description.toLowerCase().includes(searchTerm) ||
          project.tech.some((tech) => tech.toLowerCase().includes(searchTerm)),
      ),
      certificates: this.data.certificates.filter(
        (cert) =>
          cert.title.toLowerCase().includes(searchTerm) ||
          cert.issuer.toLowerCase().includes(searchTerm) ||
          cert.description.toLowerCase().includes(searchTerm),
      ),
      experiences: this.data.experiences.filter(
        (exp) =>
          exp.title.toLowerCase().includes(searchTerm) ||
          exp.company.toLowerCase().includes(searchTerm) ||
          exp.description.toLowerCase().includes(searchTerm) ||
          exp.achievements.some((achievement) => achievement.toLowerCase().includes(searchTerm)),
      ),
      blogPosts: this.data.blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      ),
    }
  }

  // Data export/import
  exportData(): string {
    return JSON.stringify(this.data, null, 2)
  }

  importData(jsonData: string): boolean {
    try {
      const importedData = JSON.parse(jsonData)
      // Validate the structure
      if (importedData && typeof importedData === "object") {
        this.data = { ...this.getDefaultData(), ...importedData }
        this.saveData()
        return true
      }
      return false
    } catch (error) {
      console.error("Error importing data:", error)
      return false
    }
  }
}

export const dataManager = new DataManager()
export type { PortfolioData }
