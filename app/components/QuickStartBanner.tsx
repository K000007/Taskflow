"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, X, ExternalLink, Apple } from "lucide-react"
import Link from "next/link"

export default function QuickStartBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if user is on mobile
    const checkMobile = () => {
      const mobile =
        window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

      setIsMobile(mobile)
      setIsIOS(iOS)

      // Show banner only on mobile and if not dismissed
      const dismissed = localStorage.getItem("setup-banner-dismissed")
      if (mobile && !dismissed) {
        setShowBanner(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const dismissBanner = () => {
    setShowBanner(false)
    localStorage.setItem("setup-banner-dismissed", "true")
  }

  if (!showBanner || !isMobile) return null

  return (
    <Card className="fixed top-4 left-4 right-4 z-50 border-0 shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            {isIOS ? (
              <Apple className="w-6 h-6 mt-1 flex-shrink-0" />
            ) : (
              <Smartphone className="w-6 h-6 mt-1 flex-shrink-0" />
            )}
            <div>
              <h3 className="font-semibold mb-1">
                {isIOS ? "Install TaskFlow on iPhone!" : "Install TaskFlow on Your Phone!"}
              </h3>
              <p className="text-sm opacity-90 mb-3">
                Get the full app experience with offline access and native feel.
              </p>
              <div className="flex space-x-2">
                <Link href={isIOS ? "/ios-setup" : "/setup"}>
                  <Button size="sm" variant="secondary" className="text-purple-600">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    {isIOS ? "iPhone Guide" : "Setup Guide"}
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={dismissBanner}
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Later
                </Button>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={dismissBanner} className="text-white hover:bg-white/10 p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
