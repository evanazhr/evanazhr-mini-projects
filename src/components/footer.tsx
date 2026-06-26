import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export default function Footer() {
    return (
        <footer className="border-t-2 border-border bg-secondary-background">
            <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 xl:px-16">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left — brand */}
                    <div className="flex flex-col gap-1">
                        <span className="text-base font-black text-foreground tracking-tight">evanazhr.mini.projects</span>
                        <span className="text-xs font-medium text-foreground/60">
                            Dibuat untuk belajar &amp; bereksperimen
                        </span>
                    </div>

                    {/* Right — links */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/about"
                            className="text-xs font-semibold text-foreground/70 hover:text-foreground transition-colors duration-150"
                        >
                            About
                        </Link>
                        <span className="text-foreground/30">·</span>
                        <Button
                            asChild
                            variant="neutral"
                            size="sm"
                        >
                            <a
                                href="https://github.com/evanazhr"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub evanazhr"
                            >
                                <FaGithub className="size-3.5" />
                                <span>evanazhr</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

