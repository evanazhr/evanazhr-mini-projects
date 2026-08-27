'use client'

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const navRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (open && navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [open])

    return (
        <header 
            ref={navRef}
            className="sticky top-4 z-[100] mx-auto my-4 w-[calc(100%-2rem)] max-w-5xl bg-secondary-background border-2 border-border rounded-base shadow-shadow overflow-hidden"
        >
            <div className="flex h-14 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-black text-foreground text-lg tracking-tight hover:opacity-90 transition-opacity group"
                >              
                    <span>@evanazhr</span>
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

                {/* Mobile toggle dengan icon cross-fade */}
                <Button
                    variant="neutral"
                    className="md:hidden size-9 p-0 bg-secondary-background text-foreground flex items-center justify-center shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 relative"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {open ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.15 }}
                            >
                                <X className="size-4" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ opacity: 0, rotate: 90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: -90 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Menu className="size-4" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </div>

            {/* Animated Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t-2 border-border bg-secondary-background px-4 pb-4 pt-3 overflow-hidden md:hidden"
                    >
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                                >
                                    <Button
                                        asChild
                                        variant="neutral"
                                        className="w-full justify-start text-left bg-secondary-background text-foreground"
                                        onClick={() => setOpen(false)}
                                    >
                                        <Link href={link.href}>
                                            {link.label}
                                        </Link>
                                    </Button>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
                            >
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
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}