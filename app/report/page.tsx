import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
import { ArrowLeft, Camera, MapPin, Upload, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center h-16 px-4">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="text-xl font-bold">Report an Issue</h1>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <section className="mb-8">
          <div className="space-y-1 mb-4">
            <h2 className="text-lg font-bold">New Report</h2>
            <p className="text-sm text-muted-foreground">Report illegal dumping or missed collections</p>
          </div>

          <Card>
            <CardContent className="p-4">
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="issue-type">Issue Type</Label>
                  <Select>
                    <SelectTrigger id="issue-type">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="illegal-dumping">Illegal Dumping</SelectItem>
                      <SelectItem value="missed-collection">Missed Collection</SelectItem>
                      <SelectItem value="damaged-bin">Damaged Bin</SelectItem>
                      <SelectItem value="overflowing-bin">Overflowing Public Bin</SelectItem>
                      <SelectItem value="other">Other Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Input id="location" placeholder="Enter address or description" className="flex-1" />
                    <Button variant="outline" size="icon" className="shrink-0">
                      <MapPin className="h-4 w-4" />
                      <span className="sr-only">Use current location</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Or tap the pin to use your current location</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the issue in detail" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label>Severity</Label>
                  <RadioGroup defaultValue="medium">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="text-sm font-normal">
                        Low - Not urgent
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="text-sm font-normal">
                        Medium - Needs attention
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="text-sm font-normal">
                        High - Urgent issue
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Add Photos</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center p-2 hover:bg-gray-50 cursor-pointer">
                      <Camera className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-center text-muted-foreground">Take Photo</span>
                    </div>
                    <div className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center p-2 hover:bg-gray-50 cursor-pointer">
                      <Upload className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-center text-muted-foreground">Upload</span>
                    </div>
                    <div className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center p-2 hover:bg-gray-50 cursor-pointer opacity-50">
                      <span className="text-xs text-center text-muted-foreground">Add More</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Add up to 3 photos to help describe the issue</p>
                </div>

                <div className="pt-2">
                  <Button className="w-full">Submit Report</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4">Your Recent Reports</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Missed Collection</CardTitle>
                    <CardDescription>March 10, 2025</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">Recyclables bin was not collected on scheduled day</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>123 Main Street</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/report/REP-2025-0123" className="w-full">
                  <Button variant="outline" size="sm" className="text-xs w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">Illegal Dumping</CardTitle>
                    <CardDescription>March 5, 2025</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Resolved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">Construction waste dumped near community park</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Green Park, West Entrance</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/report/REP-2025-0124" className="w-full">
                  <Button variant="outline" size="sm" className="text-xs w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-4">Reporting Guidelines</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-full shrink-0">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">When to Report</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Report issues like missed collections after 24 hours, damaged bins, illegal dumping, or
                      overflowing public bins.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full shrink-0">
                    <Camera className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Include Photos</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Clear photos help our team assess and resolve issues more quickly. Include multiple angles if
                      possible.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full shrink-0">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Precise Location</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Provide exact addresses or use the location pin feature to help our team find the issue quickly.
                    </p>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <p className="text-xs text-muted-foreground">
                    For emergencies or hazardous waste issues, please contact the emergency hotline directly at (555)
                    123-4567.
                  </p>
                </div>
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
          <Link href="/report" className="flex flex-col items-center justify-center text-green-600">
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

