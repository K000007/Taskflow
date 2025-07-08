"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Download, Share } from "lucide-react"

export default function MobileOptimizations() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if running in standalone mode (already installed)
    const standalone = window.matchMedia("(display-mode: standalone)").matches
    setIsStandalone(standalone)

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Hide install prompt after some time if not interacted with
    const timer = setTimeout(() => {
      if (showInstallPrompt) {
        setShowInstallPrompt(false)
      }
    }, 10000)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      clearTimeout(timer)
    }
  }, [showInstallPrompt])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setShowInstallPrompt(false)
      }
    }
  }

  const handleIOSInstall = () => {
    setShowInstallPrompt(false)
  }

  // Don't show if already installed
  if (isStandalone) {
    return null
  }

  // Show iOS-specific install instructions
  if (isIOS && showInstallPrompt) {
    return (
      <Card className="fixed bottom-4 left-4 right-4 z-50 border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Install TaskFlow</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowInstallPrompt(false)} className="p-1 h-auto">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-4">Install TaskFlow on your iPhone for the best experience:</p>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                1
              </span>
              <span>
                Tap the <Share className="w-4 h-4 inline mx-1" /> Share button below
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                2
              </span>
              <span>Scroll down and tap "Add to Home Screen"</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                3
              </span>
              <span>Tap "Add" to install TaskFlow</span>
            </div>
          </div>
          <Button
            onClick={handleIOSInstall}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Got it!
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Show Android/PWA install prompt
  if (showInstallPrompt && deferredPrompt) {
    return (
      <Card className="fixed bottom-4 left-4 right-4 z-50 border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-800">Install TaskFlow</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowInstallPrompt(false)} className="p-1 h-auto">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-4">Install TaskFlow for quick access and offline use!</p>
          <div className="flex space-x-2">
            <Button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Install
            </Button>
            <Button variant="outline" onClick={() => setShowInstallPrompt(false)} className="px-4">
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
