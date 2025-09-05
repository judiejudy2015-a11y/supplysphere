"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export function useAuthRedirect() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to appropriate dashboard based on role
      const dashboardRoutes = {
        supplier: "/dashboard/supplier",
        vendor: "/dashboard/vendor",
        analyst: "/dashboard/analyst",
        admin: "/dashboard/admin",
      }

      router.push(dashboardRoutes[user.role])
    }
  }, [isAuthenticated, user, router])

  return { isAuthenticated, user }
}
