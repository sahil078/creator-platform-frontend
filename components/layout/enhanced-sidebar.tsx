"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { BarChart3, Lightbulb, LogOut, Menu, X, Home, Sparkles } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, color: "text-blue-500" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, color: "text-green-500" },
  { name: "Idea Assistant", href: "/idea-assistant", icon: Lightbulb, color: "text-yellow-500" },
]

export function EnhancedSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { logout, user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-300 ease-out lg:hidden border-r border-gray-200/50",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">Creator Platform</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="h-5 w-5 b" />
          </Button>
        </div>

        <div className="flex flex-col h-full">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 animate-slide-in-left",
                  pathname === item.href
                    ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 shadow-lg border border-purple-200/50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={cn(
                    "mr-4 h-5 w-5 transition-colors duration-200",
                    pathname === item.href ? item.color : "text-gray-400 group-hover:text-gray-600",
                  )}
                />
                {item.name}
                {pathname === item.href && <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full animate-pulse" />}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200/50">
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              onClick={logout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-30">
        <div className="flex-1 flex flex-col min-h-0 bg-white/95 backdrop-blur-xl shadow-xl border-r border-gray-200/50">
          <div className="flex items-center h-20 flex-shrink-0 px-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-pulse-slow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold gradient-text">Creator Platform</h1>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 animate-slide-in-left card-hover",
                    pathname === item.href
                      ? "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 shadow-lg border border-purple-200/50"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <item.icon
                    className={cn(
                      "mr-4 h-5 w-5 transition-colors duration-200",
                      pathname === item.href ? item.color : "text-gray-400 group-hover:text-gray-600",
                    )}
                  />
                  {item.name}
                  {pathname === item.href && (
                    <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex-shrink-0 p-4 border-t border-gray-200/50">
              <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 button-glow"
                onClick={logout}
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200/50 hover:bg-white transition-all duration-200"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}
