"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { supabase, HAS_SUPABASE } from "../lib/supabase"

// Local storage fallback types
interface LocalTask {
  id: string
  title: string
  description?: string | null
  completed: boolean
  priority: "low" | "medium" | "high"
  due_date?: string | null
  category: string
  created_at: string
  updated_at: string
  user_id?: string | null
  started_at?: string | null
  completed_at?: string | null
  total_time_spent?: number | null
  is_active: boolean
}

interface LocalTaskHistory {
  id: string
  task_id: string
  action: "created" | "started" | "paused" | "completed" | "updated" | "deleted"
  old_values?: any
  new_values?: any
  timestamp: string
  user_id?: string | null
}

interface LocalTimeSession {
  id: string
  task_id: string
  started_at: string
  ended_at?: string | null
  duration?: number | null
  user_id?: string | null
  created_at: string
}

interface TaskContextType {
  tasks: LocalTask[]
  taskHistory: LocalTaskHistory[]
  timeSessions: LocalTimeSession[]
  addTask: (taskData: Partial<LocalTask>) => Promise<void>
  updateTask: (id: string, updates: Partial<LocalTask>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  startTask: (id: string) => Promise<void>
  pauseTask: (id: string) => Promise<void>
  completeTask: (id: string) => Promise<void>
  getTaskHistory: (taskId?: string) => Promise<void>
  getTimeAnalytics: () => Promise<any>
  loading: boolean
  activeTask: LocalTask | null
  isOnline: boolean
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<LocalTask[]>([])
  const [taskHistory, setTaskHistory] = useState<LocalTaskHistory[]>([])
  const [timeSessions, setTimeSessions] = useState<LocalTimeSession[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTask, setActiveTask] = useState<LocalTask | null>(null)
  const [isOnline, setIsOnline] = useState(false)

  // Check if Supabase is available
  useEffect(() => {
    checkSupabaseConnection()
  }, [])

  const checkSupabaseConnection = async () => {
    // If credentials are missing we instantly switch to
    // local-storage mode and skip hitting the Supabase SDK.
    if (!HAS_SUPABASE || !supabase) {
      setIsOnline(false)
      loadLocalData()
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.from("tasks").select("id").limit(1)
      if (!error) {
        setIsOnline(true)
        await Promise.all([loadTasks(), loadTaskHistory(), loadTimeSessions()])
      } else {
        throw error
      }
    } catch {
      console.info("Falling back to localStorage – Supabase unreachable.")
      setIsOnline(false)
      loadLocalData()
    } finally {
      setLoading(false)
    }
  }

  const loadLocalData = () => {
    try {
      const savedTasks = localStorage.getItem("taskflow-tasks")
      const savedHistory = localStorage.getItem("taskflow-history")
      const savedSessions = localStorage.getItem("taskflow-sessions")

      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks)
        setTasks(parsedTasks)
        const active = parsedTasks.find((task: LocalTask) => task.is_active)
        setActiveTask(active || null)
      }

      if (savedHistory) {
        setTaskHistory(JSON.parse(savedHistory))
      }

      if (savedSessions) {
        setTimeSessions(JSON.parse(savedSessions))
      }
    } catch (error) {
      console.error("Error loading local data:", error)
    }
  }

  const saveLocalData = (newTasks: LocalTask[], newHistory?: LocalTaskHistory[], newSessions?: LocalTimeSession[]) => {
    try {
      localStorage.setItem("taskflow-tasks", JSON.stringify(newTasks))
      if (newHistory) {
        localStorage.setItem("taskflow-history", JSON.stringify(newHistory))
      }
      if (newSessions) {
        localStorage.setItem("taskflow-sessions", JSON.stringify(newSessions))
      }
    } catch (error) {
      console.error("Error saving local data:", error)
    }
  }

  const loadTasks = async () => {
    if (!isOnline) return

    try {
      const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setTasks(data || [])

      const active = data?.find((task) => task.is_active)
      setActiveTask(active || null)
    } catch (error) {
      console.error("Error loading tasks:", error)
      setIsOnline(false)
      loadLocalData()
    }
  }

  const loadTaskHistory = async () => {
    if (!isOnline) return

    try {
      const { data, error } = await supabase
        .from("task_history")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(100)

      if (error) throw error
      setTaskHistory(data || [])
    } catch (error) {
      console.error("Error loading task history:", error)
    }
  }

  const loadTimeSessions = async () => {
    if (!isOnline) return

    try {
      const { data, error } = await supabase.from("time_sessions").select("*").order("started_at", { ascending: false })

      if (error) throw error
      setTimeSessions(data || [])
    } catch (error) {
      console.error("Error loading time sessions:", error)
    }
  }

  const addTask = async (taskData: Partial<LocalTask>) => {
    const newTask: LocalTask = {
      id: crypto.randomUUID(),
      title: taskData.title || "",
      description: taskData.description || null,
      completed: taskData.completed || false,
      priority: taskData.priority || "medium",
      due_date: taskData.due_date || null,
      category: taskData.category || "General",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: null,
      started_at: null,
      completed_at: null,
      total_time_spent: 0,
      is_active: false,
    }

    if (isOnline) {
      try {
        const { data, error } = await supabase.from("tasks").insert([newTask]).select().single()
        if (error) throw error
        setTasks((prev) => [data, ...prev])
        return
      } catch (error) {
        console.error("Error adding task to database:", error)
        setIsOnline(false)
      }
    }

    // Fallback to localStorage
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
    saveLocalData(newTasks)

    // Add to history
    const historyEntry: LocalTaskHistory = {
      id: crypto.randomUUID(),
      task_id: newTask.id,
      action: "created",
      new_values: newTask,
      timestamp: new Date().toISOString(),
    }
    const newHistory = [historyEntry, ...taskHistory]
    setTaskHistory(newHistory)
    saveLocalData(newTasks, newHistory)
  }

  const updateTask = async (id: string, updates: Partial<LocalTask>) => {
    const updatedTask = { ...tasks.find((t) => t.id === id), ...updates, updated_at: new Date().toISOString() }

    if (isOnline) {
      try {
        const { data, error } = await supabase.from("tasks").update(updates).eq("id", id).select().single()
        if (error) throw error

        const newTasks = tasks.map((task) => (task.id === id ? data : task))
        setTasks(newTasks)

        if (data.is_active) {
          setActiveTask(data)
        } else if (activeTask?.id === id) {
          setActiveTask(null)
        }
        return
      } catch (error) {
        console.error("Error updating task in database:", error)
        setIsOnline(false)
      }
    }

    // Fallback to localStorage
    const newTasks = tasks.map((task) => (task.id === id ? (updatedTask as LocalTask) : task))
    setTasks(newTasks)
    saveLocalData(newTasks)

    if (updatedTask.is_active) {
      setActiveTask(updatedTask as LocalTask)
    } else if (activeTask?.id === id) {
      setActiveTask(null)
    }

    // Add to history
    const historyEntry: LocalTaskHistory = {
      id: crypto.randomUUID(),
      task_id: id,
      action: "updated",
      new_values: updates,
      timestamp: new Date().toISOString(),
    }
    const newHistory = [historyEntry, ...taskHistory]
    setTaskHistory(newHistory)
    saveLocalData(newTasks, newHistory)
  }

  const deleteTask = async (id: string) => {
    if (isOnline) {
      try {
        const { error } = await supabase.from("tasks").delete().eq("id", id)
        if (error) throw error

        const newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks)

        if (activeTask?.id === id) {
          setActiveTask(null)
        }
        return
      } catch (error) {
        console.error("Error deleting task from database:", error)
        setIsOnline(false)
      }
    }

    // Fallback to localStorage
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
    saveLocalData(newTasks)

    if (activeTask?.id === id) {
      setActiveTask(null)
    }

    // Add to history
    const historyEntry: LocalTaskHistory = {
      id: crypto.randomUUID(),
      task_id: id,
      action: "deleted",
      timestamp: new Date().toISOString(),
    }
    const newHistory = [historyEntry, ...taskHistory]
    setTaskHistory(newHistory)
    saveLocalData(newTasks, newHistory)
  }

  const startTask = async (id: string) => {
    // Pause any currently active task
    if (activeTask && activeTask.id !== id) {
      await pauseTask(activeTask.id)
    }

    const now = new Date().toISOString()

    // Create new time session
    const newSession: LocalTimeSession = {
      id: crypto.randomUUID(),
      task_id: id,
      started_at: now,
      ended_at: null,
      duration: null,
      user_id: null,
      created_at: now,
    }

    if (isOnline) {
      try {
        await supabase.from("time_sessions").insert([newSession])
      } catch (error) {
        console.error("Error creating time session:", error)
      }
    }

    const newSessions = [newSession, ...timeSessions]
    setTimeSessions(newSessions)
    saveLocalData(tasks, taskHistory, newSessions)

    // Update task status
    await updateTask(id, {
      is_active: true,
      started_at: now,
    })

    // Add to history
    const historyEntry: LocalTaskHistory = {
      id: crypto.randomUUID(),
      task_id: id,
      action: "started",
      new_values: { started_at: now, is_active: true },
      timestamp: now,
    }
    const newHistory = [historyEntry, ...taskHistory]
    setTaskHistory(newHistory)
    saveLocalData(tasks, newHistory, newSessions)
  }

  const pauseTask = async (id: string) => {
    const now = new Date().toISOString()

    // Find active session
    const activeSession = timeSessions.find((s) => s.task_id === id && !s.ended_at)
    if (activeSession) {
      const duration = Math.floor((new Date(now).getTime() - new Date(activeSession.started_at).getTime()) / 1000)
      const updatedSession = { ...activeSession, ended_at: now, duration }

      if (isOnline) {
        try {
          await supabase.from("time_sessions").update({ ended_at: now, duration }).eq("id", activeSession.id)
        } catch (error) {
          console.error("Error updating time session:", error)
        }
      }

      const newSessions = timeSessions.map((s) => (s.id === activeSession.id ? updatedSession : s))
      setTimeSessions(newSessions)
      saveLocalData(tasks, taskHistory, newSessions)

      // Update total time spent on task
      const task = tasks.find((t) => t.id === id)
      if (task) {
        const newTotalTime = (task.total_time_spent || 0) + duration
        await updateTask(id, {
          is_active: false,
          total_time_spent: newTotalTime,
        })
      }
    }

    // Add to history
    const historyEntry: LocalTaskHistory = {
      id: crypto.randomUUID(),
      task_id: id,
      action: "paused",
      new_values: { is_active: false, paused_at: now },
      timestamp: now,
    }
    const newHistory = [historyEntry, ...taskHistory]
    setTaskHistory(newHistory)
    saveLocalData(tasks, newHistory)
  }

  const completeTask = async (id: string) => {
    // Pause task first if it's active
    const task = tasks.find((t) => t.id === id)
    if (task?.is_active) {
      await pauseTask(id)
    }

    const now = new Date().toISOString()

    await updateTask(id, {
      completed: true,
      completed_at: now,
      is_active: false,
    })

    // Add to history
    const historyEntry: LocalTaskHistory = {
      id: crypto.randomUUID(),
      task_id: id,
      action: "completed",
      new_values: { completed: true, completed_at: now },
      timestamp: now,
    }
    const newHistory = [historyEntry, ...taskHistory]
    setTaskHistory(newHistory)
    saveLocalData(tasks, newHistory)
  }

  const getTaskHistory = async (taskId?: string) => {
    if (isOnline) {
      try {
        let query = supabase.from("task_history").select("*").order("timestamp", { ascending: false })
        if (taskId) {
          query = query.eq("task_id", taskId)
        }
        const { data, error } = await query.limit(50)
        if (error) throw error
        setTaskHistory(data || [])
        return
      } catch (error) {
        console.error("Error loading task history:", error)
      }
    }

    // Use local history
    let filteredHistory = taskHistory
    if (taskId) {
      filteredHistory = taskHistory.filter((h) => h.task_id === taskId)
    }
    setTaskHistory(filteredHistory.slice(0, 50))
  }

  const getTimeAnalytics = async () => {
    try {
      const sessions = timeSessions.filter((s) => s.duration !== null)
      const totalTime = sessions.reduce((sum, session) => sum + (session.duration || 0), 0)
      const avgSessionTime = sessions.length ? totalTime / sessions.length : 0

      const categoryStats = sessions.reduce((acc: any, session) => {
        const task = tasks.find((t) => t.id === session.task_id)
        const category = task?.category || "Unknown"
        acc[category] = (acc[category] || 0) + (session.duration || 0)
        return acc
      }, {})

      return {
        totalTime,
        avgSessionTime,
        sessionCount: sessions.length,
        categoryStats,
        sessions: sessions.map((session) => ({
          ...session,
          tasks: tasks.find((t) => t.id === session.task_id),
        })),
      }
    } catch (error) {
      console.error("Error getting time analytics:", error)
      return {
        totalTime: 0,
        avgSessionTime: 0,
        sessionCount: 0,
        categoryStats: {},
        sessions: [],
      }
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskHistory,
        timeSessions,
        addTask,
        updateTask,
        deleteTask,
        startTask,
        pauseTask,
        completeTask,
        getTaskHistory,
        getTimeAnalytics,
        loading,
        activeTask,
        isOnline,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}
