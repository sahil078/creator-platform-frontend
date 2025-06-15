"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Lightbulb, TrendingUp, Users, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="animate-slide-up">
          <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">Your creative journey starts here ✨</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Total Followers",
              value: "12,543",
              change: "+20.1% from last month",
              icon: Users,
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Engagement Rate",
              value: "4.2%",
              change: "+0.5% from last week",
              icon: TrendingUp,
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Content Ideas",
              value: "47",
              change: "Generated this month",
              icon: Lightbulb,
              color: "from-yellow-500 to-orange-500",
            },
            {
              title: "Avg. Likes",
              value: "1,234",
              change: "Per post this week",
              icon: BarChart3,
              color: "from-purple-500 to-pink-500",
            },
          ].map((stat, index) => (
            <Card
              key={stat.title}
              className="card-hover animate-slide-up border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/idea-assistant" className="group">
            <Card
              className="card-hover transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <span className="group-hover:text-orange-700 transition-colors duration-200">
                    Content Idea Assistant
                  </span>
                </CardTitle>
                <CardDescription className="text-gray-600">Generate fresh content ideas powered by AI</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get AI-powered suggestions for reels, captions, and hashtags tailored to your niche.
                </p>
                <div className="flex items-center text-orange-600 font-medium text-sm group-hover:text-orange-700 transition-colors duration-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start Creating
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/analytics" className="group">
            <Card
              className="card-hover transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 animate-slide-up"
              style={{ animationDelay: "500ms" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-xl">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <span className="group-hover:text-purple-700 transition-colors duration-200">
                    Analytics Dashboard
                  </span>
                </CardTitle>
                <CardDescription className="text-gray-600">Track your Instagram performance and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  View detailed analytics including follower growth, engagement rates, and optimal posting times.
                </p>
                <div className="flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700 transition-colors duration-200">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card
          className="border-0 shadow-lg bg-white/80 backdrop-blur-sm animate-slide-up"
          style={{ animationDelay: "600ms" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-purple-500" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Your latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: 'Generated content idea for "Fitness Tips"', time: "2 hours ago", color: "bg-green-500" },
                { activity: "Viewed analytics dashboard", time: "5 hours ago", color: "bg-blue-500" },
                { activity: "Account created successfully", time: "1 day ago", color: "bg-purple-500" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 animate-slide-in-left"
                  style={{ animationDelay: `${700 + index * 100}ms` }}
                >
                  <div className={`w-3 h-3 ${item.color} rounded-full animate-pulse`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
