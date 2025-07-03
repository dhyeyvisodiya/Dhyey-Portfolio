"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "./supabase"

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
  featured: boolean
  createdAt: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  createdAt: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialId: string
  skills: string[]
  verifyUrl: string
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  slug: string
  published: boolean
  createdAt: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
  createdAt: string
}

export interface Resume {
  id: string
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    github: string
  }
  summary: string
  resumeUrl: string
  createdAt: string
}

interface Store {
  projects: Project[]
  skills: Skill[]
  certificates: Certificate[]
  blogs: BlogPost[]
  experiences: Experience[]
  resume: Resume | null
  isLoading: boolean
  lastUpdated: number
  error: string | null

  // Data fetching
  fetchData: () => Promise<void>
  refreshData: () => Promise<void>
  clearError: () => void

  // Resume
  updateResume: (resume: Partial<Resume>) => Promise<void>

  // Projects
  addProject: (project: Omit<Project, "id" | "createdAt">) => Promise<void>
  updateProject: (id: string, project: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>

  // Skills
  addSkill: (skill: Omit<Skill, "id" | "createdAt">) => Promise<void>
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>
  deleteSkill: (id: string) => Promise<void>

  // Certificates
  addCertificate: (certificate: Omit<Certificate, "id" | "createdAt">) => Promise<void>
  updateCertificate: (id: string, certificate: Partial<Certificate>) => Promise<void>
  deleteCertificate: (id: string) => Promise<void>

  // Blogs
  addBlog: (blog: Omit<BlogPost, "id" | "createdAt">) => Promise<void>
  updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<void>
  deleteBlog: (id: string) => Promise<void>

  // Experiences
  addExperience: (experience: Omit<Experience, "id" | "createdAt">) => Promise<void>
  updateExperience: (id: string, experience: Partial<Experience>) => Promise<void>
  deleteExperience: (id: string) => Promise<void>
}

// Helper function to transform database data
const transformData = (data: any[], type: string) => {
  return data.map((item) => ({
    ...item,
    id: item.id,
    createdAt: item.created_at,
    // Transform specific fields based on type
    ...(type === "certificates" && {
      credentialId: item.credential_id,
      verifyUrl: item.verify_url,
    }),
    ...(type === "blogs" && {
      readTime: item.read_time,
    }),
    ...(type === "resume" && {
      personalInfo: item.personal_info,
      resumeUrl: item.resume_url,
    }),
  }))
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      projects: [],
      skills: [],
      certificates: [],
      blogs: [],
      experiences: [],
      resume: null,
      isLoading: false,
      lastUpdated: 0,
      error: null,

      clearError: () => set({ error: null }),

      // Data fetching with proper error handling
      fetchData: async () => {
        set({ isLoading: true, error: null })
        try {
          const [projectsRes, skillsRes, certificatesRes, blogsRes, experiencesRes, resumeRes] = await Promise.all([
            supabase.from("projects").select("*").order("created_at", { ascending: false }),
            supabase.from("skills").select("*").order("created_at", { ascending: false }),
            supabase.from("certificates").select("*").order("created_at", { ascending: false }),
            supabase.from("blogs").select("*").order("created_at", { ascending: false }),
            supabase.from("experiences").select("*").order("created_at", { ascending: false }),
            supabase.from("resume").select("*").single(),
          ])

          // Check for errors
          if (projectsRes.error) throw projectsRes.error
          if (skillsRes.error) throw skillsRes.error
          if (certificatesRes.error) throw certificatesRes.error
          if (blogsRes.error) throw blogsRes.error
          if (experiencesRes.error) throw experiencesRes.error

          set({
            projects: transformData(projectsRes.data || [], "projects"),
            skills: transformData(skillsRes.data || [], "skills"),
            certificates: transformData(certificatesRes.data || [], "certificates"),
            blogs: transformData(blogsRes.data || [], "blogs"),
            experiences: transformData(experiencesRes.data || [], "experiences"),
            resume: resumeRes.data ? transformData([resumeRes.data], "resume")[0] : null,
            lastUpdated: Date.now(),
            error: null,
          })
        } catch (error: any) {
          set({ error: error.message || "Failed to fetch data" })
        } finally {
          set({ isLoading: false })
        }
      },

      // Force refresh data
      refreshData: async () => {
        await get().fetchData()
      },

      // Resume
      updateResume: async (resumeData) => {
        set({ isLoading: true, error: null })
        try {
          const dataToInsert = {
            personal_info: resumeData.personalInfo,
            summary: resumeData.summary,
            resume_url: resumeData.resumeUrl,
          }

          const { data, error } = await supabase.from("resume").upsert([dataToInsert]).select().single()

          if (error) throw error

          const transformedData = transformData([data], "resume")[0]
          set({ resume: transformedData, lastUpdated: Date.now() })
        } catch (error: any) {
          set({ error: error.message || "Failed to update resume" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Projects
      addProject: async (project) => {
        set({ isLoading: true, error: null })
        try {
          const { data, error } = await supabase.from("projects").insert([project]).select()

          if (error) throw error

          const transformedData = transformData(data, "projects")
          set((state) => ({
            projects: [transformedData[0], ...state.projects],
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to add project" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      updateProject: async (id, project) => {
        set({ isLoading: true, error: null })
        try {
          const { data, error } = await supabase.from("projects").update(project).eq("id", id).select()

          if (error) throw error

          const transformedData = transformData(data, "projects")
          set((state) => ({
            projects: state.projects.map((p) => (p.id === id ? transformedData[0] : p)),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to update project" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      deleteProject: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const { error } = await supabase.from("projects").delete().eq("id", id)

          if (error) throw error

          set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to delete project" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Skills
      addSkill: async (skill) => {
        set({ isLoading: true, error: null })
        try {
          const { data, error } = await supabase.from("skills").insert([skill]).select()

          if (error) throw error

          const transformedData = transformData(data, "skills")
          set((state) => ({
            skills: [transformedData[0], ...state.skills],
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to add skill" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      updateSkill: async (id, skill) => {
        set({ isLoading: true, error: null })
        try {
          const { data, error } = await supabase.from("skills").update(skill).eq("id", id).select()

          if (error) throw error

          const transformedData = transformData(data, "skills")
          set((state) => ({
            skills: state.skills.map((s) => (s.id === id ? transformedData[0] : s)),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to update skill" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      deleteSkill: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const { error } = await supabase.from("skills").delete().eq("id", id)

          if (error) throw error

          set((state) => ({
            skills: state.skills.filter((s) => s.id !== id),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to delete skill" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Certificates
      addCertificate: async (certificate) => {
        set({ isLoading: true, error: null })
        try {
          const dataToInsert = {
            ...certificate,
            credential_id: certificate.credentialId,
            verify_url: certificate.verifyUrl,
          }

          const { data, error } = await supabase.from("certificates").insert([dataToInsert]).select()

          if (error) throw error

          const transformedData = transformData(data, "certificates")
          set((state) => ({
            certificates: [transformedData[0], ...state.certificates],
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to add certificate" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      updateCertificate: async (id, certificate) => {
        set({ isLoading: true, error: null })
        try {
          const dataToUpdate = {
            ...certificate,
            credential_id: certificate.credentialId,
            verify_url: certificate.verifyUrl,
          }

          const { data, error } = await supabase.from("certificates").update(dataToUpdate).eq("id", id).select()

          if (error) throw error

          const transformedData = transformData(data, "certificates")
          set((state) => ({
            certificates: state.certificates.map((c) => (c.id === id ? transformedData[0] : c)),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to update certificate" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      deleteCertificate: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const { error } = await supabase.from("certificates").delete().eq("id", id)

          if (error) throw error

          set((state) => ({
            certificates: state.certificates.filter((c) => c.id !== id),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to delete certificate" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Blogs
      addBlog: async (blog) => {
        set({ isLoading: true, error: null })
        try {
          const dataToInsert = {
            ...blog,
            read_time: blog.readTime,
          }

          const { data, error } = await supabase.from("blogs").insert([dataToInsert]).select()

          if (error) throw error

          const transformedData = transformData(data, "blogs")
          set((state) => ({
            blogs: [transformedData[0], ...state.blogs],
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to add blog" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      updateBlog: async (id, blog) => {
        set({ isLoading: true, error: null })
        try {
          const dataToUpdate = {
            ...blog,
            read_time: blog.readTime,
          }

          const { data, error } = await supabase.from("blogs").update(dataToUpdate).eq("id", id).select()

          if (error) throw error

          const transformedData = transformData(data, "blogs")
          set((state) => ({
            blogs: state.blogs.map((b) => (b.id === id ? transformedData[0] : b)),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to update blog" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      deleteBlog: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const { error } = await supabase.from("blogs").delete().eq("id", id)

          if (error) throw error

          set((state) => ({
            blogs: state.blogs.filter((b) => b.id !== id),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to delete blog" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      // Experiences
      addExperience: async (experience) => {
        set({ isLoading: true, error: null })
        try {
          const { data, error } = await supabase.from("experiences").insert([experience]).select()

          if (error) throw error

          const transformedData = transformData(data, "experiences")
          set((state) => ({
            experiences: [transformedData[0], ...state.experiences],
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to add experience" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      updateExperience: async (id, experience) => {
        set({ isLoading: true, error: null })
        try {
          const { data, error } = await supabase.from("experiences").update(experience).eq("id", id).select()

          if (error) throw error

          const transformedData = transformData(data, "experiences")
          set((state) => ({
            experiences: state.experiences.map((e) => (e.id === id ? transformedData[0] : e)),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to update experience" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      deleteExperience: async (id) => {
        set({ isLoading: true, error: null })
        try {
          const { error } = await supabase.from("experiences").delete().eq("id", id)

          if (error) throw error

          set((state) => ({
            experiences: state.experiences.filter((e) => e.id !== id),
            lastUpdated: Date.now(),
          }))
        } catch (error: any) {
          set({ error: error.message || "Failed to delete experience" })
          throw error
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: "portfolio-store",
      partialize: (state) => ({
        projects: state.projects,
        skills: state.skills,
        certificates: state.certificates,
        blogs: state.blogs,
        experiences: state.experiences,
        resume: state.resume,
        lastUpdated: state.lastUpdated,
      }),
    },
  ),
)
