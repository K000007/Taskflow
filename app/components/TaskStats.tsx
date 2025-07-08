"use client"

import { useTaskContext } from "../contexts/TaskContext"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Wifi, WifiOff } from "lucide-react"

export default function TaskStats() {
  const { tasks, isOnline } = useTaskContext()

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const overdueTasks = tasks.filter(
    (task) => task.due_date && new Date(task.due_date) < new Date() && !task.completed,
  ).length

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Connection Status */}
      <div className="flex justify-center">
        <Badge
          className={`${
            isOnline
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-orange-100 text-orange-800 border-orange-200"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3 h-3 mr-1" />
              Database Connected
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 mr-1" />
              Offline Mode
            </>
          )}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {totalTasks > 0 && (
          <Card className="col-span-2 md:col-span-4 border-0 shadow-lg bg-gradient-to-r from-purple-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm opacity-90">Completion Rate</p>
                <p className="text-3xl font-bold">{completionRate}%</p>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
