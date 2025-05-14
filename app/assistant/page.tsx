"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Camera, Send, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI waste sorting assistant. Take a photo of an item or ask me how to dispose of something, and I'll help you sort it correctly.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      let response
      const userInput = input.toLowerCase()

      if (userInput.includes("plastic bottle") || userInput.includes("water bottle")) {
        response =
          "Plastic bottles should go in the recycling bin. Make sure to empty and rinse them first, and replace the cap before recycling."
      } else if (userInput.includes("pizza box") || userInput.includes("food container")) {
        response =
          "Pizza boxes with food residue should go in the compost bin. If it's clean (no grease or food), it can go in the recycling bin."
      } else if (userInput.includes("battery") || userInput.includes("batteries")) {
        response =
          "Batteries should NEVER go in regular trash or recycling! They contain hazardous materials. Please take them to a special collection point or hazardous waste facility."
      } else if (userInput.includes("food") || userInput.includes("banana") || userInput.includes("apple")) {
        response = "Food scraps like fruit peels, vegetable trimmings, and leftovers should go in the compost bin."
      } else if (userInput.includes("glass") || userInput.includes("bottle") || userInput.includes("jar")) {
        response =
          "Glass bottles and jars should go in the recycling bin. Please rinse them first and remove any caps or lids."
      } else {
        response =
          "I'm not entirely sure about that specific item. As a general rule:\n\n- Paper, cardboard, glass, metal cans, and plastic containers usually go in recycling\n- Food waste and compostable items go in compost\n- Non-recyclable items go in general waste\n\nWould you like me to provide more specific information?"
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const handleCameraClick = () => {
    // Simulate taking a photo and getting a response
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: "📷 [Photo of plastic bottle]",
        isImage: true,
      },
    ])

    setIsLoading(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I identified this as a plastic water bottle. This should go in the recycling bin (blue bin). Make sure to empty and rinse it first, and replace the cap before recycling.",
          itemType: "Plastic Bottle (PET)",
          binType: "Recycling Bin",
          binColor: "blue",
        },
      ])
      setIsLoading(false)
    }, 2000)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll to bottom when messages change
  useState(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="text-xl font-bold">AI Sorting Assistant</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6 flex flex-col">
        <Tabs defaultValue="chat" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="guide">Sorting Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-green-600 text-white" : "bg-white border"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg?height=24&width=24" alt="AI" />
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">EcoWaste AI</span>
                      </div>
                    )}

                    {message.isImage && (
                      <div className="mb-2 bg-gray-100 rounded-md h-32 flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    <p className={`text-sm ${message.role === "user" ? "text-white" : "text-gray-800"}`}>
                      {message.content}
                    </p>

                    {message.itemType && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Item Type:</span>
                          <Badge variant="outline" className="bg-gray-100 text-gray-800">
                            {message.itemType}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">Bin:</span>
                          <Badge
                            variant="outline"
                            className={`${
                              message.binColor === "blue"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : message.binColor === "green"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            {message.binType}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-4 bg-white border">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div
                          className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="sticky bottom-0 pt-2">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="shrink-0" onClick={handleCameraClick}>
                  <Camera className="h-5 w-5" />
                  <span className="sr-only">Take photo</span>
                </Button>
                <Input
                  placeholder="Ask how to dispose of an item..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
                <Button
                  variant="default"
                  size="icon"
                  className="shrink-0 bg-green-600 hover:bg-green-700"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
              <div className="text-xs text-center text-muted-foreground mt-2">
                Try asking: "How do I dispose of a pizza box?" or "Where do plastic bottles go?"
              </div>
            </div>
          </TabsContent>
          <TabsContent value="guide">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">Recyclables (Blue Bin)</CardTitle>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Recycling
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Paper and cardboard (clean and dry)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Plastic bottles and containers (rinsed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Glass bottles and jars (rinsed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Metal cans and aluminum foil (clean)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">Compostables (Green Bin)</CardTitle>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Compost
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Food scraps and leftovers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Coffee grounds and tea bags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Yard waste (leaves, grass clippings)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Paper towels and napkins (unsoiled)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">General Waste (Black Bin)</CardTitle>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      Landfill
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-gray-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Plastic bags and film</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-gray-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Styrofoam packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-gray-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Diapers and personal hygiene products</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-gray-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Broken ceramics and glassware</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">Special Disposal</CardTitle>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      Hazardous
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <span>Batteries (take to collection points)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <span>Electronics (e-waste recycling)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <span>Paint and chemicals (hazardous waste facility)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-100 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <span>Medications (pharmacy take-back programs)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Not sure where something goes?</h3>
                  <p className="text-xs text-blue-600 mt-1">
                    Use the AI Assistant chat to get personalized guidance on how to dispose of specific items.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
            <Calendar className="h-5 w-5" />
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
          <Link href="/profile" className="flex flex-col items-center justify-center text-gray-500">
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

