export interface Task {
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

export interface CreateTaskData {
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  due_date?: string | null
  category: string
  completed?: boolean
  user_id?: string | null
}

export interface TaskTemplate {
  id: string
  title: string
  description: string
  category: string
  priority: "low" | "medium" | "high"
  estimatedTime?: string
  suggestedDueDate?: string
  tags?: string[]
}

export interface TaskHistory {
  id: string
  task_id: string
  action: "created" | "started" | "paused" | "completed" | "updated" | "deleted"
  old_values?: any
  new_values?: any
  timestamp: string
  user_id?: string | null
}

export interface TimeSession {
  id: string
  task_id: string
  started_at: string
  ended_at?: string | null
  duration?: number | null
  user_id?: string | null
  created_at: string
}
