'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Trash2, Plus, Clock, Brain, AlertTriangle, Save, X } from 'lucide-react'
import PageHeader from '@/components/page-header'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Note = {
  id: string
  content: string
  createdAt: number
  expiresAt: number
  color: string
}

type ExpiryOption = {
  label: string
  value: number // in minutes
}

const EXPIRY_OPTIONS: ExpiryOption[] = [
  { label: '1 menit', value: 1 },
  { label: '5 menit', value: 5 },
  { label: '15 menit', value: 15 },
  { label: '30 menit', value: 30 },
  { label: '1 jam', value: 60 },
  { label: '3 jam', value: 180 },
  { label: '6 jam', value: 360 },
  { label: '24 jam', value: 1440 },
]

const NOTE_COLORS = [
  { bg: 'bg-[#FFEB3B]', border: 'border-border', accent: '#FFEB3B' },
  { bg: 'bg-[#FF8A80]', border: 'border-border', accent: '#FF8A80' },
  { bg: 'bg-[#82B1FF]', border: 'border-border', accent: '#82B1FF' },
  { bg: 'bg-[#CCFF90]', border: 'border-border', accent: '#CCFF90' },
  { bg: 'bg-[#FFD180]', border: 'border-border', accent: '#FFD180' },
  { bg: 'bg-white', border: 'border-border', accent: '#FFFFFF' },
]

const STORAGE_KEY = 'braindump_notes'

function getTimeLeft(expiresAt: number): string {
  const now = Date.now()
  const diff = expiresAt - now
  if (diff <= 0) return 'Expired'

  const totalSeconds = Math.floor(diff / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) return `${hours}j ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

function getProgressPercent(createdAt: number, expiresAt: number): number {
  const now = Date.now()
  const total = expiresAt - createdAt
  const elapsed = now - createdAt
  return Math.min(100, Math.max(0, (elapsed / total) * 100))
}

function getProgressColor(percent: number): string {
  if (percent < 50) return '#4CAF50'
  if (percent < 75) return '#FF9800'
  return '#F44336'
}

export default function BrainDump() {
  const [notes, setNotes] = useState<Note[]>([])
  const [inputText, setInputText] = useState('')
  const [selectedExpiry, setSelectedExpiry] = useState<number>(15)
  const [selectedColor, setSelectedColor] = useState(0)
  const [, forceRender] = useState(0)
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())
  const [justSaved, setJustSaved] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed: Note[] = JSON.parse(stored)
        const now = Date.now()
        const valid = parsed.filter((n) => n.expiresAt > now)
        setNotes(valid)
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  // Tick every second to update timers + auto-delete expired
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const now = Date.now()
      setNotes((prev) => {
        const expired = prev.filter((n) => n.expiresAt <= now)
        if (expired.length > 0) {
          return prev.filter((n) => n.expiresAt > now)
        }
        return prev
      })
      forceRender((n) => n + 1)
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const addNote = useCallback(() => {
    if (!inputText.trim()) return

    const now = Date.now()
    const expiresAt = now + selectedExpiry * 60 * 1000
    const colorAccent = NOTE_COLORS[selectedColor].accent

    const newNote: Note = {
      id: crypto.randomUUID(),
      content: inputText.trim(),
      createdAt: now,
      expiresAt,
      color: colorAccent,
    }

    setNotes((prev) => [newNote, ...prev])
    setInputText('')
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 1500)
    textareaRef.current?.focus()
  }, [inputText, selectedExpiry, selectedColor])

  const deleteNote = useCallback((id: string) => {
    setDeletingIds((prev) => new Set([...prev, id]))
    setTimeout(() => {
      setNotes((prev) => prev.filter((n) => n.id !== id))
      setDeletingIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 300)
  }, [])

  const clearAll = useCallback(() => {
    setNotes([])
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      addNote()
    }
  }

  const getNoteColorBg = (accent: string) => {
    const found = NOTE_COLORS.find((c) => c.accent === accent)
    return found?.bg ?? 'bg-white'
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern">
      <PageHeader
        title="Brain Dump"
        description="Tuang semua yang ada di pikiranmu. Catatan otomatis terhapus sesuai waktu yang kamu atur."
        accent="var(--chart-3)"
      />

      {/* Input Area */}
      <div className="mx-auto w-[calc(100%-2rem)] max-w-5xl px-0 mb-6">
        <div className="bg-secondary-background border-2 border-border rounded-base shadow-shadow p-5">
          {/* Header row */}
          <div className="flex items-center gap-2 mb-4">
            <Brain className="size-5 text-foreground shrink-0" />
            <span className="font-heading font-black text-lg">Note Baru</span>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            id="brain-dump-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tulis apa saja yang ada di pikiranmu..."
            rows={4}
            className="w-full resize-none rounded-base border-2 border-border bg-background px-4 py-3 text-sm font-base text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-shadow"
          />

          {/* Controls Row */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {/* Expiry Select */}
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-foreground/60 shrink-0" />
              <span className="text-xs font-base text-foreground/60 shrink-0">Hapus dalam:</span>
              <Select
                value={String(selectedExpiry)}
                onValueChange={(v) => setSelectedExpiry(Number(v))}
              >
                <SelectTrigger id="expiry-select" className="h-9 w-[130px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXPIRY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={String(opt.value)}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-base text-foreground/60">Warna:</span>
              <div className="flex gap-1.5">
                {NOTE_COLORS.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    title={`Warna ${idx + 1}`}
                    className={`size-6 rounded-sm border-2 transition-transform ${color.bg} ${
                      selectedColor === idx
                        ? 'border-black scale-110 shadow-[2px_2px_0px_#000]'
                        : 'border-border hover:scale-105'
                    }`}
                    aria-label={`Pilih warna ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Hint text */}
            <span className="hidden sm:block text-xs text-foreground/40 font-base">
              Ctrl+Enter untuk simpan
            </span>

            {/* Save Button */}
            <Button
              id="add-note-btn"
              onClick={addNote}
              disabled={!inputText.trim()}
              className={`gap-2 transition-all ${justSaved ? 'bg-green-400' : ''}`}
            >
              {justSaved ? (
                <>
                  <Save className="size-4" />
                  Tersimpan!
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Simpan
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {notes.length > 0 && (
        <div className="mx-auto w-[calc(100%-2rem)] max-w-5xl mb-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-base text-foreground/60">
              <span className="font-black text-foreground">{notes.length}</span> catatan aktif
            </p>
            <button
              id="clear-all-btn"
              onClick={clearAll}
              className="flex items-center gap-1.5 text-xs font-base text-foreground/60 hover:text-[#FF5252] transition-colors"
            >
              <X className="size-3.5" />
              Hapus semua
            </button>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="mx-auto w-[calc(100%-2rem)] max-w-5xl pb-12">
        {notes.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="size-16 rounded-base border-2 border-border bg-secondary-background shadow-shadow flex items-center justify-center">
              <Brain className="size-8 text-foreground/40" />
            </div>
            <div className="text-center">
              <p className="font-heading font-black text-lg text-foreground/60">Pikiranmu kosong?</p>
              <p className="text-sm font-base text-foreground/40 mt-1">
                Tulis sesuatu di atas, semua akan hilang sendiri.
              </p>
            </div>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {notes.map((note) => {
              const progress = getProgressPercent(note.createdAt, note.expiresAt)
              const progressColor = getProgressColor(progress)
              const timeLeft = getTimeLeft(note.expiresAt)
              const isExpiringSoon = progress > 75
              const isDeleting = deletingIds.has(note.id)
              const colorBg = getNoteColorBg(note.color)

              return (
                <div
                  key={note.id}
                  id={`note-${note.id}`}
                  className={`break-inside-avoid rounded-base border-2 border-border shadow-shadow flex flex-col transition-all duration-300 overflow-hidden ${colorBg} ${
                    isDeleting ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100'
                  }`}
                >
                  {/* Note content */}
                  <div className="p-4 flex-1">
                    <p className="text-sm font-base text-foreground leading-relaxed whitespace-pre-wrap break-words">
                      {note.content}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-black/10 w-full">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{
                        width: `${100 - progress}%`,
                        backgroundColor: progressColor,
                      }}
                    />
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2.5 flex items-center justify-between border-t-2 border-border bg-black/5">
                    <div className="flex items-center gap-1.5">
                      {isExpiringSoon && (
                        <AlertTriangle className="size-3.5 text-[#FF5252] shrink-0 animate-pulse" />
                      )}
                      <Clock className="size-3 text-foreground/50 shrink-0" />
                      <span
                        className={`text-xs font-base tabular-nums ${
                          isExpiringSoon ? 'text-[#FF5252] font-black' : 'text-foreground/60'
                        }`}
                      >
                        {timeLeft}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteNote(note.id)}
                      aria-label="Hapus catatan"
                      className="size-7 flex items-center justify-center rounded-sm border-2 border-transparent hover:border-border hover:bg-black/10 transition-all"
                    >
                      <Trash2 className="size-3.5 text-foreground/50 hover:text-[#FF5252] transition-colors" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}