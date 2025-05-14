"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, BarChart3, AlertTriangle, Users, Brain, Leaf, Recycle, Trash2, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("Alex")

  // Check if user is authenticated and load user data
  useEffect(() => {
    // In a real app, you would check for a valid auth token
    const hasAuthToken = document.cookie.includes("auth_token=")
    setIsAuthenticated(hasAuthToken)

    // Load user name from localStorage if authenticated
    if (hasAuthToken) {
      const storedName = localStorage.getItem("user_name")
      if (storedName) {
        setUserName(storedName.split(" ")[0]) // Use first name only
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              EcoWaste
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="text-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  </svg>
                </Button>
                <Link href="/profile">
                  <Avatar className="h-9 w-9 border-2 border-emerald-200">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Profile" />
                    <AvatarFallback className="bg-emerald-100 text-emerald-800">
                      {userName ? userName.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <Link href="/profile">
                <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-emerald-800">Welcome back, {userName}</h2>
              <p className="text-emerald-600">Let's keep our community clean today!</p>
            </div>
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200 px-3 py-1 text-sm"
            >
              <Recycle className="h-4 w-4 mr-1" />
              120 Points
            </Badge>
          </div>

          <Card className="mb-6 bg-gradient-to-r from-emerald-100 to-teal-100 border-emerald-200 overflow-hidden relative">
            <div className="absolute right-0 top-0 h-full w-24 opacity-10">
              <Recycle className="h-full w-full text-emerald-800" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-800">Next Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-emerald-800">Tomorrow</p>
                  <p className="text-sm text-emerald-700">Recyclables & General Waste</p>
                </div>
                <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700 shadow-md">
                  Set Reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="border-emerald-200 bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-800">Your Bin Status</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-700">Recyclables</span>
                      <span className="font-medium text-emerald-800">75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-emerald-100" indicatorClassName="bg-blue-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-700">General</span>
                      <span className="font-medium text-emerald-800">45%</span>
                    </div>
                    <Progress value={45} className="h-2 bg-emerald-100" indicatorClassName="bg-gray-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-emerald-700">Compost</span>
                      <span className="font-medium text-emerald-800">30%</span>
                    </div>
                    <Progress value={30} className="h-2 bg-emerald-100" indicatorClassName="bg-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-white shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-800">Community Impact</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-col h-full justify-center">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle cx="40" cy="40" r="36" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle
                          cx="40"
                          cy="40"
                          r="36"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray="226.2"
                          strokeDashoffset="33.93"
                        />
                      </svg>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-emerald-600">85%</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-center text-emerald-700 mt-2">Recycling Rate</p>
                  <p className="text-xs text-center mt-1 text-emerald-600">+5% from last month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-emerald-800">Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/schedule" className="no-underline">
              <Card className="h-full hover:border-emerald-300 hover:shadow-lg transition-all bg-white border-emerald-200">
                <CardHeader className="p-4 pb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <h3 className="font-medium text-emerald-800">Collection Schedule</h3>
                  <p className="text-xs text-emerald-600">View and set reminders</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/monitoring" className="no-underline">
              <Card className="h-full hover:border-emerald-300 hover:shadow-lg transition-all bg-white border-emerald-200">
                <CardHeader className="p-4 pb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <h3 className="font-medium text-emerald-800">Bin Monitoring</h3>
                  <p className="text-xs text-emerald-600">Track fill levels</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rewards" className="no-underline">
              <Card className="h-full hover:border-emerald-300 hover:shadow-lg transition-all bg-white border-emerald-200">
                <CardHeader className="p-4 pb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <h3 className="font-medium text-emerald-800">Rewards</h3>
                  <p className="text-xs text-emerald-600">Blockchain-based incentives</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/report" className="no-underline">
              <Card className="h-full hover:border-emerald-300 hover:shadow-lg transition-all bg-white border-emerald-200">
                <CardHeader className="p-4 pb-2">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <h3 className="font-medium text-emerald-800">Report Issues</h3>
                  <p className="text-xs text-emerald-600">Illegal dumping & more</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/community" className="no-underline">
              <Card className="h-full hover:border-emerald-300 hover:shadow-lg transition-all bg-white border-emerald-200">
                <CardHeader className="p-4 pb-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <h3 className="font-medium text-emerald-800">Community</h3>
                  <p className="text-xs text-emerald-600">Engage & learn</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/ai-classification" className="no-underline">
              <Card className="h-full hover:border-emerald-300 hover:shadow-lg transition-all bg-white border-emerald-200 relative overflow-hidden">
                <div className="absolute top-0 right-0">
                  <Badge className="m-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">New</Badge>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-rose-600" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <h3 className="font-medium text-emerald-800">AI Classification</h3>
                  <p className="text-xs text-emerald-600">Smart waste sorting</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        <section className="mt-8">
          <Card className="border-emerald-200 bg-gradient-to-r from-teal-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 flex items-center justify-center shadow-md">
                  <Trash2 className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-emerald-800">Reduce, Reuse, Recycle</h3>
                  <p className="text-emerald-600">Join our community challenge this month and earn bonus tokens!</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 shadow-md">Join Challenge</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <nav className="sticky bottom-0 border-t bg-white shadow-lg">
        <div className="grid grid-cols-5 h-16">
          <Link href="/" className="flex flex-col items-center justify-center text-emerald-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/schedule"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Schedule</span>
          </Link>
          <Link
            href="/monitoring"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs mt-1">Bins</span>
          </Link>
          <Link
            href="/report"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <AlertTriangle className="h-5 w-5" />
            <span className="text-xs mt-1">Report</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center justify-center text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

