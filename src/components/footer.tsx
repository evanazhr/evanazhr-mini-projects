import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"

export default function Footer() {
    return (
        <footer className="border-t-[3px] border-nb-black bg-nb-black">
            <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 xl:px-16">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left — brand */}
                    <div className="flex flex-col gap-1">
                        <span className="text-base font-black text-white tracking-tight">evanazhr.mini.projects</span>
                        <span className="text-xs font-medium text-white/50">
                            Dibuat untuk belajar &amp; bereksperimen
                        </span>
                    </div>

                    {/* Right — links */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/about"
                            className="text-xs font-semibold text-white/70 hover:text-white transition-colors duration-150"
                        >
                            About
                        </Link>
                        <span className="text-white/30">·</span>
                        <Button
                            asChild
                            variant="outline"
                            size="xs"
                            className="border-white/20 text-white hover:border-white hover:bg-white/10 bg-transparent shadow-none hover:shadow-none active:shadow-none hover:translate-y-0 hover:translate-x-0 active:translate-y-0 active:translate-x-0"
                        >
                            <a
                                href="https://github.com/evanazhr"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub evanazhr"
                            >
                                <FaGithub className="size-3.5" />
                                evanazhr
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    )
}
