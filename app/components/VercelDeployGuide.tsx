"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Github, Zap, Smartphone, Database, Globe } from "lucide-react"

export default function VercelDeployGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Deploy TaskFlow to Vercel</h1>
          </div>
          <p className="text-xl text-gray-600">Get your task management app live in under 2 minutes!</p>
          <Badge variant="secondary" className="text-sm">
            ✅ GitHub Repository Ready • ✅ Mobile Optimized • ✅ Offline Support
          </Badge>
        </div>

        {/* Quick Deploy Button */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Zap className="h-6 w-6 text-blue-600" />
              One-Click Deploy
            </CardTitle>
            <CardDescription className="text-lg">Deploy directly from your GitHub repository</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button
              size="lg"
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg"
              onClick={() =>
                window.open(
                  "https://vercel.com/new/git/external?repository-url=https://github.com/K000007/Taskflow",
                  "_blank",
                )
              }
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Deploy to Vercel Now
            </Button>
            <p className="text-sm text-gray-600">This will import your GitHub repo and deploy automatically</p>
          </CardContent>
        </Card>

        {/* Step by Step Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              Step-by-Step Deployment
            </CardTitle>
            <CardDescription>Follow these simple steps to get TaskFlow live</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Go to Vercel</h3>
                <p className="text-gray-600">
                  Visit{" "}
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                    rel="noreferrer"
                  >
                    vercel.com/new
                  </a>{" "}
                  and sign in with GitHub
                </p>
              </div>
            </div>

            <Separator />

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Import Repository</h3>
                <p className="text-gray-600">
                  Find and select your <code className="bg-gray-100 px-2 py-1 rounded">Taskflow</code> repository
                </p>
                <Badge variant="outline">Repository: K000007/Taskflow</Badge>
              </div>
            </div>

            <Separator />

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Deploy</h3>
                <p className="text-gray-600">Click "Deploy" - Vercel will automatically build and deploy your app</p>
                <Badge variant="secondary">⏱️ Takes ~2 minutes</Badge>
              </div>
            </div>

            <Separator />

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Your App is Live!</h3>
                <p className="text-gray-600">
                  You'll get a live URL like{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">taskflow-xyz.vercel.app</code>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Card */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-600" />
                iPhone Ready
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">✅ Add to Home Screen</p>
              <p className="text-sm text-gray-600">✅ Works Offline</p>
              <p className="text-sm text-gray-600">✅ Touch Optimized</p>
              <p className="text-sm text-gray-600">✅ Native App Feel</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Data Storage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">✅ Local Storage (Default)</p>
              <p className="text-sm text-gray-600">✅ Supabase Ready</p>
              <p className="text-sm text-gray-600">✅ No Setup Required</p>
              <p className="text-sm text-gray-600">✅ Data Persistence</p>
            </CardContent>
          </Card>
        </div>

        {/* Optional: Database Setup */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Database className="h-5 w-5" />
              Optional: Add Database (Later)
            </CardTitle>
            <CardDescription className="text-orange-700">
              Your app works perfectly without a database. Add Supabase later for cloud sync.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-700">
              TaskFlow uses local storage by default. To add cloud sync across devices, you can add Supabase integration
              later through the Vercel dashboard.
            </p>
          </CardContent>
        </Card>

        {/* Success Message */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Ready to Deploy!</span>
              </div>
              <p className="text-sm text-green-700">Your TaskFlow app is configured and ready for Vercel deployment</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
