"use client"

import { useState } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Trash2, Tag, Play, Pause, Timer } from "lucide-react"
import SwipeActions from "./SwipeActions"

interface TaskItemProps {
  task: any
}

export default function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask, startTask, pauseTask, completeTask, activeTask } = useTaskContext()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleToggleComplete = async () => {
    if (task.completed) {
      await updateTask(task.id, { completed: false, completed_at: null })
    } else {
      await completeTask(task.id)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    await deleteTask(task.id)
  }

  const handleStartPause = async () => {
    if (task.is_active) {
      await pauseTask(task.id)
    } else {
      await startTask(task.id)
    }
  }

  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  }

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !task.completed
  const isActive = activeTask?.id === task.id

  const formatTime = (seconds: number | null) => {
    if (!seconds) return "0m"

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <SwipeActions task={task}>
      <Card
        className={`border-0 shadow-lg transition-all duration-300 hover:shadow-xl ${
          task.completed ? "bg-gray-50/80" : isActive ? "bg-purple-50/80 border-l-4 border-l-purple-500" : "bg-white/80"
        } backdrop-blur-sm ${isOverdue ? "border-l-4 border-l-red-500" : ""}`}
      >
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 pt-1">
              <Checkbox checked={task.completed} onCheckedChange={handleToggleComplete} className="w-5 h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3
                  className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}
                >
                  {task.title}
                  {isActive && (
                    <Badge className="ml-2 bg-purple-100 text-purple-800 animate-pulse">
                      <Timer className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </h3>

                <div className="flex items-center space-x-2 ml-4">
                  <Badge className={priorityColors[task.priority]}>{task.priority}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {task.description && (
                <p className={`text-sm mb-3 ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  {task.category}
                </div>

                {task.due_date && (
                  <div className={`flex items-center ${isOverdue ? "text-red-600 font-medium" : ""}`}>
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(task.due_date).toLocaleDateString()}
                    {isOverdue && " (Overdue)"}
                  </div>
                )}

                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(task.created_at).toLocaleDateString()}
                </div>

                {task.total_time_spent > 0 && (
                  <div className="flex items-center">
                    <Timer className="w-4 h-4 mr-1" />
                    {formatTime(task.total_time_spent)}
                  </div>
                )}
              </div>

              {/* Time Tracking Controls */}
              {!task.completed && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleStartPause}
                    className={`${
                      isActive
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {isActive ? (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </SwipeActions>
  )
}
