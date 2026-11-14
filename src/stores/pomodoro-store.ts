'use client'
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type PomodoroMode = "work" | "break"

type PomodoroState = {
  work: number
  breakTime: number
  mode: PomodoroMode
  seconds: number
  sessions: number
  running: boolean
  endsAt: number | null
  notificationPermission: NotificationPermission | "unsupported"
  setWork: (minutes: number) => void
  setBreakTime: (minutes: number) => void
  start: () => void
  pause: () => void
  reset: () => void
  tick: () => void
  requestNotificationPermission: () => Promise<void>
}

const initialState = {
  work: 25,
  breakTime: 5,
  mode: "work" as PomodoroMode,
  seconds: 25 * 60,
  sessions: 0,
  running: false,
  endsAt: null,
}

export const usePomodoroStore = create<PomodoroState>()(persist((set, get) => ({
  ...initialState,
  notificationPermission: "unsupported",

  setWork: (minutes) => set((state) => {
    const work = Math.max(1, Math.floor(minutes) || 1)
    return { work, seconds: !state.running && state.mode === "work" ? work * 60 : state.seconds }
  }),
  setBreakTime: (minutes) => set((state) => {
    const breakTime = Math.max(1, Math.floor(minutes) || 1)
    return { breakTime, seconds: !state.running && state.mode === "break" ? breakTime * 60 : state.seconds }
  }),
  start: () => set((state) => ({ running: true, endsAt: Date.now() + state.seconds * 1000 })),
  pause: () => set((state) => {
    if (!state.running || !state.endsAt) return { running: false, endsAt: null }
    return { running: false, endsAt: null, seconds: Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000)) }
  }),
  reset: () => set((state) => ({ running: false, endsAt: null, seconds: (state.mode === "work" ? state.work : state.breakTime) * 60 })),
  tick: () => set((state) => {
    if (!state.running || !state.endsAt) return state
    const remaining = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000))
    if (remaining > 0) return { seconds: remaining }

    const nextMode: PomodoroMode = state.mode === "work" ? "break" : "work"
    const nextSeconds = (nextMode === "work" ? state.work : state.breakTime) * 60
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(nextMode === "break" ? "Waktu fokus selesai" : "Waktu istirahat selesai", {
        body: nextMode === "break" ? "Saatnya beristirahat sebentar." : "Saatnya kembali fokus.",
        tag: "pomodoro-timer",
      })
    }
    return {
      mode: nextMode,
      seconds: nextSeconds,
      sessions: state.mode === "work" ? state.sessions + 1 : state.sessions,
      running: false,
      endsAt: null,
    }
  }),
  requestNotificationPermission: async () => {
    if (!("Notification" in window)) {
      set({ notificationPermission: "unsupported" })
      return
    }
    const notificationPermission = await Notification.requestPermission()
    set({ notificationPermission })
  },
}), {
  name: "pomodoro-timer",
  storage: createJSONStorage(() => localStorage),
  partialize: ({ work, breakTime, mode, seconds, sessions, running, endsAt }) => ({ work, breakTime, mode, seconds, sessions, running, endsAt }),
}))
