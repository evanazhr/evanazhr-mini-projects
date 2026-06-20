import Link from "next/link"
import { FaGithub } from "react-icons/fa"

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
                        <a
                            href="https://github.com/evanazhr"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub evanazhr"
                            className="flex items-center gap-1.5 border-[2px] border-white/20 px-2.5 py-1 text-xs font-bold text-white hover:border-white hover:bg-white/10 transition-all duration-150"
                        >
                            <FaGithub className="size-3.5" />
                            evanazhr
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
