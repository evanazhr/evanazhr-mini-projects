import type { Metadata } from "next"
import { Code2, Layers, Wrench, Mail, Globe, Sparkles } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import miniProjects from "@/data/mini-projects"
import { Card, CardContent } from "@/components/ui/card"
import PageHeader from "@/components/page-header"

export const metadata: Metadata = {
  title: "About",
}

const techStack = [
    { name: "TypeScript", desc: "Bahasa pemrograman utama", category: "Core" },
    { name: "React 19", desc: "Library UI deklaratif", category: "Core" },
    { name: "Next.js 15", desc: "Framework React modern", category: "Core" },
    { name: "Tailwind CSS v4", desc: "Styling engine cepat", category: "Styling" },
    { name: "Node.js", desc: "Runtime JavaScript server", category: "Backend" },
]

const socialLinks = [
    {
        label: "GitHub Profile",
        username: "@evanazhr",
        href: "https://github.com/evanazhr",
        icon: FaGithub,
        color: "bg-[#24292e] text-white",
    },
    {
        label: "Email",
        username: "evanazhr@gmail.com",
        href: "mailto:evanazhr@gmail.com",
        icon: Mail,
        color: "bg-chart-3 text-white",
    },
]

export default function About() {
    return (
        <div className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern">
            <main className="flex-1">
                {/* Page header */}
                <PageHeader
                    title="About"
                    description="Informasi tentang pengembang dan proyek portofolio mini ini"
                    accent="var(--chart-3)"
                />

                <div className="mx-auto w-[calc(100%-2rem)] max-w-5xl py-8">
                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* ── Left column: Bio & Project Info ── */}
                        <div className="flex flex-col gap-6 lg:col-span-2">

                            {/* Bio Card */}
                            <Card className="bg-secondary-background border-2 border-border shadow-shadow">
                                <CardContent className="p-6 flex flex-col gap-6">
                                    {/* Header Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-chart-3 text-white border-2 border-border font-bold text-xs uppercase tracking-widest rounded-base shadow-[2px_2px_0px_0px_var(--border)]">
                                            <Code2 className="size-3.5 text-white" />
                                            <span>Siapa Saya</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs font-bold text-foreground/50">
                                            <Sparkles className="size-3.5 text-chart-1 fill-chart-1" />
                                            <span>Developer</span>
                                        </div>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <div className="relative size-16 border-2 border-border bg-main flex items-center justify-center shadow-shadow rounded-base shrink-0 transition-transform hover:scale-105">
                                            <span className="text-2xl font-black text-main-foreground select-none">E</span>
                                            <div className="absolute -bottom-1 -right-1 size-5 bg-chart-4 border-2 border-border rounded-full flex items-center justify-center shadow-[1px_1px_0px_var(--border)]">
                                                <span className="text-[9px] font-black text-black">👋</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-foreground">evanazhr</h2>
                                            <p className="text-sm font-bold text-chart-5 uppercase tracking-wide">Web Developer</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                                        Halo! Saya seorang web developer yang senang mempelajari hal baru melalui eksperimen langsung. 
                                        Setiap mini project di dalam repositori ini dirancang khusus untuk memahami satu konsep pemrograman 
                                        tertentu—baik itu algoritma, manipulasi DOM, pemrosesan data, maupun integrasi pustaka eksternal.
                                    </p>

                                    {/* Highlights */}
                                    <div className="border-2 border-border bg-background p-4 rounded-base">
                                        <h3 className="text-xs font-black uppercase tracking-wider text-foreground/60 mb-3">Fokus & Pendekatan</h3>
                                        <ul className="grid gap-2.5 sm:grid-cols-2">
                                            <li className="flex items-start gap-2 text-sm font-semibold text-foreground/80">
                                                <span className="text-chart-4 mt-0.5 font-bold">✓</span>
                                                <span>Eksperimen Interaktif</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm font-semibold text-foreground/80">
                                                <span className="text-chart-4 mt-0.5 font-bold">✓</span>
                                                <span>Desain Neubrutalist</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm font-semibold text-foreground/80">
                                                <span className="text-chart-4 mt-0.5 font-bold">✓</span>
                                                <span>Kode Bersih & Terstruktur</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm font-semibold text-foreground/80">
                                                <span className="text-chart-4 mt-0.5 font-bold">✓</span>
                                                <span>Fungsionalitas Responsif</span>
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Project Info Card */}
                            <Card className="bg-secondary-background border-2 border-border shadow-shadow">
                                <CardContent className="p-6 flex flex-col gap-6">
                                    {/* Header Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-chart-5 text-white border-2 border-border font-bold text-xs uppercase tracking-widest rounded-base shadow-[2px_2px_0px_0px_var(--border)]">
                                            <Layers className="size-3.5 text-white" />
                                            <span>Tentang Proyek</span>
                                        </div>
                                    </div>

                                    <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                                        Halaman ini mengumpulkan seluruh mini project yang telah saya bangun dalam satu platform terpadu. 
                                        Dengan antarmuka yang kohesif dan responsif, Anda dapat langsung mencoba fungsionalitas dari setiap project 
                                        tanpa perlu konfigurasi tambahan.
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        <div className="border-2 border-border bg-background p-3 rounded-base shadow-[2px_2px_0px_var(--border)] hover:translate-y-[-2px] transition-transform duration-150">
                                            <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Total Project</p>
                                            <p className="text-2xl font-black text-foreground mt-1">{miniProjects.length}</p>
                                        </div>
                                        <div className="border-2 border-border bg-background p-3 rounded-base shadow-[2px_2px_0px_var(--border)] hover:translate-y-[-2px] transition-transform duration-150">
                                            <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Framework</p>
                                            <p className="text-sm font-black text-foreground mt-2">Next.js 15</p>
                                        </div>
                                        <div className="border-2 border-border bg-background p-3 rounded-base shadow-[2px_2px_0px_var(--border)] hover:translate-y-[-2px] transition-transform duration-150">
                                            <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Gaya UI</p>
                                            <p className="text-sm font-black text-foreground mt-2">Neubrutalism</p>
                                        </div>
                                        <div className="border-2 border-border bg-background p-3 rounded-base shadow-[2px_2px_0px_var(--border)] hover:translate-y-[-2px] transition-transform duration-150">
                                            <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-wider">Status</p>
                                            <p className="text-sm font-black text-chart-4 mt-2">Aktif</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>

                        {/* ── Right column: Stack & Links ── */}
                        <div className="flex flex-col gap-6">

                            {/* Tech Stack Card */}
                            <Card className="bg-secondary-background border-2 border-border shadow-shadow">
                                <CardContent className="p-6 flex flex-col gap-6">
                                    {/* Header Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-main text-main-foreground border-2 border-border font-bold text-xs uppercase tracking-widest rounded-base shadow-[2px_2px_0px_0px_var(--border)]">
                                            <Wrench className="size-3.5 text-main-foreground" />
                                            <span>Tech Stack</span>
                                        </div>
                                    </div>

                                    {/* Stack Items */}
                                    <div className="flex flex-col gap-2.5">
                                        {techStack.map((tech) => (
                                            <div 
                                                key={tech.name}
                                                className="flex items-center justify-between border-2 border-border bg-background p-3 rounded-base shadow-[2px_2px_0px_var(--border)] hover:translate-y-[-2px] transition-transform duration-150"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="size-2 rounded-full bg-main" />
                                                    <span className="text-sm font-black text-foreground">{tech.name}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-foreground/60 border border-border/20 px-1.5 py-0.5 rounded-base bg-secondary-background">
                                                    {tech.category}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Links/Social Card */}
                            <Card className="bg-secondary-background border-2 border-border shadow-shadow">
                                <CardContent className="p-6 flex flex-col gap-6">
                                    {/* Header Badge */}
                                    <div className="flex items-center justify-between">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-foreground text-background border-2 border-border font-bold text-xs uppercase tracking-widest rounded-base shadow-[2px_2px_0px_0px_var(--border)]">
                                            <Globe className="size-3.5 text-background" />
                                            <span>Links & Kontak</span>
                                        </div>
                                    </div>

                                    {/* Link Buttons */}
                                    <div className="flex flex-col gap-3">
                                        {socialLinks.map((link) => (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 border-2 border-border bg-background p-3 rounded-base shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all duration-150 group"
                                            >
                                                <div className={`border-2 border-border ${link.color} p-2 rounded-base shrink-0 group-hover:scale-105 transition-transform duration-150`}>
                                                    <link.icon className="size-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-foreground/60">{link.label}</p>
                                                    <p className="text-sm font-black text-foreground truncate">{link.username}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}


