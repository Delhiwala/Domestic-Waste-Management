"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Download,
  Calendar,
  MapPin,
  Clock,
  User,
  FileText,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for the report
const reportData = {
  id: "REP-2025-0123",
  title: "Missed Collection",
  status: "In Progress",
  statusColor: "amber",
  date: "March 10, 2025",
  time: "08:45 AM",
  location: "123 Main Street, Greenville",
  coordinates: "40.7128° N, 74.0060° W",
  description:
    "Recyclables bin was not collected on scheduled day. The collection truck passed by but did not stop at my address.",
  category: "Missed Collection",
  severity: "Medium",
  assignedTo: "Waste Management Team",
  images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
  updates: [
    {
      date: "March 10, 2025",
      time: "09:30 AM",
      message: "Report received and logged in the system.",
      author: "System",
    },
    {
      date: "March 10, 2025",
      time: "11:15 AM",
      message: "Assigned to Waste Management Team for investigation.",
      author: "Admin",
    },
    {
      date: "March 11, 2025",
      time: "10:00 AM",
      message: "Investigation in progress. We've contacted the collection team for information.",
      author: "Support Agent",
    },
  ],
  wasteData: {
    monthly: {
      recyclable: [120, 135, 115, 130, 145, 125, 0],
      general: [80, 75, 85, 90, 70, 80, 0],
      organic: [60, 55, 65, 50, 70, 60, 0],
      missed: [0, 0, 0, 0, 0, 0, 1],
    },
    composition: {
      recyclable: 45,
      general: 30,
      organic: 25,
    },
    collectionRate: {
      onTime: 95,
      delayed: 4,
      missed: 1,
    },
    trends: [
      { month: "Jan", value: 98 },
      { month: "Feb", value: 97 },
      { month: "Mar", value: 99 },
      { month: "Apr", value: 96 },
      { month: "May", value: 98 },
      { month: "Jun", value: 97 },
      { month: "Jul", value: 95 },
      { month: "Aug", value: 96 },
      { month: "Sep", value: 97 },
      { month: "Oct", value: 98 },
      { month: "Nov", value: 99 },
      { month: "Dec", value: 95 },
    ],
  },
}

export default function ReportDetailPage() {
  const params = useParams()
  const [report, setReport] = useState(reportData)
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("monthly")
  const chartContainerRef = useRef(null)

  useEffect(() => {
    // In a real app, you would fetch the report data based on the ID
    // const fetchReport = async () => {
    //   try {
    //     const response = await fetch(`/api/reports/${params.id}`)
    //     const data = await response.json()
    //     setReport(data)
    //   } catch (error) {
    //     console.error("Error fetching report:", error)
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // fetchReport()
  }, [params.id])

  // Function to render charts (in a real app, you would use a charting library like Chart.js or Recharts)
  const renderCharts = () => {
    // This is a placeholder for actual chart rendering
    // In a real app, you would use a charting library
  }

  useEffect(() => {
    renderCharts()
  }, [report, timeframe])

  // Function to download report as PDF
  const downloadReport = () => {
    // In a real app, you would generate a PDF and trigger download
    // For this demo, we'll just show an alert
    alert("Report download started. The file will be saved to your device.")
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="container flex items-center h-16 px-4">
            <Link href="/report" className="mr-4">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
            <h1 className="text-xl font-bold">Loading Report...</h1>
          </div>
        </header>

        <main className="flex-1 container px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-500">Loading report details...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/report" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="text-xl font-bold">Report Details</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{report.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-gray-500">Report ID: {report.id}</p>
              <Badge
                variant="outline"
                className={`bg-${report.statusColor}-100 text-${report.statusColor}-800 border-${report.statusColor}-200`}
              >
                {report.status}
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
              onClick={downloadReport}
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Report Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Date & Time</p>
                        <p className="text-sm text-gray-500">
                          {report.date} at {report.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-gray-500">{report.location}</p>
                        <p className="text-xs text-gray-400">{report.coordinates}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Category & Severity</p>
                        <p className="text-sm text-gray-500">
                          {report.category} • {report.severity} Priority
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Assigned To</p>
                        <p className="text-sm text-gray-500">{report.assignedTo}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Status Updates</p>
                        <p className="text-sm text-gray-500">{report.updates.length} updates</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm text-gray-500">{report.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Data Visualization</CardTitle>
                <CardDescription>Analysis and trends related to this report</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="charts" className="mb-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="charts">Charts</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                    <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  </TabsList>

                  <div className="flex justify-end my-2">
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger className="w-[150px] h-8 text-xs">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <TabsContent value="charts" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pie Chart - Waste Composition */}
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-sm font-medium mb-2">Waste Composition</h3>
                        <div className="h-60 flex items-center justify-center" ref={chartContainerRef}>
                          {/* Placeholder for actual chart */}
                          <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              {/* Recyclable - 45% */}
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#3b82f6"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="0"
                                transform="rotate(-90 50 50)"
                              />
                              {/* General - 30% */}
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#6b7280"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="157"
                                transform="rotate(-90 50 50)"
                              />
                              {/* Organic - 25% */}
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#10b981"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="188.4"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-medium">100%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs">Recyclable (45%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <span className="text-xs">General (30%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs">Organic (25%)</span>
                          </div>
                        </div>
                      </div>

                      {/* Bar Chart - Collection Rate */}
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-sm font-medium mb-2">Collection Rate</h3>
                        <div className="h-60 flex items-center justify-center">
                          {/* Placeholder for actual chart */}
                          <div className="w-full h-40 flex items-end justify-around">
                            <div className="flex flex-col items-center">
                              <div className="w-16 bg-emerald-500 rounded-t" style={{ height: "152px" }}></div>
                              <span className="text-xs mt-1">On Time</span>
                              <span className="text-xs font-medium">95%</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-16 bg-amber-500 rounded-t" style={{ height: "6.4px" }}></div>
                              <span className="text-xs mt-1">Delayed</span>
                              <span className="text-xs font-medium">4%</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-16 bg-red-500 rounded-t" style={{ height: "1.6px" }}></div>
                              <span className="text-xs mt-1">Missed</span>
                              <span className="text-xs font-medium">1%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Line Chart - Monthly Waste Collection */}
                      <div className="bg-white p-4 rounded-lg border md:col-span-2">
                        <h3 className="text-sm font-medium mb-2">Monthly Waste Collection</h3>
                        <div className="h-60 flex items-center justify-center">
                          {/* Placeholder for actual chart */}
                          <div className="w-full h-40 relative">
                            {/* X-axis */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

                            {/* Y-axis */}
                            <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

                            {/* Recyclable line */}
                            <svg className="absolute inset-0" viewBox="0 0 700 160">
                              <polyline
                                points="0,40 100,25 200,45 300,30 400,15 500,35 600,160"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="2"
                              />
                            </svg>

                            {/* General line */}
                            <svg className="absolute inset-0" viewBox="0 0 700 160">
                              <polyline
                                points="0,80 100,85 200,75 300,70 400,90 500,80 600,160"
                                fill="none"
                                stroke="#6b7280"
                                strokeWidth="2"
                              />
                            </svg>

                            {/* Organic line */}
                            <svg className="absolute inset-0" viewBox="0 0 700 160">
                              <polyline
                                points="0,100 100,105 200,95 300,110 400,90 500,100 600,160"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2"
                              />
                            </svg>

                            {/* Missed collection point */}
                            <svg className="absolute inset-0" viewBox="0 0 700 160">
                              <circle cx="600" cy="10" r="5" fill="#ef4444" />
                            </svg>

                            {/* X-axis labels */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 -mb-5">
                              <span className="text-xs">Mar 4</span>
                              <span className="text-xs">Mar 6</span>
                              <span className="text-xs">Mar 8</span>
                              <span className="text-xs">Mar 10</span>
                              <span className="text-xs">Mar 12</span>
                              <span className="text-xs">Mar 14</span>
                              <span className="text-xs">Mar 16</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs">Recyclable</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                            <span className="text-xs">General</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs">Organic</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-xs">Missed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="trends" className="mt-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="text-sm font-medium mb-4">Collection Success Rate (2025)</h3>
                      <div className="h-60 flex items-center justify-center">
                        {/* Placeholder for actual chart */}
                        <div className="w-full h-40 relative">
                          {/* X-axis */}
                          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

                          {/* Y-axis */}
                          <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

                          {/* Line */}
                          <svg className="absolute inset-0" viewBox="0 0 1200 160">
                            <polyline
                              points="0,8 100,12 200,4 300,16 400,8 500,12 600,20 700,16 800,12 900,8 1000,4 1100,20"
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2"
                            />
                          </svg>

                          {/* X-axis labels */}
                          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 -mb-5">
                            {report.wasteData.trends.map((item, index) => (
                              <span key={index} className="text-xs">
                                {item.month}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-6 text-xs text-gray-500">
                        <div>
                          <p className="font-medium">Average Success Rate</p>
                          <p className="text-sm font-bold text-emerald-600">97.1%</p>
                        </div>
                        <div>
                          <p className="font-medium">Highest Month</p>
                          <p className="text-sm font-bold text-emerald-600">Nov (99%)</p>
                        </div>
                        <div>
                          <p className="font-medium">Lowest Month</p>
                          <p className="text-sm font-bold text-amber-600">Dec (95%)</p>
                        </div>
                        <div>
                          <p className="font-medium">Current Month</p>
                          <p className="text-sm font-bold text-emerald-600">Mar (99%)</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-sm font-medium mb-2">Missed Collections by Area</h3>
                        <div className="h-60 flex items-center justify-center">
                          {/* Placeholder for actual chart */}
                          <div className="w-full h-40 flex items-end justify-around">
                            <div className="flex flex-col items-center">
                              <div className="w-12 bg-red-500 rounded-t" style={{ height: "32px" }}></div>
                              <span className="text-xs mt-1">Downtown</span>
                              <span className="text-xs font-medium">0.8%</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-12 bg-red-500 rounded-t" style={{ height: "40px" }}></div>
                              <span className="text-xs mt-1">North</span>
                              <span className="text-xs font-medium">1.0%</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-12 bg-red-500 rounded-t" style={{ height: "48px" }}></div>
                              <span className="text-xs mt-1">East</span>
                              <span className="text-xs font-medium">1.2%</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-12 bg-red-500 rounded-t" style={{ height: "36px" }}></div>
                              <span className="text-xs mt-1">South</span>
                              <span className="text-xs font-medium">0.9%</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-12 bg-red-500 rounded-t" style={{ height: "44px" }}></div>
                              <span className="text-xs mt-1">West</span>
                              <span className="text-xs font-medium">1.1%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-sm font-medium mb-2">Reasons for Missed Collections</h3>
                        <div className="h-60 flex items-center justify-center">
                          {/* Placeholder for actual chart */}
                          <div className="relative w-40 h-40">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                              {/* Route planning - 40% */}
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#ef4444"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="0"
                                transform="rotate(-90 50 50)"
                              />
                              {/* Vehicle issues - 25% */}
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#f59e0b"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="100.48"
                                transform="rotate(-90 50 50)"
                              />
                              {/* Weather - 20% */}
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#3b82f6"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="163.28"
                                transform="rotate(-90 50 50)"
                              />
                              {/* Staff shortage - 15% */}
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke="#8b5cf6"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="213.52"
                                transform="rotate(-90 50 50)"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-xs">Route planning (40%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                            <span className="text-xs">Vehicle issues (25%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-xs">Weather (20%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-xs">Staff shortage (15%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="comparison" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-sm font-medium mb-2">Your Area vs. City Average</h3>
                        <div className="h-60 flex items-center justify-center">
                          {/* Placeholder for actual chart */}
                          <div className="w-full h-40 flex items-end justify-around">
                            <div className="flex flex-col items-center">
                              <div className="flex items-end">
                                <div className="w-12 bg-emerald-500 rounded-t mr-1" style={{ height: "120px" }}></div>
                                <div className="w-12 bg-emerald-300 rounded-t" style={{ height: "100px" }}></div>
                              </div>
                              <span className="text-xs mt-1">Recyclable</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex items-end">
                                <div className="w-12 bg-gray-500 rounded-t mr-1" style={{ height: "80px" }}></div>
                                <div className="w-12 bg-gray-300 rounded-t" style={{ height: "100px" }}></div>
                              </div>
                              <span className="text-xs mt-1">General</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex items-end">
                                <div className="w-12 bg-blue-500 rounded-t mr-1" style={{ height: "60px" }}></div>
                                <div className="w-12 bg-blue-300 rounded-t" style={{ height: "80px" }}></div>
                              </div>
                              <span className="text-xs mt-1">Organic</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="flex items-end">
                                <div className="w-12 bg-red-500 rounded-t mr-1" style={{ height: "4px" }}></div>
                                <div className="w-12 bg-red-300 rounded-t" style={{ height: "12px" }}></div>
                              </div>
                              <span className="text-xs mt-1">Missed</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs">Your Area</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                            <span className="text-xs">City Average</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-sm font-medium mb-2">Year-over-Year Comparison</h3>
                        <div className="h-60 flex items-center justify-center">
                          {/* Placeholder for actual chart */}
                          <div className="w-full h-40 relative">
                            {/* X-axis */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

                            {/* Y-axis */}
                            <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

                            {/* 2024 line */}
                            <svg className="absolute inset-0" viewBox="0 0 700 160">
                              <polyline
                                points="0,40 100,50 200,45 300,55 400,40 500,35 600,45"
                                fill="none"
                                stroke="#9ca3af"
                                strokeWidth="2"
                                strokeDasharray="4"
                              />
                            </svg>

                            {/* 2025 line */}
                            <svg className="absolute inset-0" viewBox="0 0 700 160">
                              <polyline
                                points="0,50 100,40 200,30 300,35 400,25 500,30 600,20"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="2"
                              />
                            </svg>

                            {/* X-axis labels */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 -mb-5">
                              <span className="text-xs">Jan</span>
                              <span className="text-xs">Feb</span>
                              <span className="text-xs">Mar</span>
                              <span className="text-xs">Apr</span>
                              <span className="text-xs">May</span>
                              <span className="text-xs">Jun</span>
                              <span className="text-xs">Jul</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs">2025</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            <span className="text-xs">2024</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border mt-6">
                      <h3 className="text-sm font-medium mb-2">Performance Metrics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-emerald-50 rounded-md border border-emerald-100">
                          <p className="text-xs text-emerald-600">Collection Efficiency</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-lg font-bold text-emerald-800">+12%</p>
                            <div className="flex items-center text-emerald-600">
                              <ChevronUp className="h-4 w-4" />
                              <span className="text-xs">Improved</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                          <p className="text-xs text-blue-600">Recycling Rate</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-lg font-bold text-blue-800">+8%</p>
                            <div className="flex items-center text-blue-600">
                              <ChevronUp className="h-4 w-4" />
                              <span className="text-xs">Improved</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-red-50 rounded-md border border-red-100">
                          <p className="text-xs text-red-600">Missed Collections</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-lg font-bold text-red-800">-15%</p>
                            <div className="flex items-center text-emerald-600">
                              <ChevronDown className="h-4 w-4" />
                              <span className="text-xs">Reduced</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={downloadReport}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Report
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.images.map((image, index) => (
                    <div key={index} className="rounded-md overflow-hidden border">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Report image ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Status Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {report.updates.map((update, index) => (
                    <div key={index} className="relative pl-6 pb-4">
                      {index !== report.updates.length - 1 && (
                        <div className="absolute top-2 bottom-0 left-2 w-px bg-gray-200"></div>
                      )}
                      <div className="absolute top-2 left-0 w-4 h-4 rounded-full bg-emerald-100 border-2 border-emerald-500"></div>
                      <div>
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{update.author}</p>
                          <p className="text-xs text-gray-500">
                            {update.date}, {update.time}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Related Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-md border hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Missed Recycling Collection</p>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                        In Progress
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">March 3, 2025 • 125 Main Street</p>
                  </div>

                  <div className="p-3 rounded-md border hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Delayed Collection</p>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Resolved
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">February 24, 2025 • 130 Main Street</p>
                  </div>

                  <div className="p-3 rounded-md border hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Bin Damage Report</p>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Resolved
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">February 10, 2025 • 123 Main Street</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Related Reports
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">How to prevent missed collections</AccordionTrigger>
                    <AccordionContent>
                      <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                        <li>Place bins out by 7:00 PM the night before collection</li>
                        <li>Ensure bins are clearly visible from the street</li>
                        <li>Keep bin lids closed and don't overfill</li>
                        <li>Maintain clear access to bins (no parked cars or obstacles)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm">What to do if your collection is missed</AccordionTrigger>
                    <AccordionContent>
                      <ol className="text-sm text-gray-600 space-y-2 list-decimal pl-5">
                        <li>Wait until the end of the collection day (5:00 PM)</li>
                        <li>Check the EcoWaste app for any service disruptions</li>
                        <li>Report the missed collection through the app</li>
                        <li>Keep your bins out for 24 hours for potential late collection</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm">Collection schedule changes</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-600 mb-2">Collection schedules may change due to:</p>
                      <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                        <li>Public holidays</li>
                        <li>Severe weather events</li>
                        <li>Road closures or construction</li>
                        <li>Seasonal adjustments</li>
                      </ul>
                      <p className="text-sm text-gray-600 mt-2">
                        Always check the app for the most up-to-date schedule information.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
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
          <Link href="/report" className="flex flex-col items-center justify-center text-emerald-600">
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

