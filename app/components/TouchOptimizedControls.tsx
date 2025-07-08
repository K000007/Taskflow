"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

interface TouchOptimizedControlsProps {
  onAddTask: () => void
  onShowTemplates: () => void
  onShowMenu?: () => void
}

export default function TouchOptimizedControls({
  onAddTask,
  onShowTemplates,
  onShowMenu,
}: TouchOptimizedControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Close expanded menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isExpanded) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("touchstart", handleClickOutside)
    return () => document.removeEventListener("touchstart", handleClickOutside)
  }, [isExpanded])

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {/* Expanded Options */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-3 mb-2">
              <Button
                onClick={() => {
                  onShowTemplates()
                  setIsExpanded(false)
                }}
                className="w-14 h-14 rounded-full bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 shadow-lg"
                size="lg"
              >
                📋
              </Button>
              <Button
                onClick={() => {
                  onAddTask()
                  setIsExpanded(false)
                }}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                size="lg"
              >
                <Plus className="w-6 h-6" />
              </Button>
            </div>
          )}

          {/* Main FAB */}
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 ${
              isExpanded
                ? "bg-red-500 hover:bg-red-600 text-white rotate-45"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            }`}
            size="lg"
          >
            {isExpanded ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Backdrop */}
      {isExpanded && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setIsExpanded(false)} />}
    </>
  )
}
