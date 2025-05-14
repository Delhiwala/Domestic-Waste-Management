"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, User, Lock, AlertCircle, CheckCircle, Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("register")
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const router = useRouter()

  // Check if user is authenticated and load user data
  useEffect(() => {
    // In a real app, you would check for a valid auth token
    const hasAuthToken = document.cookie.includes("auth_token=")
    setIsAuthenticated(hasAuthToken)

    // Load user data from localStorage if authenticated
    if (hasAuthToken) {
      const storedName = localStorage.getItem("user_name")
      const storedEmail = localStorage.getItem("user_email")

      if (storedName) setName(storedName)
      if (storedEmail) setEmail(storedEmail)
    }
  }, [])

  // Clear error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validateForm = (type: "login" | "register") => {
    const errors = {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    }
    let isValid = true

    // Email validation
    if (!email) {
      errors.email = "Email is required"
      isValid = false
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required"
      isValid = false
    } else if (type === "register" && password.length < 8) {
      errors.password = "Password must be at least 8 characters long"
      isValid = false
    }

    // Additional register validations
    if (type === "register") {
      if (!name) {
        errors.name = "Name is required"
        isValid = false
      }

      if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password"
        isValid = false
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
        isValid = false
      }
    }

    setFormErrors(errors)
    return isValid
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!validateForm("login")) {
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would call your authentication API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data in localStorage
      localStorage.setItem("user_email", email)
      // For login, we might not have the name, so we'll use a default or fetch it from the server
      // For demo purposes, we'll use "EcoWaste User" if no name is provided
      localStorage.setItem("user_name", name || "EcoWaste User")

      // Set auth cookie (in a real app, this would be done by the server)
      document.cookie = "auth_token=dummy_token; path=/; max-age=86400"

      setSuccess("Login successful! Redirecting to dashboard...")

      // Redirect to home page
      setTimeout(() => {
        setIsAuthenticated(true)
        router.push("/")
      }, 1000)
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!validateForm("register")) {
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would call your registration API here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data in localStorage
      localStorage.setItem("user_name", name)
      localStorage.setItem("user_email", email)

      // Set auth cookie (in a real app, this would be done by the server)
      document.cookie = "auth_token=dummy_token; path=/; max-age=86400"

      setSuccess("Registration successful! Redirecting to dashboard...")

      // Redirect to home page after successful registration
      setTimeout(() => {
        setIsAuthenticated(true)
        router.push("/")
      }, 1500)
    } catch (err) {
      setError("Registration failed. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // If user is authenticated, show profile page
  if (isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="container flex items-center h-16 px-4">
            <Link href="/" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
            <h1 className="text-xl font-bold">My Profile</h1>
          </div>
        </header>

        <main className="flex-1 container px-4 py-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                <User className="h-10 w-10 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{name || "EcoWaste User"}</h2>
                <p className="text-gray-500">{email || "user@example.com"}</p>
                <Badge className="mt-2 bg-emerald-100 text-emerald-800 border-emerald-200">Eco Warrior</Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Total EcoPoints</span>
                <span className="text-emerald-600 font-bold">120 points</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Recycling Rate</span>
                <span className="text-emerald-600 font-bold">85%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Waste Reduction</span>
                <span className="text-emerald-600 font-bold">15% this month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Member Since</span>
                <span className="text-gray-600">March 2025</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Notification Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Help & Support
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => {
                // Clear auth cookie and localStorage
                document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
                localStorage.removeItem("user_name")
                localStorage.removeItem("user_email")
                setIsAuthenticated(false)
                router.push("/")
              }}
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Log Out
            </Button>
          </div>
        </main>

        <nav className="sticky bottom-0 border-t bg-white">
          <div className="grid grid-cols-5 h-16">
            <Link href="/" className="flex flex-col items-center justify-center text-gray-500">
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
            <Link href="/schedule" className="flex flex-col items-center justify-center text-gray-500">
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-xs mt-1">Schedule</span>
            </Link>
            <Link href="/monitoring" className="flex flex-col items-center justify-center text-gray-500">
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
                <path d="M3 3v18h18" />
                <path d="M18 17V9" />
                <path d="M13 17V5" />
                <path d="M8 17v-3" />
              </svg>
              <span className="text-xs mt-1">Bins</span>
            </Link>
            <Link href="/report" className="flex flex-col items-center justify-center text-gray-500">
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
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span className="text-xs mt-1">Report</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center justify-center text-emerald-600">
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

  // If user is not authenticated, show login/register form
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  <path d="M7 10h10"></path>
                  <path d="M7 14h4"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-emerald-800">EcoWaste</h1>
            <p className="mt-2 text-gray-600">Smart waste management for a cleaner community</p>
          </div>

          {error && (
            <Alert variant="destructive" className="animate-in fade-in-50 slide-in-from-top-5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200 animate-in fade-in-50 slide-in-from-top-5">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" id="login-tab">
                Login
              </TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className={`pl-10 ${formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (formErrors.email) {
                            setFormErrors({ ...formErrors, email: "" })
                          }
                        }}
                        required
                      />
                    </div>
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-emerald-600 hover:text-emerald-800">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 ${formErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (formErrors.password) {
                            setFormErrors({ ...formErrors, password: "" })
                          }
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formErrors.password && <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Logging in...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100">
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        className={`pl-10 ${formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          if (formErrors.name) {
                            setFormErrors({ ...formErrors, name: "" })
                          }
                        }}
                        required
                      />
                    </div>
                    {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        className={`pl-10 ${formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (formErrors.email) {
                            setFormErrors({ ...formErrors, email: "" })
                          }
                        }}
                        required
                      />
                    </div>
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 ${formErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value)
                          if (formErrors.password) {
                            setFormErrors({ ...formErrors, password: "" })
                          }
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formErrors.password ? (
                      <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                    ) : (
                      <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 ${formErrors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value)
                          if (formErrors.confirmPassword) {
                            setFormErrors({ ...formErrors, confirmPassword: "" })
                          }
                        }}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {formErrors.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">{formErrors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Link href="/terms" className="text-emerald-600 hover:text-emerald-800">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-emerald-600 hover:text-emerald-800">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      "Register"
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2025 EcoWaste. All rights reserved.</p>
      </footer>
    </div>
  )
}

// Missing Badge component
function Badge({ className, children }) {
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{children}</span>
}

