import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  demo: string
  featured: boolean
  created_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  created_at: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credential_id: string
  skills: string[]
  verify_url: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  read_time: string
  tags: string[]
  slug: string
  published: boolean
  created_at: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
  created_at: string
}

export interface Resume {
  id: string
  personal_info: {
    full_name: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    github: string
  }
  summary: string
  resume_url: string
  created_at: string
}
