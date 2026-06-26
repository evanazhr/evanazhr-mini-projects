'use client'

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-4 z-[100] mx-auto my-4 w-[calc(100%-2rem)] max-w-5xl bg-secondary-background border-2 border-border rounded-base shadow-shadow">
            <div className="flex h-14 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-black text-foreground text-lg tracking-tight hover:opacity-90 transition-opacity group"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src="/icon-192.png" 
                        alt="Logo evanazhr" 
                        className="size-6 border-2 border-border bg-main rounded-base shadow-[1px_1px_0px_var(--border)] group-hover:scale-105 transition-transform duration-150 shrink-0" 
                    />
                    <span>evanazhr.mini.projects</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => (
                        <Button
                            key={link.href}
                            asChild
                            variant="noShadow"
                            size="sm"
                            className="bg-transparent border-transparent text-foreground hover:bg-background hover:border-border font-base"
                        >
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </Button>
                    ))}

                    {/* GitHub link */}
                    <Button
                        asChild
                        variant="neutral"
                        size="sm"
                        className="ml-1 font-bold"
                    >
                        <a
                            href="https://github.com/evanazhr"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub evanazhr"
                        >
                            <FaGithub className="size-4" />
                            <span>GitHub</span>
                        </a>
                    </Button>
                </nav>

                {/* Mobile toggle */}
                <Button
                    variant="neutral"
                    className="md:hidden size-9 p-0 bg-secondary-background text-foreground flex items-center justify-center shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {open ? <X className="size-4" /> : <Menu className="size-4" />}
                </Button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="border-t-2 border-border bg-secondary-background px-4 pb-4 pt-3 rounded-b-[8px] md:hidden">
                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Button
                                key={link.href}
                                asChild
                                variant="neutral"
                                className="w-full justify-start text-left bg-secondary-background text-foreground"
                                onClick={() => setOpen(false)}
                            >
                                <Link href={link.href}>
                                    {link.label}
                                </Link>
                            </Button>
                        ))}
                        <Button
                            asChild
                            variant="neutral"
                            className="w-full justify-start font-bold bg-secondary-background text-foreground"
                            onClick={() => setOpen(false)}
                        >
                            <a
                                href="https://github.com/evanazhr"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub className="size-4" />
                                GitHub
                            </a>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    )
}

