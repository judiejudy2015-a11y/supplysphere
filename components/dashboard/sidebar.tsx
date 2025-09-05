"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { addHoverAnimations } from "@/lib/animations"
import {
  LayoutDashboard,
  Package,
  Truck,
  QrCode,
  BarChart3,
  Settings,
  Search,
  ShoppingCart,
  Shield,
  Users,
  Activity,
  Database,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Blocks,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

const supplierNavItems = [
  { href: "/dashboard/supplier", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/supplier/products", icon: Package, label: "Products & Inventory" },
  { href: "/dashboard/supplier/shipments", icon: Truck, label: "Shipments" },
  { href: "/dashboard/supplier/qr-generator", icon: QrCode, label: "QR Generator" },
  { href: "/dashboard/supplier/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/supplier/settings", icon: Settings, label: "Settings" },
]

const vendorNavItems = [
  { href: "/dashboard/vendor", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/vendor/search", icon: Search, label: "Product Search" },
  { href: "/dashboard/vendor/orders", icon: ShoppingCart, label: "Orders & Requests" },
  { href: "/dashboard/vendor/verify", icon: Shield, label: "Verification" },
  { href: "/dashboard/vendor/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/vendor/settings", icon: Settings, label: "Settings" },
]

const analystNavItems = [
  { href: "/dashboard/analyst", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/analyst/supply-chain", icon: Activity, label: "Supply Chain Analytics" },
  { href: "/dashboard/analyst/suppliers", icon: Users, label: "Supplier Performance" },
  { href: "/dashboard/analyst/insights", icon: BarChart3, label: "Market Insights" },
  { href: "/dashboard/analyst/reports", icon: Database, label: "Reports" },
  { href: "/dashboard/analyst/settings", icon: Settings, label: "Settings" },
]

const adminNavItems = [
  { href: "/dashboard/admin", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/admin/users", icon: Users, label: "User Management" },
  { href: "/dashboard/admin/logs", icon: Activity, label: "System Logs" },
  { href: "/dashboard/admin/analytics", icon: BarChart3, label: "Platform Analytics" },
  { href: "/dashboard/admin/blockchain", icon: Blocks, label: "Blockchain Monitor" },
  { href: "/dashboard/admin/settings", icon: Settings, label: "Settings" },
]

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    addHoverAnimations()
  }, [])

  const getNavItems = () => {
    switch (user?.role) {
      case "supplier":
        return supplierNavItems
      case "vendor":
        return vendorNavItems
      case "analyst":
        return analystNavItems
      case "admin":
        return adminNavItems
      default:
        return supplierNavItems
    }
  }

  const navItems = getNavItems()

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Blocks className="h-6 w-6 text-sidebar-primary" />
            <span className="font-semibold text-sidebar-foreground">SupplySphere</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "menu-item w-full justify-start gap-3 h-10 transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed && "justify-center px-2",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-sidebar-border p-2">
        {!isCollapsed && user && (
          <div className="px-2 py-2 mb-2">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">{user.role}</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            "menu-item w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200",
            isCollapsed && "justify-center px-2",
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  )
}
