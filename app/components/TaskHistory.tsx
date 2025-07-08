"use client"

import { useState, useEffect } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Clock, Play, Pause, CheckCircle, Edit, Trash2, Plus } from "lucide-react"

export default function TaskHistory() {
  const { taskHistory, getTaskHistory, tasks } = useTaskContext()
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>()

  useEffect(() => {
    getTaskHistory()
  }, [])

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return <Plus className="w-4 h-4 text-blue-500" />
      case "started":
        return <Play className="w-4 h-4 text-green-500" />
      case "paused":
        return <Pause className="w-4 h-4 text-orange-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "updated":
        return <Edit className="w-4 h-4 text-blue-500" />
      case "deleted":
        return <Trash2 className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "bg-blue-100 text-blue-800"
      case "started":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "updated":
        return "bg-blue-100 text-blue-800"
      case "deleted":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTaskTitle = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId)
    return task?.title || "Unknown Task"
  }

  const filteredHistory = selectedTaskId ? taskHistory.filter((h) => h.task_id === selectedTaskId) : taskHistory

  return (
    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <History className="w-6 h-6 mr-2 text-purple-600" />
          Task History
        </CardTitle>

        {/* Filter by task */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            size="sm"
            variant={!selectedTaskId ? "default" : "outline"}
            onClick={() => setSelectedTaskId(undefined)}
            className="rounded-full"
          >
            All Tasks
          </Button>
          {tasks.slice(0, 5).map((task) => (
            <Button
              key={task.id}
              size="sm"
              variant={selectedTaskId === task.id ? "default" : "outline"}
              onClick={() => setSelectedTaskId(task.id)}
              className="rounded-full"
            >
              {task.title.length > 20 ? `${task.title.substring(0, 20)}...` : task.title}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-8">
              <History className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">No history found</p>
            </div>
          ) : (
            filteredHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">{getActionIcon(entry.action)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getActionColor(entry.action)}>{entry.action}</Badge>
                    <span className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleString()}</span>
                  </div>

                  <h4 className="font-medium text-gray-800 mb-1">{getTaskTitle(entry.task_id)}</h4>

                  {entry.new_values && (
                    <div className="text-sm text-gray-600">
                      {entry.action === "created" && "Task created"}
                      {entry.action === "started" && "Timer started"}
                      {entry.action === "paused" && "Timer paused"}
                      {entry.action === "completed" && "Task completed"}
                      {entry.action === "updated" && "Task updated"}
                      {entry.action === "deleted" && "Task deleted"}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
