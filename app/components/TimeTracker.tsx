"use client"

import { useState, useEffect } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pause, Square, Clock, Timer } from "lucide-react"

export default function TimeTracker() {
  const { activeTask, startTask, pauseTask, completeTask } = useTaskContext()
  const [currentTime, setCurrentTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (activeTask && activeTask.is_active) {
      setIsRunning(true)
      const startTime = new Date(activeTask.started_at!).getTime()

      interval = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTime) / 1000)
        setCurrentTime(elapsed)
      }, 1000)
    } else {
      setIsRunning(false)
      setCurrentTime(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [activeTask])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const formatTotalTime = (seconds: number | null) => {
    if (!seconds) return "0m"

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const handlePause = async () => {
    if (activeTask) {
      await pauseTask(activeTask.id)
    }
  }

  const handleComplete = async () => {
    if (activeTask) {
      await completeTask(activeTask.id)
    }
  }

  if (!activeTask) {
    return (
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
        <CardContent className="p-6 text-center">
          <Timer className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Task</h3>
          <p className="text-gray-500">Start a task to begin time tracking</p>
        </CardContent>
      </Card>
    )
  }

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Clock className="w-6 h-6 mr-2 text-purple-600" />
          Active Task Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Task Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{activeTask.title}</h3>
            <Badge className={priorityColors[activeTask.priority]}>{activeTask.priority}</Badge>
          </div>
          {activeTask.description && <p className="text-gray-600 text-sm">{activeTask.description}</p>}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Category: {activeTask.category}</span>
            <span>Total Time: {formatTotalTime(activeTask.total_time_spent)}</span>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center">
          <div className="text-6xl font-mono font-bold text-gray-800 mb-2">{formatTime(currentTime)}</div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <div className={`w-2 h-2 rounded-full ${isRunning ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            <span>{isRunning ? "Running" : "Paused"}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex space-x-3">
          <Button
            onClick={handlePause}
            variant="outline"
            className="flex-1 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button
            onClick={handleComplete}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
          >
            <Square className="w-4 h-4 mr-2" />
            Complete
          </Button>
        </div>

        {/* Session Info */}
        <div className="bg-white/50 rounded-lg p-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Started:</span>
            <span>{new Date(activeTask.started_at!).toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Current Session:</span>
            <span>{formatTime(currentTime)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
