'use client'

import PageHeader from "@/components/page-header"
import projectsMeta from "@/data/projects-meta"
import { usePomodoro } from "@/components/pomodoro-provider"

export default function Pomodoro() {
  const { work, breakTime, mode, seconds, sessions, running, notificationPermission, setWork, setBreakTime, start, pause, reset, requestNotificationPermission } = usePomodoro()
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0")
  const remainingSeconds = String(seconds % 60).padStart(2, "0")

  return (
    <div className="min-h-[100dvh] bg-background bg-grid-pattern">
      <PageHeader {...projectsMeta.pomodoro} />
      <main className="mx-auto max-w-xl px-4 pb-12 md:px-8">
        <section className="rounded-none border-2 border-border bg-secondary-background p-6 text-center shadow-shadow">
          <p className="font-bold">{mode === "work" ? "Waktu fokus" : "Waktu istirahat"}</p>
          <div className="my-8 text-8xl font-black tabular-nums">{minutes}:{remainingSeconds}</div>
          <div className="flex justify-center gap-3">
            <button type="button" onClick={running ? pause : start} className="rounded-none border-2 border-border bg-main px-5 py-3 font-bold">{running ? "Pause" : "Mulai"}</button>
            <button type="button" onClick={reset} className="rounded-none border-2 border-border px-5 py-3 font-bold">Reset</button>
          </div>
          <p className="mt-6 text-sm">Sesi selesai: <strong>{sessions}</strong></p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-left">
            <label className="font-bold">Fokus<input type="number" min="1" value={work} onChange={(event) => setWork(Number(event.target.value))} className="mt-2 h-10 w-full rounded-none border-2 border-border px-2" /></label>
            <label className="font-bold">Istirahat<input type="number" min="1" value={breakTime} onChange={(event) => setBreakTime(Number(event.target.value))} className="mt-2 h-10 w-full rounded-none border-2 border-border px-2" /></label>
          </div>
          <div className="mt-5 border-2 border-border bg-background p-3 text-left">
            <p className="text-sm font-bold">Notifikasi browser</p>
            <p className="mt-1 text-xs text-foreground/70">Dapatkan pemberitahuan saat sesi fokus atau istirahat selesai.</p>
            {notificationPermission === "granted" ? <p className="mt-2 text-xs font-bold text-green-700">Notifikasi aktif.</p> : notificationPermission === "denied" ? <p className="mt-2 text-xs font-bold text-red-600">Notifikasi diblokir. Aktifkan dari pengaturan browser.</p> : <button type="button" onClick={requestNotificationPermission} className="mt-3 rounded-none border-2 border-border bg-main px-3 py-2 text-xs font-bold">Aktifkan notifikasi</button>}
          </div>
        </section>

        <section className="mt-5 rounded-none border-2 border-border bg-white p-5 shadow-shadow">
          <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">Apa itu Pomodoro?</p>
          <ul className="list-disc space-y-1.5 pl-4 text-xs font-semibold leading-relaxed text-foreground/70">
            <li>Pomodoro adalah teknik fokus dengan membagi pekerjaan menjadi sesi kerja dan istirahat.</li>
            <li>Atur durasi fokus dan istirahat, lalu tekan Mulai. Timer tetap berjalan saat berpindah halaman.</li>
            <li>Notifikasi browser muncul saat sesi selesai jika izin notifikasi sudah diaktifkan.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}
