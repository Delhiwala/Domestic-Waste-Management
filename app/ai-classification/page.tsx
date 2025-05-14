"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Camera,
  Upload,
  RefreshCw,
  Info,
  Trash2,
  Recycle,
  Leaf,
  AlertTriangle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar } from "lucide-react"

// Mock data for waste classification
const wasteCategories = {
  recyclable: {
    title: "Recyclable",
    description: "This item can be recycled",
    color: "blue",
    icon: Recycle,
    binType: "Blue Bin",
    examples: ["Plastic bottles", "Paper", "Cardboard", "Glass containers", "Metal cans"],
  },
  organic: {
    title: "Organic",
    description: "This item is compostable",
    color: "green",
    icon: Leaf,
    binType: "Green Bin",
    examples: ["Food scraps", "Yard waste", "Coffee grounds", "Tea bags", "Plant trimmings"],
  },
  general: {
    title: "General Waste",
    description: "This item goes to landfill",
    color: "gray",
    icon: Trash2,
    binType: "Black Bin",
    examples: ["Plastic bags", "Styrofoam", "Diapers", "Broken ceramics", "Non-recyclable packaging"],
  },
  hazardous: {
    title: "Hazardous",
    description: "This item requires special disposal",
    color: "red",
    icon: AlertTriangle,
    binType: "Special Collection",
    examples: ["Batteries", "Electronics", "Paint", "Chemicals", "Medications"],
  },
}

export default function AIClassificationPage() {
  const [activeTab, setActiveTab] = useState("camera")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraPermission, setCameraPermission] = useState(null)
  const [predictionData, setPredictionData] = useState(null)

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // Initialize TensorFlow.js model (mock implementation)
  useEffect(() => {
    // In a real implementation, you would load the TensorFlow.js model here
    // Example:
    // async function loadModel() {
    //   const model = await tf.loadLayersModel('path/to/model.json');
    //   setModel(model);
    // }
    // loadModel();

    return () => {
      // Clean up camera stream when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  // Request camera access
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setCameraPermission(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraPermission(false)
    }
  }

  // Stop camera stream
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert canvas to image data URL
      const imageDataURL = canvas.toDataURL("image/jpeg")

      // Process the captured image
      processImage(imageDataURL)
    }
  }

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        processImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Process image for classification
  const processImage = (imageData) => {
    setIsLoading(true)

    // In a real implementation, you would use TensorFlow.js to classify the image
    // For this demo, we'll simulate a classification result after a delay
    setTimeout(() => {
      // Randomly select a waste category for demo purposes
      const categories = Object.keys(wasteCategories)
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]

      // Generate confidence scores (mock data)
      const confidenceScores = {}
      categories.forEach((category) => {
        confidenceScores[category] = Math.random() * 0.5
      })
      confidenceScores[randomCategory] = 0.7 + Math.random() * 0.3 // Make the selected category have higher confidence

      // Set the result
      setResult({
        imageData,
        category: randomCategory,
        confidence: confidenceScores[randomCategory],
        allScores: confidenceScores,
        timestamp: new Date().toISOString(),
      })

      setIsLoading(false)

      // Stop camera after capturing
      if (activeTab === "camera") {
        stopCamera()
      }
    }, 2000)
  }

  // Reset the classification
  const resetClassification = () => {
    setResult(null)
    if (activeTab === "camera") {
      startCamera()
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Load waste prediction data
  useEffect(() => {
    // In a real implementation, you would fetch this data from your API
    // For this demo, we'll use mock data
    const mockPredictionData = {
      weeklyPrediction: {
        recyclable: [20, 25, 18, 22, 30, 28, 24],
        organic: [15, 12, 18, 14, 16, 20, 17],
        general: [10, 12, 8, 9, 11, 13, 10],
      },
      totalReduction: 15, // percentage
      optimizedSchedule: [
        { day: "Monday", type: "Recyclable", time: "7:00 AM - 9:00 AM" },
        { day: "Wednesday", type: "Organic", time: "8:00 AM - 10:00 AM" },
        { day: "Friday", type: "General", time: "7:00 AM - 9:00 AM" },
      ],
    }

    setPredictionData(mockPredictionData)
  }, [])

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value)

    // Stop camera if switching away from camera tab
    if (value !== "camera" && cameraActive) {
      stopCamera()
    }

    // Start camera if switching to camera tab
    if (value === "camera" && !result) {
      startCamera()
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="text-xl font-bold">AI Waste Classification</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <Tabs defaultValue="classify" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="classify">Classify Waste</TabsTrigger>
            <TabsTrigger value="predict">Waste Prediction</TabsTrigger>
          </TabsList>

          <TabsContent value="classify" className="mt-4">
            {result ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Classification Result</CardTitle>
                      <Button variant="ghost" size="sm" onClick={resetClassification}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        New Scan
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/3 aspect-square bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={result.imageData || "/placeholder.svg"}
                          alt="Classified waste item"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="w-full md:w-2/3 space-y-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-10 h-10 rounded-full bg-${wasteCategories[result.category].color}-100 flex items-center justify-center`}
                          >
                            {React.createElement(wasteCategories[result.category].icon, {
                              className: `h-5 w-5 text-${wasteCategories[result.category].color}-600`,
                            })}
                          </div>
                          <div>
                            <h3 className="font-medium">{wasteCategories[result.category].title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {wasteCategories[result.category].description}
                            </p>
                          </div>
                          <Badge
                            className={`ml-auto bg-${wasteCategories[result.category].color}-100 text-${wasteCategories[result.category].color}-800 border-${wasteCategories[result.category].color}-200`}
                          >
                            {Math.round(result.confidence * 100)}% Confidence
                          </Badge>
                        </div>

                        <div className="p-4 rounded-md bg-gray-50 border">
                          <h4 className="font-medium mb-2">Disposal Instructions</h4>
                          <p className="text-sm mb-2">
                            This item should be disposed of in the{" "}
                            <span className="font-medium">{wasteCategories[result.category].binType}</span>.
                          </p>
                          <div className="text-sm">
                            <span className="font-medium">Similar items:</span>
                            <ul className="list-disc list-inside mt-1">
                              {wasteCategories[result.category].examples.map((example, index) => (
                                <li key={index}>{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">All Classifications</h4>
                          <div className="space-y-2">
                            {Object.keys(result.allScores).map((category) => (
                              <div key={category}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>{wasteCategories[category].title}</span>
                                  <span>{Math.round(result.allScores[category] * 100)}%</span>
                                </div>
                                <Progress
                                  value={result.allScores[category] * 100}
                                  className="h-2"
                                  indicatorClassName={`bg-${wasteCategories[category].color}-500`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Scan Waste Item</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="camera">Camera</TabsTrigger>
                        <TabsTrigger value="upload">Upload Image</TabsTrigger>
                      </TabsList>

                      <TabsContent value="camera" className="mt-4">
                        <div className="space-y-4">
                          {cameraPermission === false && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>
                                Camera access denied. Please enable camera access in your browser settings.
                              </AlertDescription>
                            </Alert>
                          )}

                          <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            <canvas ref={canvasRef} className="hidden" />

                            {!cameraActive && cameraPermission !== false && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-70 text-white">
                                <Camera className="h-12 w-12 mb-2" />
                                <p className="text-center mb-4">Camera access required to scan waste items</p>
                                <Button onClick={startCamera}>Enable Camera</Button>
                              </div>
                            )}
                          </div>

                          <Button
                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                            onClick={captureImage}
                            disabled={!cameraActive || isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Analyzing...
                              </div>
                            ) : (
                              <>
                                <Camera className="h-4 w-4 mr-2" />
                                Capture & Classify
                              </>
                            )}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="upload" className="mt-4">
                        <div className="space-y-4">
                          <div
                            className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileUpload}
                            />
                            <Upload className="h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-center mb-1">Click to upload or drag and drop</p>
                            <p className="text-center text-sm text-muted-foreground">JPG, PNG or JPEG (max. 10MB)</p>
                          </div>

                          {isLoading && (
                            <div className="flex justify-center">
                              <div className="flex items-center">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-emerald-600"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Analyzing image...
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-full">
                          <Camera className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Capture or Upload</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Take a photo of any waste item or upload an existing image
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg
                            className="h-4 w-4 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 6V12L16 14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">AI Analysis</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Our AI model analyzes the image using TensorFlow.js
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Recycle className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Get Results</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Receive instant classification and disposal instructions
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="predict" className="mt-4">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Waste Generation Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  {predictionData ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Weekly Waste Prediction</h3>
                        <div className="h-60 bg-gray-50 rounded-md p-4 border">
                          <div className="h-full flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                              Chart visualization would appear here showing predicted waste volumes
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <Card className="bg-blue-50 border-blue-100">
                          <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-blue-800">Recyclables</h3>
                            <p className="text-2xl font-bold text-blue-800 mt-1">
                              {predictionData.weeklyPrediction.recyclable.reduce((a, b) => a + b, 0)} kg
                            </p>
                            <p className="text-xs text-blue-600 mt-1">Predicted this week</p>
                          </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-green-100">
                          <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-green-800">Organic</h3>
                            <p className="text-2xl font-bold text-green-800 mt-1">
                              {predictionData.weeklyPrediction.organic.reduce((a, b) => a + b, 0)} kg
                            </p>
                            <p className="text-xs text-green-600 mt-1">Predicted this week</p>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-50 border-gray-100">
                          <CardContent className="p-4">
                            <h3 className="text-sm font-medium text-gray-800">General</h3>
                            <p className="text-2xl font-bold text-gray-800 mt-1">
                              {predictionData.weeklyPrediction.general.reduce((a, b) => a + b, 0)} kg
                            </p>
                            <p className="text-xs text-gray-600 mt-1">Predicted this week</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Waste Reduction Progress</h3>
                        <div className="p-4 bg-emerald-50 rounded-md border border-emerald-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-emerald-800">Total Reduction</span>
                            <span className="text-sm font-medium text-emerald-800">
                              {predictionData.totalReduction}%
                            </span>
                          </div>
                          <Progress
                            value={predictionData.totalReduction}
                            className="h-2 bg-emerald-100"
                            indicatorClassName="bg-emerald-500"
                          />
                          <p className="text-xs text-emerald-600 mt-2">
                            You've reduced your waste by {predictionData.totalReduction}% compared to last month
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Optimized Collection Schedule</h3>
                        <div className="space-y-2">
                          {predictionData.optimizedSchedule.map((schedule, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-white rounded-md border"
                            >
                              <div>
                                <p className="font-medium">{schedule.day}</p>
                                <p className="text-xs text-muted-foreground">{schedule.time}</p>
                              </div>
                              <Badge
                                className={`
                                  ${
                                    schedule.type === "Recyclable"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : schedule.type === "Organic"
                                        ? "bg-green-100 text-green-800 border-green-200"
                                        : "bg-gray-100 text-gray-800 border-gray-200"
                                  }
                                `}
                              >
                                {schedule.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center py-8">
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-emerald-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Loading prediction data...
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">About AI Waste Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <Info className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">How It Works</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Our AI model analyzes historical waste data and patterns to predict future waste generation
                          and optimize collection schedules.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <svg
                          className="h-4 w-4 text-amber-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 17L21 12L16 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M21 12H9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Benefits</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Optimized collection routes, reduced carbon emissions, and more efficient waste management for
                          your community.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-rose-100 p-2 rounded-full">
                        <svg
                          className="h-4 w-4 text-rose-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 8V12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 16H12.01"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Data Privacy</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          All waste data is anonymized and aggregated to protect your privacy while improving community
                          waste management.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

