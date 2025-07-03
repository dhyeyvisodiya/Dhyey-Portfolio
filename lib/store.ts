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

  // Data fetching
  fetchData: () => Promise<void>

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

      // Data fetching
      fetchData: async () => {
        set({ isLoading: true })
        try {
          const [projectsRes, skillsRes, certificatesRes, blogsRes, experiencesRes, resumeRes] = await Promise.all([
            supabase.from("projects").select("*").order("created_at", { ascending: false }),
            supabase.from("skills").select("*").order("created_at", { ascending: false }),
            supabase.from("certificates").select("*").order("created_at", { ascending: false }),
            supabase.from("blogs").select("*").order("created_at", { ascending: false }),
            supabase.from("experiences").select("*").order("created_at", { ascending: false }),
            supabase.from("resume").select("*").single(),
          ])

          set({
            projects: projectsRes.data || [],
            skills: skillsRes.data || [],
            certificates: certificatesRes.data || [],
            blogs: blogsRes.data || [],
            experiences: experiencesRes.data || [],
            resume: resumeRes.data || null,
          })
        } catch (error) {
          // Error handled silently
        } finally {
          set({ isLoading: false })
        }
      },

      // Resume
      updateResume: async (resumeData) => {
        const { data, error } = await supabase
          .from("resume")
          .upsert([{ ...resumeData, created_at: new Date().toISOString() }])
          .select()
          .single()

        if (!error && data) {
          set({ resume: data })
        }
      },

      // Projects
      addProject: async (project) => {
        const { data, error } = await supabase
          .from("projects")
          .insert([{ ...project, created_at: new Date().toISOString() }])
          .select()

        if (!error && data) {
          set((state) => ({ projects: [data[0], ...state.projects] }))
        }
      },

      updateProject: async (id, project) => {
        const { data, error } = await supabase.from("projects").update(project).eq("id", id).select()

        if (!error && data) {
          set((state) => ({
            projects: state.projects.map((p) => (p.id === id ? data[0] : p)),
          }))
        }
      },

      deleteProject: async (id) => {
        const { error } = await supabase.from("projects").delete().eq("id", id)

        if (!error) {
          set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
          }))
        }
      },

      // Skills
      addSkill: async (skill) => {
        const { data, error } = await supabase
          .from("skills")
          .insert([{ ...skill, created_at: new Date().toISOString() }])
          .select()

        if (!error && data) {
          set((state) => ({ skills: [data[0], ...state.skills] }))
        }
      },

      updateSkill: async (id, skill) => {
        const { data, error } = await supabase.from("skills").update(skill).eq("id", id).select()

        if (!error && data) {
          set((state) => ({
            skills: state.skills.map((s) => (s.id === id ? data[0] : s)),
          }))
        }
      },

      deleteSkill: async (id) => {
        const { error } = await supabase.from("skills").delete().eq("id", id)

        if (!error) {
          set((state) => ({
            skills: state.skills.filter((s) => s.id !== id),
          }))
        }
      },

      // Certificates
      addCertificate: async (certificate) => {
        const { data, error } = await supabase
          .from("certificates")
          .insert([{ ...certificate, created_at: new Date().toISOString() }])
          .select()

        if (!error && data) {
          set((state) => ({ certificates: [data[0], ...state.certificates] }))
        }
      },

      updateCertificate: async (id, certificate) => {
        const { data, error } = await supabase.from("certificates").update(certificate).eq("id", id).select()

        if (!error && data) {
          set((state) => ({
            certificates: state.certificates.map((c) => (c.id === id ? data[0] : c)),
          }))
        }
      },

      deleteCertificate: async (id) => {
        const { error } = await supabase.from("certificates").delete().eq("id", id)

        if (!error) {
          set((state) => ({
            certificates: state.certificates.filter((c) => c.id !== id),
          }))
        }
      },

      // Blogs
      addBlog: async (blog) => {
        const { data, error } = await supabase
          .from("blogs")
          .insert([{ ...blog, created_at: new Date().toISOString() }])
          .select()

        if (!error && data) {
          set((state) => ({ blogs: [data[0], ...state.blogs] }))
        }
      },

      updateBlog: async (id, blog) => {
        const { data, error } = await supabase.from("blogs").update(blog).eq("id", id).select()

        if (!error && data) {
          set((state) => ({
            blogs: state.blogs.map((b) => (b.id === id ? data[0] : b)),
          }))
        }
      },

      deleteBlog: async (id) => {
        const { error } = await supabase.from("blogs").delete().eq("id", id)

        if (!error) {
          set((state) => ({
            blogs: state.blogs.filter((b) => b.id !== id),
          }))
        }
      },

      // Experiences
      addExperience: async (experience) => {
        const { data, error } = await supabase
          .from("experiences")
          .insert([{ ...experience, created_at: new Date().toISOString() }])
          .select()

        if (!error && data) {
          set((state) => ({ experiences: [data[0], ...state.experiences] }))
        }
      },

      updateExperience: async (id, experience) => {
        const { data, error } = await supabase.from("experiences").update(experience).eq("id", id).select()

        if (!error && data) {
          set((state) => ({
            experiences: state.experiences.map((e) => (e.id === id ? data[0] : e)),
          }))
        }
      },

      deleteExperience: async (id) => {
        const { error } = await supabase.from("experiences").delete().eq("id", id)

        if (!error) {
          set((state) => ({
            experiences: state.experiences.filter((e) => e.id !== id),
          }))
        }
      },
    }),
    {
      name: "portfolio-store",
    },
  ),
)
