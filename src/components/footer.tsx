import Image from "next/image"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
    return (
        <footer className="border-t-2 border-border pb-20 md:pb-0 bg-secondary-background pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
            <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3" aria-label="Kembali ke beranda">
                            <Image src="/Project, Tools, and Utility.png" alt="" width={44} height={44} className="object-cover" aria-hidden="true" />
                            <span className="text-xl font-black tracking-tight">mini projects</span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm font-medium leading-6 text-foreground/65">
                            Kumpulan tools kecil untuk belajar, bereksperimen, dan menyelesaikan masalah sehari-hari.
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-3 md:items-end">
                        <nav aria-label="Link footer" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold">
                            <Link href="/" className="transition-colors hover:text-chart-2">Home</Link>
                            <Link href="/about" className="transition-colors hover:text-chart-2">About</Link>
                            <a href="https://github.com/evanazhr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition-colors hover:text-chart-2">
                                GitHub <ArrowUpRight className="size-3.5" />
                            </a>
                        </nav>
                        <Button asChild variant="neutral" size="sm">
                            <a href="https://github.com/evanazhr" target="_blank" rel="noopener noreferrer" aria-label="Buka GitHub evanazhr">
                                <FaGithub className="size-3.5" />
                                Lihat source code
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="mt-8 border-t-2 border-border/15 pt-4 text-xs font-medium text-foreground/55">
                    © {new Date().getFullYear()} mini projects. Dibuat untuk terus mencoba hal kecil.
                </div>
            </div>
        </footer>
    )
}
