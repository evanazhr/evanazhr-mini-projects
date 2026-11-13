'use client'

import { useCallback, useEffect, useRef, useState } from "react"
import PageHeader from "@/components/page-header"
import projectsMeta from "@/data/projects-meta"

export default function Pomodoro() {
  const [work, setWork] = useState(25)
  const [breakTime, setBreakTime] = useState(5)
  const [mode, setMode] = useState<"work" | "break">("work")
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<number | null>(null)

  const start = useCallback(() => {
    if (running) return
    setRunning(true)
  }, [running])

  const pause = useCallback(() => {
    setRunning(false)
  }, [])

  const reset = useCallback(() => {
    setRunning(false)
    setSeconds((mode === "work" ? work : breakTime) * 60)
  }, [breakTime, mode, work])

  useEffect(() => {
    if (!running) {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = window.setInterval(() => {
      setSeconds((current) => {
        if (current > 1) return current - 1

        setRunning(false)
        if (mode === "work") setSessions((value) => value + 1)
        setMode((value) => (value === "work" ? "break" : "work"))
        return (mode === "work" ? breakTime : work) * 60
      })
    }, 1000)

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [running, mode, work, breakTime])

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0")
  const remainingSeconds = String(seconds % 60).padStart(2, "0")

  return (
    <div className="min-h-[100dvh] bg-background bg-grid-pattern">
      <PageHeader {...projectsMeta.pomodoro} />
      <main className="mx-auto max-w-xl px-4 pb-12 md:px-8">
        <section className="rounded-base border-2 border-border bg-secondary-background p-6 text-center shadow-shadow">
          <p className="font-bold">{mode === "work" ? "Waktu fokus" : "Waktu istirahat"}</p>
          <div className="my-8 text-8xl font-black tabular-nums">
            {minutes}:{remainingSeconds}
          </div>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={running ? pause : start}
              className="rounded-base border-2 border-border bg-main px-5 py-3 font-bold"
            >
              {running ? "Pause" : "Mulai"}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-base border-2 border-border px-5 py-3 font-bold"
            >
              Reset
            </button>
          </div>
          <p className="mt-6 text-sm">
            Sesi selesai: <strong>{sessions}</strong>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            <label className="font-bold">
              Fokus
              <input
                type="number"
                min="1"
                value={work}
                onChange={(event) => setWork(Number(event.target.value) || 1)}
                className="mt-2 h-10 w-full rounded-base border-2 border-border px-2"
              />
            </label>
            <label className="font-bold">
              Istirahat
              <input
                type="number"
                min="1"
                value={breakTime}
                onChange={(event) => setBreakTime(Number(event.target.value) || 1)}
                className="mt-2 h-10 w-full rounded-base border-2 border-border px-2"
              />
            </label>
          </div>
        </section>
      </main>
    </div>
  )
}
