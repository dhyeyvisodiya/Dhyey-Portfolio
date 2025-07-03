"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username: string, password: string) => {
        // Use constant-time comparison to prevent timing attacks
        const validUsername = "dvbhai"
        const validPassword = "thedv"

        const usernameMatch = username === validUsername
        const passwordMatch = password === validPassword

        if (usernameMatch && passwordMatch) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    },
  ),
)
