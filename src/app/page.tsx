'use client'

import { useState, useMemo } from "react"
import { Search, FolderOpen } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProjectCard from "@/components/project-card"
import miniProjects from "@/data/mini-projects"

const ALL_CATEGORIES = ["Semua", ...Array.from(new Set(miniProjects.map((p) => p.category)))]

export default function Home() {
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState("Semua")

    const filtered = useMemo(() => {
        return miniProjects.filter((p) => {
            const matchCategory = activeCategory === "Semua" || p.category === activeCategory
            const matchSearch =
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
            return matchCategory && matchSearch
        })
    }, [search, activeCategory])

    return (
        <div className="min-h-[100dvh] flex flex-col bg-[#fffef0]">
            <Navbar />

            <main className="flex-1">
                {/* ── Hero ── */}
                <section className="border-b-[3px] border-[#1a1a1a] bg-[#FF5252]">
                    <div className="mx-auto max-w-5xl px-4 py-14 md:px-8 md:py-20 xl:px-16">
                        <div className="mb-5 inline-flex items-center border-[2px] border-[#1a1a1a] bg-[#FFEB3B] px-3 py-1 shadow-[3px_3px_0px_#1a1a1a]">
                            <span className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]">
                                Portfolio
                            </span>
                        </div>

                        <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-tight text-white">
                            Mini Projects
                        </h1>
                        <p className="max-w-lg text-base font-medium text-white/90 md:text-lg" style={{ lineHeight: "1.6" }}>
                            Kumpulan mini project yang saya buat untuk belajar dan bereksperimen.
                            Setiap project fokus pada satu konsep kecil yang menarik.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <div className="border-[2px] border-[#1a1a1a] bg-white px-4 py-2 shadow-[3px_3px_0px_#1a1a1a]">
                                <span className="text-2xl font-black text-[#1a1a1a]">{miniProjects.length}</span>
                                <span className="ml-2 text-sm font-semibold text-[#555]">Projects</span>
                            </div>
                            <div className="border-[2px] border-[#1a1a1a] bg-white px-4 py-2 shadow-[3px_3px_0px_#1a1a1a]">
                                <span className="text-2xl font-black text-[#1a1a1a]">{ALL_CATEGORIES.length - 1}</span>
                                <span className="ml-2 text-sm font-semibold text-[#555]">Kategori</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Search & Filter ── */}
                <section className="border-b-[3px] border-[#1a1a1a] bg-[#FFEB3B]">
                    <div className="mx-auto max-w-5xl px-4 py-5 md:px-8 xl:px-16">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#1a1a1a]" />
                                <input
                                    type="text"
                                    placeholder="Cari project..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-10 w-full border-[3px] border-[#1a1a1a] bg-white pl-9 pr-3 text-sm font-medium text-[#1a1a1a] placeholder:text-[#888] outline-none focus:shadow-[4px_4px_0px_#1a1a1a] transition-shadow duration-150"
                                />
                            </div>

                            {/* Category dropdown */}
                            <div className="relative">
                                <select
                                    value={activeCategory}
                                    onChange={(e) => setActiveCategory(e.target.value)}
                                    className="h-10 appearance-none border-[3px] border-[#1a1a1a] bg-white pl-3 pr-8 text-sm font-bold text-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] outline-none cursor-pointer focus:shadow-[4px_4px_0px_#1a1a1a] transition-shadow duration-150"
                                >
                                    {ALL_CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {/* custom chevron */}
                                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2">
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                        <path d="M1 1L5 5L9 1" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Project Grid ── */}
                <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-20 text-center">
                            <div className="border-[3px] border-[#1a1a1a] bg-[#FFEB3B] p-5 shadow-[5px_5px_0px_#1a1a1a]">
                                <FolderOpen className="size-10 text-[#1a1a1a]" />
                            </div>
                            <p className="text-lg font-black text-[#1a1a1a]">Tidak ada project ditemukan</p>
                            <p className="text-sm font-medium text-[#555]">Coba kata kunci atau kategori lain</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((project) => (
                                <ProjectCard key={project.href} project={project} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    )
}
