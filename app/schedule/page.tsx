import Link from "next/link"
import { ArrowLeft, Bell, BellOff, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SchedulePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="text-xl font-bold">Collection Schedule</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <Tabs defaultValue="weekly" className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="monthly">Monthly View</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="mt-4">
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={i} className="text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {[
                { day: 10, active: false },
                { day: 11, active: false },
                { day: 12, active: false },
                { day: 13, active: false },
                { day: 14, active: false },
                { day: 15, active: false },
                { day: 16, active: true, today: true },
                { day: 17, active: true },
                { day: 18, active: false },
                { day: 19, active: false },
                { day: 20, active: true },
                { day: 21, active: false },
                { day: 22, active: false },
                { day: 23, active: false },
              ].map((date, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center h-10 rounded-full text-sm font-medium
                    ${date.today ? "bg-green-100 text-green-800 border border-green-300" : ""}
                    ${date.active && !date.today ? "bg-green-50 text-green-800" : ""}
                  `}
                >
                  {date.day}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Card className="border-green-100">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Tomorrow, March 17</CardTitle>
                      <CardDescription>Recyclables & General Waste</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Reminder Set
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Collection between 7:00 AM - 9:00 AM</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="text-xs">
                    <BellOff className="h-3 w-3 mr-1" />
                    Remove Reminder
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Monday, March 20</CardTitle>
                      <CardDescription>Compostables</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Collection between 7:00 AM - 9:00 AM</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Bell className="h-3 w-3 mr-1" />
                    Set Reminder
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Thursday, March 23</CardTitle>
                      <CardDescription>Recyclables & General Waste</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Collection between 7:00 AM - 9:00 AM</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Bell className="h-3 w-3 mr-1" />
                    Set Reminder
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <h3 className="text-lg font-medium">March 2025</h3>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
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
          </TabsContent>
        </Tabs>

        <section className="mb-6">
          <h2 className="text-lg font-bold mb-4">Notification Settings</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Day Before Reminder</h3>
                    <p className="text-xs text-muted-foreground">Get notified at 6:00 PM</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Morning Reminder</h3>
                    <p className="text-xs text-muted-foreground">Get notified at 6:00 AM</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-medium">Missed Collection Alert</h3>
                    <p className="text-xs text-muted-foreground">Get notified if collection is missed</p>
                  </div>
                  <Switch checked={false} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">Collection Guidelines</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-green-800">Recyclables (Blue Bin)</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Paper, cardboard, plastic bottles, metal cans, glass containers. All items should be clean and dry.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-800">General Waste (Black Bin)</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Non-recyclable items, food packaging, disposable items, broken household items.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-green-800">Compostables (Green Bin)</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Food scraps, yard waste, coffee grounds, tea bags, paper towels, compostable packaging.
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View Complete Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <Link href="/schedule" className="flex flex-col items-center justify-center text-green-600">
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

