"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Download, Zap, CheckCircle, Globe } from "lucide-react"

export default function DeploymentGuide() {
  const deploySteps = [
    {
      title: "Download Your Code",
      description: "Click the 'Download Code' button at the top right of this chat",
      icon: Download,
      action: "Download Now",
      status: "ready",
    },
    {
      title: "Create Vercel Account",
      description: "Sign up at vercel.com with your GitHub account (it's free!)",
      icon: Globe,
      action: "Sign Up",
      link: "https://vercel.com/signup",
      status: "ready",
    },
    {
      title: "Upload to GitHub",
      description: "Create a new repository and upload your TaskFlow code",
      icon: Github,
      action: "Create Repo",
      link: "https://github.com/new",
      status: "ready",
    },
    {
      title: "Deploy to Vercel",
      description: "Import your GitHub repo to Vercel and deploy with one click",
      icon: Zap,
      action: "Deploy",
      link: "https://vercel.com/new",
      status: "ready",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-blue-50 mb-8">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl text-gray-800">Deploy TaskFlow to Vercel</CardTitle>
          <p className="text-gray-600 text-lg">Get your app live in under 5 minutes!</p>
          <Badge className="mx-auto mt-2 bg-green-100 text-green-800">100% Free</Badge>
        </CardHeader>
      </Card>

      {/* Quick Deploy Options */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Zap className="w-6 h-6 mr-2 text-purple-600" />
              Quick Deploy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Deploy directly from this code with one click</p>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() =>
                window.open(
                  "https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world",
                  "_blank",
                )
              }
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Deploy to Vercel
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Github className="w-6 h-6 mr-2 text-blue-600" />
              GitHub Deploy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Upload to GitHub first, then deploy (recommended)</p>
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
              onClick={() => window.open("https://github.com/new", "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              Create Repository
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Step by Step Guide */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">Step-by-Step Guide</CardTitle>
          <p className="text-gray-600">Follow these steps to deploy your TaskFlow app</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {deploySteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <step.icon className="w-5 h-5 mr-2 text-purple-600" />
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  {step.link && (
                    <Button
                      size="sm"
                      onClick={() => window.open(step.link, "_blank")}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {step.action}
                    </Button>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* What You'll Get */}
      <Card className="mt-8 border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800">🎉 What You'll Get After Deployment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Live URL for your TaskFlow app</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Automatic HTTPS security</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Global CDN for fast loading</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Automatic updates when you push code</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Mobile-optimized performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>PWA installation capability</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Free custom domain option</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Analytics and monitoring</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Need Help */}
      <Card className="mt-8 border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">🆘 Need Help?</h3>
          <p className="text-yellow-700 mb-4">
            If you run into any issues during deployment, here are some helpful resources:
          </p>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://vercel.com/docs", "_blank")}
              className="mr-2 border-yellow-600 text-yellow-700 hover:bg-yellow-100"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Vercel Documentation
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://vercel.com/support", "_blank")}
              className="border-yellow-600 text-yellow-700 hover:bg-yellow-100"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Vercel Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
