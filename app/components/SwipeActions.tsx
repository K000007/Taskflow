"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useTaskContext } from "../contexts/TaskContext"
import type { Task } from "../types/task"
import { Check, Trash2 } from "lucide-react"

interface SwipeActionsProps {
  task: Task
  children: React.ReactNode
}

export default function SwipeActions({ task, children }: SwipeActionsProps) {
  const { updateTask, deleteTask } = useTaskContext()
  const [swipeDistance, setSwipeDistance] = useState(0)
  const [isSwipeActive, setIsSwipeActive] = useState(false)
  const startX = useRef(0)
  const currentX = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
    setIsSwipeActive(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipeActive) return

    currentX.current = e.touches[0].clientX
    const distance = currentX.current - startX.current

    // Only allow left swipe (negative distance)
    if (distance < 0) {
      setSwipeDistance(Math.max(distance, -160))
    }
  }

  const handleTouchEnd = () => {
    setIsSwipeActive(false)

    if (swipeDistance < -80) {
      // Complete action
      if (swipeDistance < -120) {
        handleDelete()
      } else {
        handleToggleComplete()
      }
    }

    // Reset position
    setSwipeDistance(0)
  }

  const handleToggleComplete = async () => {
    await updateTask(task.id, { completed: !task.completed })
  }

  const handleDelete = async () => {
    await deleteTask(task.id)
  }

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Action Buttons Background */}
      <div className="absolute inset-y-0 right-0 flex">
        <div className="flex items-center justify-center w-20 bg-green-500">
          <Check className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center justify-center w-20 bg-red-500">
          <Trash2 className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div
        ref={cardRef}
        className="relative bg-white transition-transform duration-200 ease-out"
        style={{
          transform: `translateX(${swipeDistance}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  )
}
