"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Tag } from "lucide-react"

interface TaskFormProps {
  onClose: () => void
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const { addTask } = useTaskContext()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [dueDate, setDueDate] = useState("")
  const [category, setCategory] = useState("")

  // Load template if one was selected
  useEffect(() => {
    const selectedTemplate = localStorage.getItem("selectedTemplate")
    if (selectedTemplate) {
      const template = JSON.parse(selectedTemplate)
      setTitle(template.title)
      setDescription(template.description)
      setPriority(template.priority)
      setCategory(template.category)

      // Set due date if suggested
      if (template.suggestedDueDate) {
        setDueDate(template.suggestedDueDate)
      }

      // Clear the template from localStorage
      localStorage.removeItem("selectedTemplate")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await addTask({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      due_date: dueDate || null,
      category: category.trim() || "General",
      completed: false,
    })

    // Reset form
    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
    setCategory("")
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Template Indicator */}
      {title && description && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-purple-700">
            📋 <strong>Template loaded:</strong> You can customize the details below before creating the task.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Task Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="border-2 focus:border-purple-500 rounded-lg"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add task description..."
          className="border-2 focus:border-purple-500 rounded-lg min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            Priority
          </label>
          <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
            <SelectTrigger className="border-2 focus:border-purple-500 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Low Priority
                </span>
              </SelectItem>
              <SelectItem value="medium">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Medium Priority
                </span>
              </SelectItem>
              <SelectItem value="high">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  High Priority
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Due Date
          </label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border-2 focus:border-purple-500 rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Work, Personal, Shopping..."
          className="border-2 focus:border-purple-500 rounded-lg"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg py-3"
        >
          Create Task
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="px-6 rounded-lg border-2 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
