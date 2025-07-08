"use client"

import { useState } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
import TaskStats from "./TaskStats"
import TimeTracker from "./TimeTracker"
import TaskHistory from "./TaskHistory"
import TimeAnalytics from "./TimeAnalytics"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TemplateSelector from "./TemplateSelector"
import TouchOptimizedControls from "./TouchOptimizedControls"

export default function TaskManager() {
  const { tasks } = useTaskContext()
  const [showForm, setShowForm] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stats Section */}
      <TaskStats />

      {/* Time Tracker */}
      <TimeTracker />

      {/* Main Content Tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          {/* Add Task Buttons */}
          <TouchOptimizedControls
            onAddTask={() => {
              setShowForm(!showForm)
              setShowTemplates(false)
            }}
            onShowTemplates={() => {
              setShowTemplates(!showTemplates)
              setShowForm(false)
            }}
          />

          {/* Task Form */}
          {showForm && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Create New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskForm onClose={() => setShowForm(false)} />
              </CardContent>
            </Card>
          )}

          {/* Template Selector */}
          {showTemplates && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Choose a Template</CardTitle>
              </CardHeader>
              <CardContent>
                <TemplateSelector
                  onSelectTemplate={(template) => {
                    setShowTemplates(false)
                    setShowForm(true)
                  }}
                  onClose={() => setShowTemplates(false)}
                />
              </CardContent>
            </Card>
          )}

          {/* Filter Buttons */}
          <div className="flex justify-center space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-full"
            >
              All Tasks
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
              className="rounded-full"
            >
              Pending
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className="rounded-full"
            >
              Completed
            </Button>
          </div>

          {/* Task List */}
          <TaskList tasks={filteredTasks} />
        </TabsContent>

        <TabsContent value="history">
          <TaskHistory />
        </TabsContent>

        <TabsContent value="analytics">
          <TimeAnalytics />
        </TabsContent>

        <TabsContent value="templates">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Task Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateSelector
                onSelectTemplate={(template) => {
                  // Handle template selection
                }}
                onClose={() => {}}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
