"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { LogOut, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function EnhancedTopbar() {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200/50 ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-1 lg:flex-none">
            <div className="ml-12 lg:ml-0 animate-slide-in-left">
              <h2 className="text-lg font-semibold text-gray-900">
                Welcome back, <span className="gradient-text">{user?.name}</span>! ✨
              </h2>
              <p className="hidden md:block text-sm text-gray-500">Ready to create amazing content today?</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 animate-slide-in-left" style={{ animationDelay: "200ms" }}>
            {/* Search bar - hidden on mobile */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-10 w-64 bg-gray-50/50 border-gray-200/50 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 transition-colors duration-200">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
            </Button>

            {/* User info */}
            <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50/50 rounded-xl border border-gray-200/50">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            {/* Logout button - hidden on mobile */}
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="hidden sm:flex hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 button-glow"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
