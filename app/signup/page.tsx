"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, User, Lock, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
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

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    }
    let isValid = true

    // Name validation
    if (!name) {
      errors.name = "Name is required"
      isValid = false
    }

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
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long"
      isValid = false
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!validateForm()) {
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

      setSuccess("Registration successful! Redirecting to dashboard...")

      // Set auth cookie (in a real app, this would be done by the server)
      document.cookie = "auth_token=dummy_token; path=/; max-age=86400"

      // Redirect to home page after successful registration
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (err) {
      setError("Registration failed. Please try again later.")
    } finally {
      setIsLoading(false)
    }
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
              Create EcoWaste Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-2 text-gray-600"
            >
              Join our community for smarter waste management
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100"
          >
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
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
                <Label htmlFor="password">Password</Label>
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
                {formErrors.password ? (
                  <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                ) : (
                  <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirm-password"
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
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Sign Up & Join EcoWaste"
                )}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-emerald-600 hover:text-emerald-800 font-medium">
                    Log in here
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© 2025 EcoWaste. All rights reserved.</p>
      </footer>
    </div>
  )
}

