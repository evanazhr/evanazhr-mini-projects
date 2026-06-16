'use client'

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Code2 } from "lucide-react"
import { FaGithub } from "react-icons/fa"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-[100] w-full bg-[#FFEB3B] border-b-[3px] border-[#1a1a1a]">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-8 xl:px-16">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-[#1a1a1a] text-lg tracking-tight"
                >
                    <Code2 className="size-5" />
                    <span>evanazhr.mini.projects</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="px-3 py-1.5 text-sm font-semibold text-[#1a1a1a] border-[2px] border-transparent hover:border-[#1a1a1a] hover:bg-white hover:shadow-[3px_3px_0px_#1a1a1a] transition-all duration-150"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* GitHub link */}
                    <a
                        href="https://github.com/evanazhr"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub evanazhr"
                        className="ml-1 flex items-center gap-1.5 border-[2px] border-[#1a1a1a] bg-[#1a1a1a] px-3 py-1.5 text-sm font-bold text-white shadow-[3px_3px_0px_#1a1a1a] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#1a1a1a] transition-all duration-150"
                    >
                        <FaGithub className="size-4" />
                        <span>GitHub</span>
                    </a>
                </nav>

                {/* Mobile toggle */}
                <button
                    className="md:hidden p-1.5 border-[2px] border-[#1a1a1a] bg-white transition-all duration-150 hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_#1a1a1a]"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="size-4" /> : <Menu className="size-4" />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="border-t-[3px] border-[#1a1a1a] bg-[#FFEB3B] px-4 pb-4 pt-3 md:hidden">
                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="block px-3 py-2 text-sm font-semibold text-[#1a1a1a] border-[2px] border-[#1a1a1a] bg-white shadow-[3px_3px_0px_#1a1a1a] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#1a1a1a] transition-all duration-150"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <a
                            href="https://github.com/evanazhr"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-white border-[2px] border-[#1a1a1a] bg-[#1a1a1a] shadow-[3px_3px_0px_#FFEB3B] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#FFEB3B] transition-all duration-150"
                        >
                            <FaGithub className="size-4" />
                            GitHub
                        </a>
                    </nav>
                </div>
            )}
        </header>
    )
}
