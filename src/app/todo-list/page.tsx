'use client'

import { useEffect, useState } from "react"
import { Check, Trash2, Pencil, ArrowUp, ArrowDown, Save, X, Plus, ListTodo } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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

  const accentColor = pageHeaderData?.accent || '#FF5252'

  return (
    <div 
      className="min-h-[100dvh] flex flex-col bg-background"
      style={{ '--page-accent': accentColor } as React.CSSProperties}
    >
      <main className="flex-1">
        {/* Page header */}
        <PageHeader
          title={pageHeaderData?.title || "To-Do List"}
          description={pageHeaderData?.description || "Kelola daftar tugas harian Anda dengan mudah."}
          accent={accentColor}
        />

        {/* Breadcrumb Navigation */}
        <div className="mx-auto max-w-5xl px-4 pt-6 md:px-8 xl:px-16">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="font-bold text-nb-black hover:underline">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-nb-gray">
                  To-Do List
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 xl:px-16">
          <div className="mx-auto max-w-xl">
            {/* Shadcn Card for Input Form */}
            <Card className="mb-8">
              {/* Card Header */}
              <CardHeader className="bg-[#FF5252] text-white" style={{ backgroundColor: 'var(--page-accent)' }}>
                <CardTitle className="text-white flex items-center gap-2">
                  <ListTodo className="size-4 text-white animate-bounce" />
                  Daftar Tugas Baru
                </CardTitle>
              </CardHeader>

              {/* Form Input */}
              <CardContent className="p-5">
                <form onSubmit={handleAddTask} className="flex gap-3">
                  <Input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Masukkan tugas baru..."
                    required
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    className="w-auto px-5 shrink-0"
                    style={{ '--button-shadow': 'var(--page-accent)' } as React.CSSProperties}
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
                <div className="nb-info-box text-center py-10">
                  <ListTodo className="size-10 mx-auto text-nb-gray mb-3 opacity-60" />
                  <p className="text-sm font-bold text-nb-black">Belum ada tugas harian</p>
                  <p className="text-xs text-nb-gray mt-1">Silakan tambahkan tugas baru menggunakan kolom di atas.</p>
                </div>
              ) : (
                // Task List
                <ul className="flex flex-col gap-4">
                  {tasks.map((task, index) => {
                    const isEditing = editingIndex === index

                    return (
                      <li 
                        key={index} 
                        className={`flex items-start justify-between p-4 bg-white border-[3px] border-nb-black shadow-[4px_4px_0px_var(--nb-black)] transition-all duration-150 gap-3 ${
                          task.completed ? 'bg-nb-gray/5' : ''
                        }`}
                      >
                        {/* Checkbox & Task Content Wrapper */}
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {/* Reusable Neo-Brutalist Checkbox Button */}
                          <Button
                            type="button"
                            onClick={() => handleToggleTask(index)}
                            variant={task.completed ? "secondary" : "outline"}
                            size="icon-xs"
                            className="size-6 shrink-0 border-[3px] hover:bg-nb-yellow/40 active:translate-y-[1px] hover:-translate-x-0 hover:-translate-y-0 active:translate-x-0 mt-0.5"
                            style={{
                              boxShadow: task.completed ? '1px 1px 0px var(--nb-black)' : 'none',
                              '--button-shadow': 'none'
                            } as React.CSSProperties}
                            aria-label={task.completed ? "Tandai belum selesai" : "Tandai selesai"}
                          >
                            {task.completed && <Check className="size-4 stroke-[3px]" />}
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
                              className="h-8 py-1 flex-1 font-bold text-sm bg-white min-w-0"
                              autoFocus
                            />
                          ) : (
                            <p 
                              className={`text-sm font-bold text-nb-black break-all whitespace-normal cursor-pointer select-none flex-1 min-w-0 pr-2 mt-0.5 ${
                                task.completed ? 'line-through text-nb-gray decoration-[2px]' : ''
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
                                variant="outline"
                                size="icon-sm"
                                className="hover:bg-nb-yellow"
                                aria-label="Simpan perubahan"
                              >
                                <Save className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                onClick={handleCancelEdit}
                                variant="outline"
                                size="icon-sm"
                                className="hover:bg-nb-red hover:text-white"
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
                                variant="outline"
                                size="icon-sm"
                                className="hover:bg-nb-blue hover:text-white"
                                aria-label="Edit tugas"
                              >
                                <Pencil className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                                variant="outline"
                                size="icon-sm"
                                className={index === 0 ? '' : 'hover:bg-nb-yellow'}
                                aria-label="Pindahkan ke atas"
                              >
                                <ArrowUp className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleMoveDown(index)}
                                disabled={index === tasks.length - 1}
                                variant="outline"
                                size="icon-sm"
                                className={index === tasks.length - 1 ? '' : 'hover:bg-nb-yellow'}
                                aria-label="Pindahkan ke bawah"
                              >
                                <ArrowDown className="size-3.5" />
                              </Button>
                              <Button
                                type="button"
                                onClick={() => handleRemoveTask(index)}
                                variant="outline"
                                size="icon-sm"
                                className="hover:bg-nb-red hover:text-white"
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
            <div className="nb-info-box mt-8">
              <p className="text-xs font-bold uppercase tracking-wider text-nb-black mb-2">
                Tips Penggunaan
              </p>
              <ul className="text-xs font-medium text-nb-gray list-disc pl-4 space-y-1.5" style={{ lineHeight: "1.6" }}>
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
