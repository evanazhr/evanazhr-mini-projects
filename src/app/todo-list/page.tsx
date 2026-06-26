'use client'

import { useEffect, useState } from "react"
import { Check, Trash2, Pencil, ArrowUp, ArrowDown, Save, X, Plus, ListTodo } from "lucide-react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import miniProjects from "@/data/mini-projects"

type Task = {
  title: string
  completed: boolean
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskInput, setTaskInput] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingText, setEditingText] = useState("")

  const [pageHeaderData] = useState(() =>
    miniProjects.find((project) => project.id === 'todo-list')
  )

  // Load from localStorage on mount safely (Client-side only)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem("Tasks")
        if (stored) {
          setTasks(JSON.parse(stored))
        }
      } catch (e) {
        console.error("Gagal memuat tugas dari localStorage:", e)
      } finally {
        setIsLoaded(true)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  // Helper to save to localStorage
  const saveToStorage = (updatedTasks: Task[]) => {
    try {
      localStorage.setItem("Tasks", JSON.stringify(updatedTasks))
    } catch (e) {
      console.error("Gagal menyimpan tugas ke localStorage:", e)
    }
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = taskInput.trim()
    if (!trimmed) return

    const newTasks = [...tasks, { title: trimmed, completed: false }]
    setTasks(newTasks)
    saveToStorage(newTasks)
    setTaskInput("")
  }

  const handleRemoveTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
    saveToStorage(newTasks)
    
    // Reset editing index if the currently edited task is removed
    if (editingIndex === index) {
      setEditingIndex(null)
      setEditingText("")
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  const handleToggleTask = (index: number) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    )
    setTasks(newTasks)
    saveToStorage(newTasks)
  }

  const handleStartEdit = (index: number, currentTitle: string) => {
    setEditingIndex(index)
    setEditingText(currentTitle)
  }

  const handleSaveEdit = (index: number) => {
    const trimmed = editingText.trim()
    if (!trimmed) return
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, title: trimmed } : task
    )
    setTasks(newTasks)
    saveToStorage(newTasks)
    setEditingIndex(null)
    setEditingText("")
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditingText("")
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newTasks = [...tasks]
    const temp = newTasks[index]
    newTasks[index] = newTasks[index - 1]
    newTasks[index - 1] = temp
    setTasks(newTasks)
    saveToStorage(newTasks)
    
    // adjust editing index if it was one of the swapped items
    if (editingIndex === index) {
      setEditingIndex(index - 1)
    } else if (editingIndex === index - 1) {
      setEditingIndex(index)
    }
  }

  const handleMoveDown = (index: number) => {
    if (index === tasks.length - 1) return
    const newTasks = [...tasks]
    const temp = newTasks[index]
    newTasks[index] = newTasks[index + 1]
    newTasks[index + 1] = temp
    setTasks(newTasks)
    saveToStorage(newTasks)

    // adjust editing index if it was one of the swapped items
    if (editingIndex === index) {
      setEditingIndex(index + 1)
    } else if (editingIndex === index + 1) {
      setEditingIndex(index)
    }
  }

  const accentColor = pageHeaderData?.accent || 'var(--chart-3)'

  return (
    <div 
      className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern"
      style={{ '--page-accent': accentColor } as React.CSSProperties}
    >
      <main className="flex-1">
        {/* Page header */}
        <PageHeader
          title={pageHeaderData?.title || "To-Do List"}
          description={pageHeaderData?.description || "Kelola daftar tugas harian Anda dengan mudah."}
          accent={accentColor}
        />

        {/* Main Content */}
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 xl:px-16">
          <div className="mx-auto max-w-xl">
            {/* Shadcn Card for Input Form */}
            <Card className="mb-8 p-0 overflow-hidden border-2 border-border shadow-shadow bg-secondary-background">
              {/* Card Header */}
              <CardHeader style={{ backgroundColor: 'var(--page-accent)' }} className="text-white border-b-2 border-border px-5 py-3 flex flex-row items-center gap-2 space-y-0">
                <CardTitle className="text-white text-sm font-black uppercase tracking-widest flex items-center gap-2">
                  <ListTodo className="size-4 text-white animate-bounce" />
                  Daftar Tugas Baru
                </CardTitle>
              </CardHeader>

              {/* Form Input */}
              <CardContent className="p-5">
                <form onSubmit={handleAddTask} className="flex gap-3">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Label htmlFor="task-input" className="sr-only">Tugas Baru</Label>
                    <Input
                      id="task-input"
                      type="text"
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      placeholder="Masukkan tugas baru..."
                      required
                      className="bg-background text-foreground"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-auto px-5 shrink-0 font-bold"
                    aria-label="Tambah tugas"
                  >
                    <Plus className="size-4 mr-1.5" />
                    Tambah
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Tasks Container */}
            <div className="flex flex-col gap-4">
              {!isLoaded ? (
                // Reusable Shadcn Skeleton loading state
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : tasks.length === 0 ? (
                // Empty state
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-base bg-secondary-background text-center">
                  <ListTodo className="size-10 mx-auto text-foreground/40 mb-3 animate-pulse" />
                  <p className="text-sm font-bold text-foreground">Belum ada tugas harian</p>
                  <p className="text-xs text-foreground/60 mt-1">Silakan tambahkan tugas baru menggunakan kolom di atas.</p>
                </div>
              ) : (
                // Task List
                <ul className="flex flex-col gap-4">
                  {tasks.map((task, index) => {
                    const isEditing = editingIndex === index

                    return (
                      <li 
                        key={index} 
                        className={`flex items-start justify-between p-4 bg-secondary-background border-2 border-border rounded-base shadow-shadow transition-all duration-150 gap-3 ${
                          task.completed ? 'opacity-85' : ''
                        }`}
                      >
                        {/* Checkbox & Task Content Wrapper */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Reusable Neo-Brutalist Checkbox Button */}
                          <Button
                            type="button"
                            onClick={() => handleToggleTask(index)}
                            variant={task.completed ? "default" : "neutral"}
                            className="size-6 p-0 shrink-0 border-2 border-border rounded-base hover:translate-y-0 hover:translate-x-0 shadow-none hover:shadow-none"
                            aria-label={task.completed ? "Tandai belum selesai" : "Tandai selesai"}
                          >
                            {task.completed && <Check className="size-4 stroke-[3px] text-main-foreground" />}
                          </Button>

                          {/* Task Text or Edit Input */}
                          {isEditing ? (
                            <Input
                              type="text"
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSaveEdit(index)
                                  if (e.key === 'Escape') handleCancelEdit()
                              }}
                              className="h-8 py-1 flex-1 font-bold text-sm bg-background text-foreground min-w-0"
                              autoFocus
                            />
                          ) : (
                            <p 
                              className={`text-sm font-bold text-foreground break-all whitespace-normal cursor-pointer select-none flex-1 min-w-0 pr-2 mt-0.5 ${
                                task.completed ? 'line-through text-foreground/50 decoration-[2px]' : ''
                              }`}
                              onClick={() => handleToggleTask(index)}
                              title={task.title}
                            >
                              {task.title}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons Container */}
                        <div className="flex items-center gap-1.5 shrink-0 self-start mt-0.5">
                          {isEditing ? (
                            <>
                              <Button
                                type="button"
                                onClick={() => handleSaveEdit(index)}
                                variant="neutral"
                                className="size-8 p-0 hover:bg-chart-4 hover:text-white"
                                aria-label="Simpan perubahan"
                              >
                                <Save className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                onClick={handleCancelEdit}
                                variant="neutral"
                                className="size-8 p-0 hover:bg-chart-3 hover:text-white"
                                aria-label="Batal edit"
                              >
                                <X className="size-3.5" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                type="button"
                                onClick={() => handleStartEdit(index, task.title)}
                                variant="neutral"
                                className="size-8 p-0 hover:bg-chart-5 hover:text-white"
                                aria-label="Edit tugas"
                              >
                                <Pencil className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                                variant="neutral"
                                className="size-8 p-0 hover:bg-main"
                                aria-label="Pindahkan ke atas"
                              >
                                <ArrowUp className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleMoveDown(index)}
                                disabled={index === tasks.length - 1}
                                variant="neutral"
                                className="size-8 p-0 hover:bg-main"
                                aria-label="Pindahkan ke bawah"
                              >
                                <ArrowDown className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleRemoveTask(index)}
                                variant="neutral"
                                className="size-8 p-0 hover:bg-chart-3 hover:text-white"
                                aria-label="Hapus tugas"
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {/* Info Box */}
            <div className="flex flex-col gap-2 p-4 mt-8 border-2 border-border bg-secondary-background rounded-base shadow-shadow">
              <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                Tips Penggunaan
              </p>
              <ul className="text-xs font-semibold text-foreground/70 list-disc pl-4 space-y-1.5 leading-relaxed">
                <li>Klik tombol check di sebelah kiri tugas untuk menandai tugas selesai atau belum selesai.</li>
                <li>Gunakan tombol panah ke atas (↑) dan ke bawah (↓) untuk mengubah prioritas atau urutan tugas.</li>
                <li>Tugas Anda disimpan secara lokal di browser, sehingga tidak akan hilang saat halaman dimuat ulang.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

