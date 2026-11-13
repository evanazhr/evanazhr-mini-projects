import Image from "next/image"
import { getProjects } from "@/lib/get-projects"
import ProjectList from "@/components/project-list"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
    const projects = getProjects()
    const categoryCount = new Set(projects.map((p) => p.category)).size

    return (
        <div className="min-h-[100dvh] flex flex-col">
            <main className="flex-1">
                {/* ── Hero ── */}
                <section className="bg-transparent">
                    <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-10 md:grid-cols-[1.05fr_.95fr] md:px-8 md:py-16 xl:px-16">
                        <div className="text-left">
                            <div className="mb-5 inline-flex items-center border-2 border-border bg-main px-3 py-1 shadow-shadow">
                                <span className="text-xs font-bold tracking-wider text-main-foreground">
                                    Project, tools, dan utility
                                </span>
                            </div>
                            <h1 className="mb-4 max-w-xl text-[clamp(2.5rem,8vw,4.8rem)] font-black leading-[.92] tracking-[-0.06em] text-foreground">
                                Hal kecil yang<br />bisa dipakai.
                            </h1>
                            <p className="max-w-lg text-base font-medium leading-7 text-foreground/80 md:text-lg">
                                Kumpulan mini project untuk belajar, bereksperimen, dan membantu menyelesaikan masalah sehari-hari.
                            </p>
                        </div>
                        <div className="relative border-2 border-border bg-main p-2 shadow-shadow">
                            <Image
                                src="/Project, Tools, and Utility.png"
                                alt="Ilustrasi kumpulan project, tools, dan utility"
                                width={790}
                                height={595}
                                priority
                                className="h-auto w-full object-cover"
                            />
                            <span className="absolute -bottom-3 -left-3 border-2 border-border bg-secondary-background px-3 py-2 text-xs font-black shadow-shadow">
                                by : evanazhr
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                            <Card className="bg-white">
                                <CardContent>
                                    <span className="text-2xl font-black text-foreground">{projects.length}</span>
                                    <span className="ml-2 text-sm font-semibold text-foreground/70">Projects</span>
                                </CardContent>
                            </Card>
                            <Card className="bg-white">
                                <CardContent>
                                    <span className="text-2xl font-black text-foreground">{categoryCount}</span>
                                    <span className="ml-2 text-sm font-semibold text-foreground/70">Kategori</span>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </section>

                {/* ── Project List (search + filter + grid + pagination) ── */}
                <ProjectList projects={projects} />
            </main>
        </div>
    )
}
