import Link from "next/link"
import {
  ArrowLeft,
  RefreshCw,
  MapPin,
  Settings,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EnhancedMonitoringPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="text-xl font-bold">Smart Bin Monitoring</h1>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
              <Download className="h-3 w-3" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Home Bins</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-blue-600">Recyclables</p>
                      <p className="text-2xl font-bold text-blue-800">75%</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      2 days left
                    </Badge>
                  </div>
                  <Progress value={75} className="h-2 mt-2 bg-blue-200" indicatorClassName="bg-blue-500" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-600">General Waste</p>
                      <p className="text-2xl font-bold text-gray-800">45%</p>
                    </div>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      4 days left
                    </Badge>
                  </div>
                  <Progress value={45} className="h-2 mt-2 bg-gray-200" indicatorClassName="bg-gray-500" />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-green-600">Compost</p>
                      <p className="text-2xl font-bold text-green-800">30%</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      5 days left
                    </Badge>
                  </div>
                  <Progress value={30} className="h-2 mt-2 bg-green-200" indicatorClassName="bg-green-500" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">Recyclables Bin</CardTitle>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      75% Full
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                      <Progress value={75} className="h-3 bg-gray-100" indicatorClassName="bg-blue-500" />
                      <div className="flex justify-between text-xs mt-1">
                        <span>Empty</span>
                        <span>Full</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current volume:</span>
                          <span className="font-medium">45 liters</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total capacity:</span>
                          <span className="font-medium">60 liters</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Estimated days until full:</span>
                          <span className="font-medium">2 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Next collection:</span>
                          <span className="font-medium">March 17, 2025</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 bg-gray-50 rounded-md p-3 border">
                      <h4 className="text-sm font-medium mb-2">Fill Rate Trend</h4>
                      <div className="h-32 relative">
                        {/* X-axis */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

                        {/* Y-axis */}
                        <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

                        {/* Line */}
                        <svg className="absolute inset-0" viewBox="0 0 700 128">
                          <polyline
                            points="0,100 100,90 200,85 300,75 400,60 500,40 600,30"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                          />

                          {/* Prediction line (dashed) */}
                          <polyline
                            points="600,30 700,0"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeDasharray="4"
                          />
                        </svg>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 -mb-5">
                          <span className="text-xs">Mar 10</span>
                          <span className="text-xs">Mar 12</span>
                          <span className="text-xs">Mar 14</span>
                          <span className="text-xs">Mar 16</span>
                          <span className="text-xs">Mar 18</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Actual</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="line-through">Predicted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="text-xs w-full">
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">General Waste Bin</CardTitle>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                      45% Full
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                      <Progress value={45} className="h-3 bg-gray-100" indicatorClassName="bg-gray-500" />
                      <div className="flex justify-between text-xs mt-1">
                        <span>Empty</span>
                        <span>Full</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current volume:</span>
                          <span className="font-medium">27 liters</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total capacity:</span>
                          <span className="font-medium">60 liters</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Estimated days until full:</span>
                          <span className="font-medium">4 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Next collection:</span>
                          <span className="font-medium">March 17, 2025</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 bg-gray-50 rounded-md p-3 border">
                      <h4 className="text-sm font-medium mb-2">Fill Rate Trend</h4>
                      <div className="h-32 relative">
                        {/* X-axis */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

                        {/* Y-axis */}
                        <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

                        {/* Line */}
                        <svg className="absolute inset-0" viewBox="0 0 700 128">
                          <polyline
                            points="0,110 100,105 200,95 300,90 400,80 500,65 600,55"
                            fill="none"
                            stroke="#6b7280"
                            strokeWidth="2"
                          />

                          {/* Prediction line (dashed) */}
                          <polyline
                            points="600,55 700,30"
                            fill="none"
                            stroke="#6b7280"
                            strokeWidth="2"
                            strokeDasharray="4"
                          />
                        </svg>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 -mb-5">
                          <span className="text-xs">Mar 10</span>
                          <span className="text-xs">Mar 12</span>
                          <span className="text-xs">Mar 14</span>
                          <span className="text-xs">Mar 16</span>
                          <span className="text-xs">Mar 18</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          <span>Actual</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          <span className="line-through">Predicted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="text-xs w-full">
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">Compost Bin</CardTitle>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      30% Full
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                      <Progress value={30} className="h-3 bg-gray-100" indicatorClassName="bg-green-500" />
                      <div className="flex justify-between text-xs mt-1">
                        <span>Empty</span>
                        <span>Full</span>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current volume:</span>
                          <span className="font-medium">18 liters</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total capacity:</span>
                          <span className="font-medium">60 liters</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Estimated days until full:</span>
                          <span className="font-medium">5 days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Next collection:</span>
                          <span className="font-medium">March 20, 2025</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 bg-gray-50 rounded-md p-3 border">
                      <h4 className="text-sm font-medium mb-2">Fill Rate Trend</h4>
                      <div className="h-32 relative">
                        {/* X-axis */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

                        {/* Y-axis */}
                        <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

                        {/* Line */}
                        <svg className="absolute inset-0" viewBox="0 0 700 128">
                          <polyline
                            points="0,120 100,115 200,110 300,105 400,95 500,85 600,80"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                          />

                          {/* Prediction line (dashed) */}
                          <polyline
                            points="600,80 700,60"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="4"
                          />
                        </svg>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 -mb-5">
                          <span className="text-xs">Mar 10</span>
                          <span className="text-xs">Mar 12</span>
                          <span className="text-xs">Mar 14</span>
                          <span className="text-xs">Mar 16</span>
                          <span className="text-xs">Mar 18</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Actual</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="line-through">Predicted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="text-xs w-full">
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Waste Composition</CardTitle>
                  <CardDescription>Distribution of waste types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center">
                    {/* Placeholder for pie chart */}
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
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs">Recyclable (45%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-xs">General (30%)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Organic (25%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Weekly Fill Rate</CardTitle>
                  <CardDescription>How quickly bins are filling up</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center">
                    {/* Placeholder for bar chart */}
                    <div className="w-full h-40 flex items-end justify-around">
                      <div className="flex flex-col items-center">
                        <div className="flex items-end">
                          <div className="w-8 bg-blue-500 rounded-t mr-1" style={{ height: "90px" }}></div>
                          <div className="w-8 bg-gray-500 rounded-t mr-1" style={{ height: "60px" }}></div>
                          <div className="w-8 bg-green-500 rounded-t" style={{ height: "40px" }}></div>
                        </div>
                        <span className="text-xs mt-1">Mon</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-end">
                          <div className="w-8 bg-blue-500 rounded-t mr-1" style={{ height: "80px" }}></div>
                          <div className="w-8 bg-gray-500 rounded-t mr-1" style={{ height: "50px" }}></div>
                          <div className="w-8 bg-green-500 rounded-t" style={{ height: "30px" }}></div>
                        </div>
                        <span className="text-xs mt-1">Tue</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-end">
                          <div className="w-8 bg-blue-500 rounded-t mr-1" style={{ height: "100px" }}></div>
                          <div className="w-8 bg-gray-500 rounded-t mr-1" style={{ height: "70px" }}></div>
                          <div className="w-8 bg-green-500 rounded-t" style={{ height: "50px" }}></div>
                        </div>
                        <span className="text-xs mt-1">Wed</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-end">
                          <div className="w-8 bg-blue-500 rounded-t mr-1" style={{ height: "70px" }}></div>
                          <div className="w-8 bg-gray-500 rounded-t mr-1" style={{ height: "40px" }}></div>
                          <div className="w-8 bg-green-500 rounded-t" style={{ height: "20px" }}></div>
                        </div>
                        <span className="text-xs mt-1">Thu</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-end">
                          <div className="w-8 bg-blue-500 rounded-t mr-1" style={{ height: "110px" }}></div>
                          <div className="w-8 bg-gray-500 rounded-t mr-1" style={{ height: "80px" }}></div>
                          <div className="w-8 bg-green-500 rounded-t" style={{ height: "60px" }}></div>
                        </div>
                        <span className="text-xs mt-1">Fri</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-end">
                          <div className="w-8 bg-blue-500 rounded-t mr-1" style={{ height: "60px" }}></div>
                          <div className="w-8 bg-gray-500 rounded-t mr-1" style={{ height: "30px" }}></div>
                          <div className="w-8 bg-green-500 rounded-t" style={{ height: "10px" }}></div>
                        </div>
                        <span className="text-xs mt-1">Sat</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-end">
                          <div className="w-8 bg-blue-500 rounded-t mr-1" style={{ height: "50px" }}></div>
                          <div className="w-8 bg-gray-500 rounded-t mr-1" style={{ height: "20px" }}></div>
                          <div className="w-8 bg-green-500 rounded-t" style={{ height: "5px" }}></div>
                        </div>
                        <span className="text-xs mt-1">Sun</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs">Recyclable</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-xs">General</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Organic</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Monthly Waste Trends</CardTitle>
                <CardDescription>Waste generation over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center">
                  {/* Placeholder for line chart */}
                  <div className="w-full h-40 relative">
                    {/* X-axis */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>

                    {/* Y-axis */}
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>

                    {/* Recyclable line */}
                    <svg className="absolute inset-0" viewBox="0 0 700 160">
                      <polyline
                        points="0,80 100,70 200,90 300,60 400,50 500,70 600,40"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* General line */}
                    <svg className="absolute inset-0" viewBox="0 0 700 160">
                      <polyline
                        points="0,100 100,110 200,90 300,100 400,110 500,90 600,100"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Organic line */}
                    <svg className="absolute inset-0" viewBox="0 0 700 160">
                      <polyline
                        points="0,120 100,110 200,130 300,120 400,110 500,120 600,110"
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
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">Recyclable</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-xs">General</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Organic</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="text-xs">
                  Download Data
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-blue-600">Recyclables</p>
                      <p className="text-lg font-bold text-blue-800">+15%</p>
                      <p className="text-xs text-blue-600">from last week</p>
                    </div>
                    <div className="text-blue-500">
                      <ChevronUp className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">General</p>
                      <p className="text-lg font-bold text-gray-800">-5%</p>
                      <p className="text-xs text-gray-600">from last week</p>
                    </div>
                    <div className="text-green-500">
                      <ChevronDown className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-green-600">Compost</p>
                      <p className="text-lg font-bold text-green-800">+8%</p>
                      <p className="text-xs text-green-600">from last week</p>
                    </div>
                    <div className="text-green-500">
                      <ChevronUp className="h-8 w-8" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Collection History</CardTitle>
                  <Select defaultValue="march">
                    <SelectTrigger className="w-[150px] h-8 text-xs">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="january">January 2025</SelectItem>
                      <SelectItem value="february">February 2025</SelectItem>
                      <SelectItem value="march">March 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Recyclables & General Waste</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Collected
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">March 10, 2025 • 8:15 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Compostables</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Collected
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">March 6, 2025 • 8:30 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Recyclables & General Waste</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Collected
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">March 3, 2025 • 8:10 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Compostables</p>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                          Delayed
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">February 27, 2025 • 11:45 AM</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-md border">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">Recyclables & General Waste</p>
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Collected
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">February 24, 2025 • 8:20 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="text-xs w-full">
                  View Full History
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Collection Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const isCollectionDay = [3, 6, 10, 13, 17, 20, 24, 27, 31].includes(day)
                    const isToday = day === 16
                    return (
                      <div
                        key={day}
                        className={`flex items-center justify-center h-10 rounded-full text-sm
                          ${isToday ? "bg-green-100 text-green-800 border border-green-300" : ""}
                          ${isCollectionDay && !isToday ? "bg-green-50 text-green-800" : ""}
                        `}
                      >
                        {day}
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-100 border border-green-300"></div>
                    <span className="text-sm">Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-50"></div>
                    <span className="text-sm">Collection Day</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Community Bins</h2>
          <div className="flex justify-between items-center mb-4">
            <Select defaultValue="nearest">
              <SelectTrigger className="w-[180px] h-8 text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nearest">Nearest First</SelectItem>
                <SelectItem value="fullest">Fullest First</SelectItem>
                <SelectItem value="emptiest">Emptiest First</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              View Map
            </Button>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Community Recycling Center</CardTitle>
                    <CardDescription>0.5 miles away</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    85% Full
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <Progress value={85} className="h-3 bg-gray-100" indicatorClassName="bg-amber-500" />
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Accepts: </span>
                  <span className="font-medium">Paper, Plastic, Glass, Metal</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="text-xs">
                  Get Directions
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Green Park Compost Station</CardTitle>
                    <CardDescription>1.2 miles away</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    40% Full
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <Progress value={40} className="h-3 bg-gray-100" indicatorClassName="bg-green-500" />
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Accepts: </span>
                  <span className="font-medium">Food Waste, Yard Waste, Compostables</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="text-xs">
                  Get Directions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
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
          <Link href="/monitoring" className="flex flex-col items-center justify-center text-green-600">
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

