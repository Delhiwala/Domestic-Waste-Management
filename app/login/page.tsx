"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const router = useRouter()

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
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, rememberMe }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful login
      // In a real app, you would check the response status
      // if (!response.ok) throw new Error('Login failed')

      // Set auth cookie (in a real app, this would be done by the server)
      document.cookie = "auth_token=dummy_token; path=/; max-age=86400"

      setSuccess("Login successful! Redirecting to dashboard...")

      // Redirect to home page
      setTimeout(() => {
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
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful registration
      // In a real app, you would check the response status
      // if (!response.ok) throw new Error('Registration failed')

      setSuccess("Registration successful! You can now log in.")

      // Switch to login tab
      setActiveTab("login")
      document.getElementById("login-tab")?.click()
    } catch (err) {
      setError("Registration failed. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)

    // In a real app, you would redirect to the social login provider
    // window.location.href = `/api/auth/${provider}`

    // Simulate social login
    setTimeout(() => {
      document.cookie = "auth_token=dummy_social_token; path=/; max-age=86400"
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="flex justify-center mb-4"
            >
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
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl font-bold text-emerald-800"
            >
              EcoWaste
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-2 text-gray-600"
            >
              Smart waste management for a cleaner community
            </motion.p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Alert variant="destructive" className="animate-in fade-in-50 slide-in-from-top-5">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Alert className="bg-green-50 text-green-800 border-green-200 animate-in fade-in-50 slide-in-from-top-5">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" id="login-tab">
                Login
              </TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100"
              >
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
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Logging in...
                      </div>
                    ) : (
                      "Login to EcoWaste"
                    )}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      className="w-full hover:bg-gray-50 transition-all duration-300"
                      onClick={() => handleSocialLogin("google")}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.128 10.4383 21.879V14.89H7.89831V12H10.4383V9.797C10.4383 7.291 11.9313 5.907 14.2153 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1923C13.9503 8.562 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z"></path>
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-gray-50 transition-all duration-300"
                      onClick={() => handleSocialLogin("twitter")}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 17.523 6.47731 22 12.0003 22C17.5233 22 22.0003 17.523 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2ZM18.9213 9.908C18.9363 10.018 18.9433 10.13 18.9433 10.242C18.9433 14.349 15.8373 19.088 10.2993 19.088C8.61531 19.088 7.04431 18.617 5.73831 17.808C5.95631 17.835 6.17731 17.848 6.40131 17.848C7.78531 17.848 9.06331 17.393 10.0733 16.617C8.77931 16.594 7.68931 15.731 7.32531 14.547C7.49631 14.581 7.67231 14.599 7.85431 14.599C8.10531 14.599 8.34931 14.563 8.58131 14.496C7.23131 14.224 6.22131 13.019 6.22131 11.569C6.22131 11.556 6.22131 11.544 6.22131 11.532C6.60731 11.747 7.04931 11.875 7.51731 11.89C6.73631 11.367 6.22431 10.473 6.22431 9.459C6.22431 8.924 6.37031 8.426 6.62631 8.002C8.09131 9.825 10.2653 11.033 12.7223 11.154C12.6753 10.945 12.6513 10.726 12.6513 10.501C12.6513 8.84 13.9953 7.496 15.6553 7.496C16.5183 7.496 17.2953 7.866 17.8363 8.465C18.5063 8.339 19.1373 8.095 19.7103 7.759C19.4953 8.438 19.0363 9.007 18.4323 9.369C19.0243 9.3 19.5913 9.147 20.1183 8.919C19.7123 9.5 19.2073 10.017 18.6343 10.438C18.9213 9.908 18.9213 9.908 18.9213 9.908Z"></path>
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-gray-50 transition-all duration-300"
                      onClick={() => handleSocialLogin("facebook")}
                      disabled={isLoading}
                    >
                      <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.0003 2C6.47731 2 2.00031 6.477 2.00031 12C2.00031 17.523 6.47731 22 12.0003 22C17.5233 22 22.0003 17.523 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2ZM12.9953 16.785H10.5373V12.839H9.30731V10.893H10.5373V9.798C10.5373 8.391 11.0873 7.543 12.6953 7.543H14.3043V9.489H13.3823C12.7283 9.489 12.6983 9.745 12.6983 10.189V10.893H14.3133L14.1103 12.839H12.6983V16.785H12.9953Z"></path>
                      </svg>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="register">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100"
              >
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      className={formErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (formErrors.name) {
                          setFormErrors({ ...formErrors, name: "" })
                        }
                      }}
                      required
                    />
                    {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      className={formErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (formErrors.email) {
                          setFormErrors({ ...formErrors, email: "" })
                        }
                      }}
                      required
                    />
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={formErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}
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
                      <Input
                        id="register-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={formErrors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}
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
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2025 EcoWaste. All rights reserved.</p>
      </footer>
    </div>
  )
}

