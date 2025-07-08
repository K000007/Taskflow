"use client"

import { useState } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Briefcase,
  Heart,
  GraduationCap,
  Home,
  ShoppingCart,
  Dumbbell,
  Car,
  Plane,
  Calendar,
  Search,
} from "lucide-react"
import { taskTemplates, type TaskTemplate } from "../data/taskTemplates"

interface TemplateSelectorProps {
  onSelectTemplate: (template: TaskTemplate) => void
  onClose: () => void
}

export default function TemplateSelector({ onSelectTemplate, onClose }: TemplateSelectorProps) {
  const { addTask } = useTaskContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", name: "All Templates", icon: Calendar },
    { id: "work", name: "Work", icon: Briefcase },
    { id: "personal", name: "Personal", icon: Heart },
    { id: "health", name: "Health & Fitness", icon: Dumbbell },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "home", name: "Home & Family", icon: Home },
    { id: "shopping", name: "Shopping", icon: ShoppingCart },
    { id: "travel", name: "Travel", icon: Plane },
    { id: "maintenance", name: "Maintenance", icon: Car },
  ]

  const filteredTemplates = taskTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = async (template: TaskTemplate) => {
    await addTask({
      title: template.title,
      description: template.description,
      priority: template.priority,
      dueDate: template.suggestedDueDate,
      category: template.category,
      completed: false,
    })
    onClose()
  }

  const handleCustomizeTemplate = (template: TaskTemplate) => {
    // Store the selected template in localStorage for the form to pick up
    localStorage.setItem("selectedTemplate", JSON.stringify(template))
    onSelectTemplate(template)
  }

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-2 focus:border-purple-500 rounded-lg"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              <category.icon className="w-4 h-4 mr-1" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-h-96 overflow-y-auto">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{template.title}</CardTitle>
                  <CardDescription className="text-sm">{template.description}</CardDescription>
                </div>
                <Badge className={`ml-2 ${priorityColors[template.priority]}`}>{template.priority}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="capitalize">{template.category}</span>
                  {template.estimatedTime && <span>⏱️ {template.estimatedTime}</span>}
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    Use Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCustomizeTemplate(template)}
                    className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    Customize
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No templates found matching your criteria.</p>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Button variant="outline" onClick={onClose} className="px-8 bg-transparent">
          Close Templates
        </Button>
      </div>
    </div>
  )
}
