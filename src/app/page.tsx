import { getProjects } from "@/lib/get-projects"
import ProjectList from "@/components/project-list"
import { Card, CardContent, CardTitle } from "@/components/ui/card"

export default function Home() {
    const projects = getProjects()
    const categoryCount = new Set(projects.map((p) => p.category)).size

    return (
        <div className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern">
            <main className="flex-1">
                {/* ── Hero ── */}
                <section className="bg-transparent">
                    <div className="mx-auto max-w-5xl text-center px-4 py-14 md:px-8 md:py-20 xl:px-16">
                        <div className="mb-5 inline-flex items-center border-2 border-border bg-main px-3 py-1 shadow-shadow">
                            <span className="text-xs font-bold uppercase tracking-widest text-main-foreground">
                                Project, Tools, and Utility
                            </span>
                        </div>

                        <h1 className="mb-4 text-[clamp(2.5rem,5vw,4rem)] font-black leading-none tracking-tight text-foreground">
                            Mini Projects
                        </h1>
                        <p className="max-w-lg text-base w-full mx-auto font-medium text-foreground/80 md:text-lg" style={{ lineHeight: "1.6" }}>
                            Kumpulan mini project yang saya buat untuk belajar, bereksperimen, dan digunakan sebagai tools untuk menyelesaikan suatu masalah.
                            Setiap project fokus pada satu konsep kecil yang menarik.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
