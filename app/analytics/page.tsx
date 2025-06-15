"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp, Heart, MessageCircle, Clock, Users } from "lucide-react"

// Sample data for the charts
const followerData = [
  { day: "Mon", followers: 12100 },
  { day: "Tue", followers: 12250 },
  { day: "Wed", followers: 12180 },
  { day: "Thu", followers: 12400 },
  { day: "Fri", followers: 12350 },
  { day: "Sat", followers: 12500 },
  { day: "Sun", followers: 12543 },
]

const postsData = [
  {
    id: 1,
    title: "Morning Workout Routine",
    likes: 1234,
    comments: 89,
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Healthy Breakfast Ideas",
    likes: 987,
    comments: 67,
    date: "3 days ago",
  },
  {
    id: 3,
    title: "Weekend Motivation",
    likes: 1456,
    comments: 123,
    date: "4 days ago",
  },
  {
    id: 4,
    title: "Fitness Tips for Beginners",
    likes: 2103,
    comments: 156,
    date: "5 days ago",
  },
  {
    id: 5,
    title: "Transform Your Mindset",
    likes: 1789,
    comments: 234,
    date: "6 days ago",
  },
]

const chartConfig = {
  followers: {
    label: "Followers",
    color: "hsl(var(--chart-1))",
  },
}

export default function AnalyticsPage() {

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instagram Analytics</h1>
          <p className="text-gray-600">Track your performance and growth insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,543</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +443 this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Likes</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,514</div>
              <p className="text-xs text-muted-foreground">Per post this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Comments</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">134</div>
              <p className="text-xs text-muted-foreground">Per post this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2%</div>
              <p className="text-xs text-muted-foreground">+0.5% from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Follower Growth Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Follower Growth (7 Days)</CardTitle>
              <CardDescription>Your follower count over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={followerData}>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      className="text-xs"
                      domain={["dataMin - 50", "dataMax + 50"]}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="followers"
                      stroke="var(--color-followers)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-followers)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Best Time to Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Best Time to Post</span>
              </CardTitle>
              <CardDescription>Optimal posting time based on your audience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">Wednesday</div>
                <div className="text-xl font-semibold text-gray-700">7:00 PM</div>
                <p className="text-sm text-gray-500 mt-2">Your audience is most active at this time</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monday</span>
                  <span className="font-medium">6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tuesday</span>
                  <span className="font-medium">7:30 PM</span>
                </div>
                <div className="flex justify-between text-sm bg-blue-50 px-2 py-1 rounded">
                  <span className="font-medium">Wednesday</span>
                  <span className="font-bold text-blue-600">7:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Thursday</span>
                  <span className="font-medium">6:30 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Friday</span>
                  <span className="font-medium">8:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts Performance</CardTitle>
            <CardDescription>Likes and comments for your last 5 posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {postsData.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="font-medium">{post.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{post.comments}</span>
                    </div>
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
