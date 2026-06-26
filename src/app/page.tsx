'use client'

import { useState, useMemo } from "react"
import { Search, FolderOpen } from "lucide-react"
import ProjectCard from "@/components/project-card"
import miniProjects from "@/data/mini-projects"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const ALL_CATEGORIES = ["Semua", ...Array.from(new Set(miniProjects.map((p) => p.category)))]

const ITEMS_PER_PAGE = 10

export default function Home() {
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState("Semua")
    const [currentPage, setCurrentPage] = useState(1)

    const filtered = useMemo(() => {
        return miniProjects.filter((p) => {
            const matchCategory = activeCategory === "Semua" || p.category === activeCategory
            const matchSearch =
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
            return matchCategory && matchSearch
        })
    }, [search, activeCategory])

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [filtered, currentPage])

    return (
        <div className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern">

            <main className="flex-1">
                {/* ── Hero ── */}
                <section className="bg-transparent">
                    <div className="mx-auto max-w-5xl px-4 py-14 md:px-8 md:py-20 xl:px-16">
                        <div className="mb-5 inline-flex items-center border-2 border-border bg-main px-3 py-1 shadow-shadow">
                            <span className="text-xs font-bold uppercase tracking-widest text-main-foreground">
                                Portfolio
                            </span>
                        </div>

                        <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-tight text-foreground">
                            Mini Projects
                        </h1>
                        <p className="max-w-lg text-base font-medium text-foreground/80 md:text-lg" style={{ lineHeight: "1.6" }}>
                            Kumpulan mini project yang saya buat untuk belajar dan bereksperimen.
                            Setiap project fokus pada satu konsep kecil yang menarik.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <div className="border-2 border-border bg-background px-4 py-2 shadow-shadow rounded-base">
                                <span className="text-2xl font-black text-foreground">{miniProjects.length}</span>
                                <span className="ml-2 text-sm font-semibold text-foreground/70">Projects</span>
                            </div>
                            <div className="border-2 border-border bg-background px-4 py-2 shadow-shadow rounded-base">
                                <span className="text-2xl font-black text-foreground">{ALL_CATEGORIES.length - 1}</span>
                                <span className="ml-2 text-sm font-semibold text-foreground/70">Kategori</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Search & Filter ── */}
                <section className="bg-transparent">
                    <div className="mx-auto max-w-5xl px-4 py-5 md:px-8 xl:px-16">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            {/* Search */}
                             <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/60 z-10" />
                                <Input
                                    type="text"
                                    placeholder="Cari project..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                        setCurrentPage(1)
                                    }}
                                    className="pl-9 h-10 bg-secondary-background"
                                />
                            </div>

                            {/* Category dropdown */}
                            <div className="w-full sm:w-auto">
                                <Select 
                                    value={activeCategory} 
                                    onValueChange={(val) => {
                                        setActiveCategory(val)
                                        setCurrentPage(1)
                                    }}
                                >
                                    <SelectTrigger className="w-full sm:w-[180px] bg-secondary-background text-foreground border-2 border-border shadow-shadow font-bold h-10">
                                        <SelectValue placeholder="Kategori" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-secondary-background text-foreground border-2 border-border">
                                        {ALL_CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="hover:bg-main/20">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Project Grid ── */}
                <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-20 text-center">
                            <div className="border-2 border-border bg-main p-5 shadow-shadow rounded-base">
                                <FolderOpen className="size-10 text-main-foreground" />
                            </div>
                            <p className="text-lg font-black text-foreground">Tidak ada project ditemukan</p>
                            <p className="text-sm font-medium text-foreground/70">Coba kata kunci atau kategori lain</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {paginatedProjects.map((project) => (
                                    <ProjectCard key={project.href} project={project} />
                                ))}
                            </div>

                            <div className="mt-10">
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                                                    }}
                                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                                />
                                            </PaginationItem>

                                            {Array.from({ length: totalPages }, (_, idx) => {
                                                const pageNum = idx + 1
                                                return (
                                                    <PaginationItem key={pageNum}>
                                                        <PaginationLink
                                                            href="#"
                                                            isActive={currentPage === pageNum}
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                setCurrentPage(pageNum)
                                                            }}
                                                            className="cursor-pointer font-bold"
                                                        >
                                                            {pageNum}
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                )
                                            })}

                                            <PaginationItem>
                                                <PaginationNext
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                                                    }}
                                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    )
}

