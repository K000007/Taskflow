"use client"

import { useState, useEffect } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Clock, TrendingUp, Calendar, Timer } from "lucide-react"

export default function TimeAnalytics() {
  const { getTimeAnalytics } = useTaskContext()
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    setLoading(true)
    const data = await getTimeAnalytics()
    setAnalytics(data)
    setLoading(false)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading analytics...</p>
        </CardContent>
      </Card>
    )
  }

  if (!analytics) {
    return (
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">No analytics data available</p>
        </CardContent>
      </Card>
    )
  }

  const categoryEntries = Object.entries(analytics.categoryStats || {}).sort(
    ([, a], [, b]) => (b as number) - (a as number),
  )

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-800">{formatTime(analytics.totalTime)}</p>
            <p className="text-sm text-blue-600">Total Time</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <Timer className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-800">{analytics.sessionCount}</p>
            <p className="text-sm text-green-600">Sessions</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-800">{formatTime(analytics.avgSessionTime)}</p>
            <p className="text-sm text-purple-600">Avg Session</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold text-orange-800">30</p>
            <p className="text-sm text-orange-600">Days</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <BarChart3 className="w-6 h-6 mr-2 text-purple-600" />
            Time by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          {categoryEntries.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No category data available</p>
          ) : (
            <div className="space-y-4">
              {categoryEntries.map(([category, time]) => {
                const percentage = ((time as number) / analytics.totalTime) * 100
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800 capitalize">{category}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{formatTime(time as number)}</span>
                        <Badge variant="secondary">{percentage.toFixed(1)}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Clock className="w-6 h-6 mr-2 text-purple-600" />
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {analytics.sessions.slice(0, 10).map((session: any) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{session.tasks?.title || "Unknown Task"}</h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(session.started_at)} • {session.tasks?.category || "Unknown"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{formatTime(session.duration || 0)}</p>
                  <Badge className="text-xs" variant="secondary">
                    {session.tasks?.priority || "medium"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
