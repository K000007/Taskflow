import { Suspense } from "react"
import TaskManager from "./components/TaskManager"
import { TaskProvider } from "./contexts/TaskContext"
import MobileOptimizations from "./components/MobileOptimizations"
import QuickStartBanner from "./components/QuickStartBanner"

export default function Home() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <QuickStartBanner />
        <div className="container mx-auto px-4 py-6">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">✨ TaskFlow</h1>
            <p className="text-gray-600">Organize your life, one task at a time</p>
          </header>

          <Suspense
            fallback={
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            }
          >
            <TaskManager />
          </Suspense>
          <MobileOptimizations />
        </div>
      </div>
    </TaskProvider>
  )
}
