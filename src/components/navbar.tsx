'use client'

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Code2 } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-[100] w-full bg-nb-yellow border-b-[3px] border-nb-black">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-8 xl:px-16">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-nb-black text-lg tracking-tight"
                >
                    <Code2 className="size-5" />
                    <span>evanazhr.mini.projects</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => (
                        <Button
                            key={link.href}
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-nb-black hover:border-nb-black hover:bg-white"
                        >
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </Button>
                    ))}

                    {/* GitHub link */}
                    <Button
                        asChild
                        variant="default"
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
                    variant="outline"
                    size="icon-sm"
                    className="md:hidden bg-white text-nb-black hover:bg-nb-yellow/40 active:translate-y-[1px]"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    style={{ '--button-shadow': 'var(--nb-black)' } as React.CSSProperties}
                >
                    {open ? <X className="size-4" /> : <Menu className="size-4" />}
                </Button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="border-t-[3px] border-nb-black bg-nb-yellow px-4 pb-4 pt-3 md:hidden">
                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Button
                                key={link.href}
                                asChild
                                variant="outline"
                                className="w-full justify-start text-left bg-white text-nb-black"
                                onClick={() => setOpen(false)}
                            >
                                <Link href={link.href}>
                                    {link.label}
                                </Link>
                            </Button>
                        ))}
                        <Button
                            asChild
                            variant="default"
                            className="w-full justify-start font-bold"
                            onClick={() => setOpen(false)}
                            style={{ '--button-shadow': 'var(--nb-yellow)' } as React.CSSProperties}
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
