import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Users, Calendar, ThumbsUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="text-xl font-bold">Community</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <section className="mb-8">
          <Tabs defaultValue="feed" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            <TabsContent value="feed" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">Jane Doe</CardTitle>
                          <CardDescription>2 hours ago</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Eco Champion
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">
                      Just finished our neighborhood cleanup event! We collected over 50 bags of recyclables and
                      properly disposed of several large items. Thanks to everyone who participated! 🌱♻️
                    </p>
                    <div className="mt-3 rounded-md overflow-hidden">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Neighborhood cleanup"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-xs gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>24 Likes</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>8 Comments</span>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Share
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                          <AvatarFallback>EC</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">EcoWaste Team</CardTitle>
                          <CardDescription>Yesterday</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        Official
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">
                      Did you know? Composting can reduce your household waste by up to 30%! Check out our new guide on
                      setting up a home composting system. 🌱
                    </p>
                    <div className="mt-3 p-3 bg-blue-50 rounded-md">
                      <h3 className="text-sm font-medium text-blue-800">Home Composting Guide</h3>
                      <p className="text-xs text-blue-600 mt-1">
                        Learn how to turn food scraps into nutrient-rich soil
                      </p>
                      <Button variant="link" size="sm" className="text-xs p-0 h-auto mt-2">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-xs gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>42 Likes</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>15 Comments</span>
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Share
                    </Button>
                  </CardFooter>
                </Card>

                <Button variant="outline" size="sm" className="w-full">
                  View More Posts
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="events" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Community Cleanup Day</CardTitle>
                        <CardDescription>March 20, 2025 • 9:00 AM</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Upcoming
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Join us for our monthly community cleanup event at Green Park. All equipment will be provided!
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>24 people attending</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                      RSVP
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Recycling Workshop</CardTitle>
                        <CardDescription>March 25, 2025 • 6:30 PM</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Upcoming
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Learn advanced recycling techniques and how to properly sort different materials.
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>18 people attending</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                      RSVP
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Composting Masterclass</CardTitle>
                        <CardDescription>April 5, 2025 • 10:00 AM</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        Upcoming
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Expert-led workshop on home composting techniques and best practices.
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>12 people attending</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" className="text-xs">
                      View Details
                    </Button>
                    <Button variant="default" size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                      RSVP
                    </Button>
                  </CardFooter>
                </Card>

                <Button variant="outline" size="sm" className="w-full">
                  View All Events
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="leaderboard" className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium">Monthly Leaderboard</h3>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="alltime">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-amber-300">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-2 -right-2 bg-amber-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Jane Doe</h3>
                        <p className="text-xs text-muted-foreground">Eco Champion</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-amber-800">245</p>
                        <p className="text-xs text-amber-600">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-100">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-gray-300">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Profile" />
                          <AvatarFallback>MS</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-2 -right-2 bg-gray-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Mike Smith</h3>
                        <p className="text-xs text-muted-foreground">Waste Warrior</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">210</p>
                        <p className="text-xs text-gray-600">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-orange-300">
                          <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Profile" />
                          <AvatarFallback>AL</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Alex Lee</h3>
                        <p className="text-xs text-muted-foreground">Recycling Pro</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-800">185</p>
                        <p className="text-xs text-orange-600">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-2">
                  {[
                    { rank: 4, name: "Sarah Johnson", title: "Green Guardian", points: 170 },
                    { rank: 5, name: "David Chen", title: "Compost King", points: 155 },
                    { rank: 6, name: "Emily Wong", title: "Waste Reducer", points: 140 },
                    { rank: 7, name: "Tom Garcia", title: "Eco Enthusiast", points: 125 },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center p-3 bg-white rounded-md border">
                      <div className="w-6 h-6 flex items-center justify-center text-xs font-medium text-muted-foreground mr-3">
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.title}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{user.points}</p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 p-3 rounded-md border border-green-100">
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center text-xs font-medium text-green-600 mr-3">
                      12
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">You</h3>
                      <p className="text-xs text-green-600">Eco Warrior</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-700">120</p>
                      <p className="text-xs text-green-600">points</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  View Full Leaderboard
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Educational Resources</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Waste Sorting Guide</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Learn how to properly sort different types of waste for maximum recycling efficiency.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="text-xs w-full">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Composting 101</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Everything you need to know about starting and maintaining a home composting system.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="text-xs w-full">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Reducing Household Waste</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  Practical tips and strategies to reduce your overall waste production.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="text-xs w-full">
                  Read Guide
                </Button>
              </CardFooter>
            </Card>

            <Button variant="outline" size="sm" className="w-full">
              View All Resources
            </Button>
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

