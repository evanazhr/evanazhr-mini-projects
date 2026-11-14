'use client'

import { useEffect } from "react"
import { usePomodoroStore } from "@/stores/pomodoro-store"

export default function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const running = usePomodoroStore((state) => state.running)
  const tick = usePomodoroStore((state) => state.tick)

  useEffect(() => {
    if (!("Notification" in window)) {
      usePomodoroStore.setState({ notificationPermission: "unsupported" })
      return
    }
    usePomodoroStore.setState({ notificationPermission: Notification.permission })
  }, [])

  useEffect(() => {
    if (!running) return
    tick()
    const interval = window.setInterval(tick, 500)
    return () => window.clearInterval(interval)
  }, [running, tick])

  return <>{children}</>
}
