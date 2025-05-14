import Link from "next/link"
import { ArrowLeft, Gift, Award, Zap, Clock, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RewardsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="text-xl font-bold">Blockchain Rewards</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <section className="mb-8">
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your EcoTokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-purple-800">120</p>
                  <p className="text-sm text-purple-600">Level: Eco Warrior</p>
                </div>
                <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                  Redeem Tokens
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-1 mb-4">
            <h2 className="text-lg font-bold">Your Progress</h2>
            <p className="text-sm text-muted-foreground">80 more tokens until next level</p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Eco Warrior</span>
                    <span>Eco Champion</span>
                  </div>
                  <Progress value={60} className="h-2 bg-gray-100" indicatorClassName="bg-purple-500" />
                  <div className="flex justify-between text-xs mt-1">
                    <span>100</span>
                    <span>200</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">This Week</p>
                    <p className="text-lg font-bold">+15</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">This Month</p>
                    <p className="text-lg font-bold">+42</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-lg font-bold">120</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <Tabs defaultValue="rewards" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>
            <TabsContent value="rewards" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">$5 Coffee Shop Voucher</CardTitle>
                        <CardDescription>Valid at any GreenBean location</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                        50 Tokens
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Expires in 30 days after redemption</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Redeem (50 Tokens)
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Public Transport Pass</CardTitle>
                        <CardDescription>1-day unlimited travel</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                        75 Tokens
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Valid for 3 months after redemption</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Redeem (75 Tokens)
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Eco-Friendly Product Discount</CardTitle>
                        <CardDescription>20% off at GreenLife Store</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                        100 Tokens
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Valid for one purchase within 60 days</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="default" size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                      Redeem (100 Tokens)
                    </Button>
                  </CardFooter>
                </Card>

                <Button variant="outline" size="sm" className="w-full">
                  View All Rewards
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Recycling Reward</CardTitle>
                        <CardDescription>March 15, 2025</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        +10 Tokens
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Earned for consistent recycling over 2 weeks</p>
                    <div className="mt-2 text-xs bg-gray-50 p-2 rounded-md font-mono">
                      Transaction ID: 0x8f72b4...3e21
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Coffee Voucher Redemption</CardTitle>
                        <CardDescription>March 10, 2025</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                        -50 Tokens
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Redeemed for $5 GreenBean Coffee voucher</p>
                    <div className="mt-2 text-xs bg-gray-50 p-2 rounded-md font-mono">
                      Transaction ID: 0x3a91c7...8f42
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">Waste Reduction Bonus</CardTitle>
                        <CardDescription>March 5, 2025</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        +15 Tokens
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Earned for 20% reduction in general waste</p>
                    <div className="mt-2 text-xs bg-gray-50 p-2 rounded-md font-mono">
                      Transaction ID: 0x6d45e2...9c13
                    </div>
                  </CardContent>
                </Card>

                <Button variant="outline" size="sm" className="w-full">
                  View Full History
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">How to Earn More Tokens</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Zap className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Consistent Recycling</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earn 5 tokens per week when you recycle consistently
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Award className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Waste Reduction</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earn up to 15 tokens monthly by reducing your general waste
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Community Participation</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earn 10 tokens for participating in community cleanup events
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Gift className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Referral Bonus</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Earn 20 tokens for each friend who joins and uses the app
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Learn More About Blockchain Rewards
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

