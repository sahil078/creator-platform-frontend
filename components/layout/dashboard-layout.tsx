"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EnhancedSidebar } from "./enhanced-sidebar";
import { EnhancedTopbar } from "./enhanced-topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, token } = useAuth(); // Get token from context
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Check for both user and token
      if (!user || !token) {
        router.push("/login");
      }
    }
  }, [user, loading, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center animate-bounce-in">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 font-medium">
            Loading your dashboard<span className="loading-dots">...</span>
          </p>
        </div>
      </div>
    );
  }

  if (!user || !token) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <EnhancedSidebar />
      <div className="lg:ml-72">
        <EnhancedTopbar />
        <main className="py-8 animate-fade-in">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}