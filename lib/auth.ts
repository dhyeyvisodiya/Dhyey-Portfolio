"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthStore {
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  checkAuth: () => boolean
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
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
      checkAuth: () => get().isAuthenticated,
    }),
    {
      name: "auth-storage",
    },
  ),
)

// Export a standalone function for checking auth
export const checkAuth = () => {
  const store = useAuth.getState()
  return store.isAuthenticated
}
