"use client"

import type { Task } from "../types/task"
import TaskItem from "./TaskItem"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card className="p-12 text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <div className="text-gray-400 mb-4">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
        <p className="text-gray-500">Create your first task to get started!</p>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
