"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Download, Share, Chrome, Globe, CheckCircle, ArrowRight, ExternalLink } from "lucide-react"

export default function PhoneSetupGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "unknown">("unknown")

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      setDeviceType("ios")
    } else if (/Android/.test(userAgent)) {
      setDeviceType("android")
    }
  }, [])

  const iosSteps = [
    {
      title: "Deploy Your App",
      description: "Use the 'Download Code' button and deploy to Vercel for free",
      icon: Globe,
      action: "Deploy Now",
    },
    {
      title: "Open in Safari",
      description: "Visit your deployed app URL in Safari browser",
      icon: Globe,
      action: "Open Safari",
    },
    {
      title: "Tap Share Button",
      description: "Tap the share button (square with arrow pointing up)",
      icon: Share,
      action: "Find Share",
    },
    {
      title: "Add to Home Screen",
      description: "Scroll down and tap 'Add to Home Screen'",
      icon: Download,
      action: "Add App",
    },
    {
      title: "Enjoy TaskFlow!",
      description: "TaskFlow is now installed like a native app",
      icon: CheckCircle,
      action: "Start Using",
    },
  ]

  const androidSteps = [
    {
      title: "Deploy Your App",
      description: "Use the 'Download Code' button and deploy to Vercel for free",
      icon: Globe,
      action: "Deploy Now",
    },
    {
      title: "Open in Chrome",
      description: "Visit your deployed app URL in Chrome browser",
      icon: Chrome,
      action: "Open Chrome",
    },
    {
      title: "Tap Menu",
      description: "Tap the three dots menu in the top right",
      icon: Share,
      action: "Find Menu",
    },
    {
      title: "Add to Home Screen",
      description: "Tap 'Add to Home screen' or 'Install app'",
      icon: Download,
      action: "Install App",
    },
    {
      title: "Enjoy TaskFlow!",
      description: "TaskFlow is now installed like a native app",
      icon: CheckCircle,
      action: "Start Using",
    },
  ]

  const steps = deviceType === "ios" ? iosSteps : androidSteps
  const currentStepData = steps[currentStep]

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-800">
            Get TaskFlow on Your {deviceType === "ios" ? "iPhone" : deviceType === "android" ? "Android" : "Phone"}
          </CardTitle>
          <p className="text-gray-600">Follow these simple steps to install TaskFlow</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      index < currentStep ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Step */}
          <Card className="border-2 border-purple-200 bg-white">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <currentStepData.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Step {currentStep + 1}: {currentStepData.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{currentStepData.description}</p>

                  {currentStep === 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-blue-800 mb-2">Quick Deploy Options:</h4>
                      <div className="space-y-2">
                        <a
                          href="https://vercel.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Deploy to Vercel (Recommended)
                        </a>
                        <a
                          href="https://netlify.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Deploy to Netlify
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
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

          {/* Quick Alternative */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-800 mb-2">💡 Quick Alternative</h4>
              <p className="text-sm text-gray-600">
                Can't deploy right now? You can use TaskFlow directly in your phone's browser by bookmarking this page.
                All features work perfectly, and your data will be saved locally!
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
