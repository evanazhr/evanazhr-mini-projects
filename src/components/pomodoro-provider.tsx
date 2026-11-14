'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react"

type Mode = "work" | "break"
type StoredTimer = { work: number; breakTime: number; mode: Mode; seconds: number; sessions: number; running: boolean; endsAt: number | null }

type PomodoroContextValue = {
  work: number
  breakTime: number
  mode: Mode
  seconds: number
  sessions: number
  running: boolean
  notificationPermission: NotificationPermission | "unsupported"
  setWork: (minutes: number) => void
  setBreakTime: (minutes: number) => void
  start: () => void
  pause: () => void
  reset: () => void
  requestNotificationPermission: () => Promise<void>
}

const STORAGE_KEY = "pomodoro-timer"
const PomodoroContext = createContext<PomodoroContextValue | null>(null)

const getInitialState = (): StoredTimer => ({
  work: 25,
  breakTime: 5,
  mode: "work",
  seconds: 25 * 60,
  sessions: 0,
  running: false,
  endsAt: null,
})

export default function PomodoroProvider({ children }: { children: ReactNode }) {
  const [timer, setTimer] = useState<StoredTimer>(getInitialState)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | "unsupported">("unsupported")
  const notificationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setTimer({ ...getInitialState(), ...JSON.parse(stored) })
    } catch {
      // Ignore malformed local state and use defaults.
    }
    if ("Notification" in window) setNotificationPermission(Notification.permission)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timer))
  }, [timer])

  const notify = useCallback((nextMode: Mode) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(nextMode === "break" ? "Waktu fokus selesai" : "Waktu istirahat selesai", {
        body: nextMode === "break" ? "Saatnya beristirahat sebentar." : "Saatnya kembali fokus.",
        tag: "pomodoro-timer",
      })
    }
  }, [])

  useEffect(() => {
    if (!timer.running || !timer.endsAt) return

    const update = () => {
      const remaining = Math.max(0, Math.ceil((timer.endsAt! - Date.now()) / 1000))
      if (remaining > 0) {
        setTimer((current) => current.seconds === remaining ? current : { ...current, seconds: remaining })
        return
      }

      const nextMode: Mode = timer.mode === "work" ? "break" : "work"
      const nextSeconds = (nextMode === "work" ? timer.work : timer.breakTime) * 60
      notify(nextMode)
      setTimer((current) => ({
        ...current,
        mode: nextMode,
        seconds: nextSeconds,
        sessions: current.mode === "work" ? current.sessions + 1 : current.sessions,
        running: false,
        endsAt: null,
      }))
    }

    update()
    const interval = window.setInterval(update, 500)
    return () => window.clearInterval(interval)
  }, [notify, timer])

  const start = useCallback(() => {
    setTimer((current) => ({ ...current, running: true, endsAt: Date.now() + current.seconds * 1000 }))
  }, [])

  const pause = useCallback(() => {
    setTimer((current) => ({ ...current, running: false, endsAt: null }))
  }, [])

  const reset = useCallback(() => {
    setTimer((current) => ({ ...current, running: false, seconds: (current.mode === "work" ? current.work : current.breakTime) * 60, endsAt: null }))
  }, [])

  const setWork = useCallback((minutes: number) => {
    const value = Math.max(1, Math.floor(minutes) || 1)
    setTimer((current) => ({ ...current, work: value, seconds: !current.running && current.mode === "work" ? value * 60 : current.seconds }))
  }, [])

  const setBreakTime = useCallback((minutes: number) => {
    const value = Math.max(1, Math.floor(minutes) || 1)
    setTimer((current) => ({ ...current, breakTime: value, seconds: !current.running && current.mode === "break" ? value * 60 : current.seconds }))
  }, [])

  const requestNotificationPermission = useCallback(async () => {
    if (!("Notification" in window)) return
    const permission = await Notification.requestPermission()
    setNotificationPermission(permission)
  }, [])

  const value = useMemo(() => ({ ...timer, notificationPermission, setWork, setBreakTime, start, pause, reset, requestNotificationPermission }), [timer, notificationPermission, setWork, setBreakTime, start, pause, reset, requestNotificationPermission])

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>
}

export function usePomodoro() {
  const context = useContext(PomodoroContext)
  if (!context) throw new Error("usePomodoro must be used inside PomodoroProvider")
  return context
}
