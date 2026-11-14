'use client'

import { useState, useMemo, useEffect } from "react"
import { Search, FolderOpen } from "lucide-react"
import ProjectCard from "@/components/project-card"
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
import type { Project } from "@/types/project.type"
import { useLanguage, translateValue } from "@/components/language-provider"

const PAGE_SIZE_OPTIONS = [6, 12, 24, 48]

type Props = {
    projects: Project[]
}

export default function ProjectList({ projects }: Props) {
    const { language } = useLanguage()
    const t = (value: string) => translateValue(value, language)
    const allCategories = useMemo(
        () => ["Semua", ...Array.from(new Set(projects.map((p) => p.category)))],
        [projects]
    )

    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState("Semua")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(12)

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchCategory = activeCategory === "Semua" || p.category === activeCategory
            const matchSearch =
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
            return matchCategory && matchSearch
        })
    }, [search, activeCategory, projects])

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))

    useEffect(() => {
        setCurrentPage((page) => Math.min(page, totalPages))
    }, [totalPages])

    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filtered.slice(startIndex, startIndex + itemsPerPage)
    }, [filtered, currentPage, itemsPerPage])

    return (
        <>
            {/* ── Search & Filter ── */}
            <section className="bg-transparent">
                <div className="mx-auto max-w-5xl px-4 py-5 md:px-8 xl:px-16">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground/60 z-10" />
                            <Input
                                type="text"
                                placeholder={t("Cari project...")}
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
                                    <SelectValue placeholder={t("Kategori")} />
                                </SelectTrigger>
                                <SelectContent className="bg-secondary-background text-foreground border-2 border-border">
                                    {allCategories.map((cat) => (
                                        <SelectItem key={cat} value={cat} className="hover:bg-main/20">
                                            {t(cat)}
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
                        <div className="border-2 border-border bg-main p-5 shadow-shadow rounded-none">
                            <FolderOpen className="size-10 text-main-foreground" />
                        </div>
                        <p className="text-lg font-black text-foreground">Tidak ada project ditemukan</p>
                        <p className="text-sm font-medium text-foreground/70">Coba kata kunci atau kategori lain</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300">
                            {paginatedProjects.map((project) => (
                                <ProjectCard key={project.href} project={project} />
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col gap-4 border-t-2 border-border/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <label className="flex items-center gap-3 text-sm font-bold">
                                Tampilkan
                                <Select
                                    value={String(itemsPerPage)}
                                    onValueChange={(value) => {
                                        setItemsPerPage(Number(value))
                                        setCurrentPage(1)
                                    }}
                                >
                                    <SelectTrigger className="h-10 w-[150px] bg-secondary-background text-foreground border-2 border-border shadow-shadow font-bold">
                                        <SelectValue placeholder="Jumlah project" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-secondary-background text-foreground border-2 border-border">
                                        {PAGE_SIZE_OPTIONS.map((size) => (
                                            <SelectItem key={size} value={String(size)} className="hover:bg-main/20">
                                                {size} project / halaman
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </label>
                            <span className="text-sm font-medium text-foreground/70">
                                Halaman {currentPage} dari {totalPages}
                            </span>
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-5">
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
                        )}
                    </>
                )}
            </section>
        </>
    )
}
