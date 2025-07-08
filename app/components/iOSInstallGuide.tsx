"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Share,
  Download,
  CheckCircle,
  ArrowRight,
  AppleIcon as Safari,
  Globe,
  ExternalLink,
} from "lucide-react"

export default function IOSInstallGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)
  }, [])

  const steps = [
    {
      title: "Deploy Your App",
      description: "First, get your TaskFlow app online",
      icon: Globe,
      details: [
        "Click 'Download Code' button in this chat",
        "Sign up for free at vercel.com",
        "Upload your code and deploy",
        "Get your live URL (e.g., taskflow-yourname.vercel.app)",
      ],
      action: "Deploy Now",
      link: "https://vercel.com/new",
    },
    {
      title: "Open in Safari",
      description: "Visit your deployed app in Safari browser",
      icon: Safari,
      details: [
        "Open Safari on your iPhone",
        "Go to your deployed app URL",
        "Make sure the app loads completely",
        "Test that it works properly",
      ],
      action: "Open Safari",
    },
    {
      title: "Tap Share Button",
      description: "Find and tap the share icon",
      icon: Share,
      details: [
        "Look for the share button at the bottom of Safari",
        "It's a square with an arrow pointing up",
        "Tap it to open the share menu",
        "You'll see various sharing options",
      ],
      action: "Find Share",
    },
    {
      title: "Add to Home Screen",
      description: "Install TaskFlow as an app",
      icon: Download,
      details: [
        "Scroll down in the share menu",
        "Look for 'Add to Home Screen'",
        "Tap it to start installation",
        "You can customize the app name if you want",
      ],
      action: "Add App",
    },
    {
      title: "Enjoy TaskFlow!",
      description: "Your app is now installed",
      icon: CheckCircle,
      details: [
        "Find TaskFlow icon on your home screen",
        "Tap to open - it works like a native app!",
        "All your data is saved locally",
        "Works offline after first load",
      ],
      action: "Start Using",
    },
  ]

  const currentStepData = steps[currentStep]

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-blue-50 mb-6">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-800">Install TaskFlow on iPhone</CardTitle>
          <p className="text-gray-600">Get the full app experience in just 5 minutes!</p>
          {isIOS && <Badge className="mx-auto mt-2 bg-green-100 text-green-800">✅ iPhone Detected</Badge>}
        </CardHeader>
      </Card>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index <= currentStep
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white scale-110"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-1 mx-2 transition-all ${
                  index < currentStep ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Current Step Details */}
      <Card className="border-2 border-purple-200 bg-white mb-6">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <currentStepData.icon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Step {currentStep + 1}: {currentStepData.title}
              </h3>
              <p className="text-gray-600 mb-4">{currentStepData.description}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-800 mb-3">What to do:</h4>
            <ul className="space-y-2">
              {currentStepData.details.map((detail, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {currentStep === 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-blue-800 mb-2">🚀 Quick Deploy:</h4>
              <div className="space-y-2">
                <Button
                  onClick={() => window.open("https://vercel.com/new", "_blank")}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Deploy to Vercel (Free)
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Badge variant="secondary" className="px-4 py-2">
          {currentStep + 1} of {steps.length}
        </Badge>
        <Button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Why Install as App */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-800 mb-3">🌟 Why Install as an App?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Works offline after first load</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Faster loading times</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Native app feel</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No App Store needed</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Full screen experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Data saved locally</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Option */}
      <Card className="mt-6 bg-gray-50 border-gray-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-gray-800 mb-2">💡 Can't Deploy Right Now?</h4>
          <p className="text-sm text-gray-600 mb-3">
            You can bookmark this page and use TaskFlow directly in Safari. All features work perfectly, and your data
            will be saved!
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "TaskFlow",
                  url: window.location.href,
                })
              }
            }}
            className="w-full"
          >
            <Share className="w-4 h-4 mr-2" />
            Bookmark This Page
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
