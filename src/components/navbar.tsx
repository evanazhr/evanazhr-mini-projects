'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Home, Menu, UserRound, X } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
]

export default function Navbar() {
    const pathname = usePathname()
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

    useEffect(() => {
        setOpen(false)
    }, [pathname])

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [open])

    return (
        <header
            ref={navRef}
            className="hidden md:block fixed left-2 right-2 z-[100] mx-auto w-[calc(100%-1rem)] max-w-5xl rounded-base border-2 border-border bg-secondary-background shadow-shadow md:fixed md:inset-x-0 md:bottom-auto md:left-0 md:right-0 md:top-4 md:my-0 md:w-[calc(100%-2rem)] md:overflow-hidden"
        >
            <div className="flex min-h-14 items-center justify-between px-3 pb-[env(safe-area-inset-bottom)] sm:px-4 md:px-6 md:pb-0">
                {/* Logo */}
                <Link
                    href="/"
                    aria-label="Kembali ke beranda"
                    className="flex min-w-0 items-center gap-2 truncate text-base font-black tracking-tight text-foreground transition-opacity hover:opacity-90 sm:text-lg"
                >              
                    <span className="flex size-9 shrink-0 items-center justify-center border-2 border-border bg-main text-sm font-black shadow-[2px_2px_0_var(--border)]" aria-hidden="true">
                        MP
                    </span>
                    <span className="truncate">mini projects</span>
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

                {/* Mobile keeps a compact brand row; navigation lives in the bottom bar. */}
                <div className="flex items-center gap-2 md:hidden">
                    <Link href="/" aria-label="Beranda" className={`flex size-10 items-center justify-center rounded-base border-2 border-border ${pathname === "/" ? "bg-main shadow-shadow" : "bg-background"}`}>
                        <Home className="size-4" />
                    </Link>
                    <Link href="/about" aria-label="Tentang" className={`flex size-10 items-center justify-center rounded-base border-2 border-border ${pathname === "/about" ? "bg-main shadow-shadow" : "bg-background"}`}>
                        <UserRound className="size-4" />
                    </Link>
                </div>
                <Button
                    variant="neutral"
                    className="relative hidden size-10 shrink-0 p-0 bg-secondary-background text-foreground items-center justify-center shadow-none hover:shadow-none hover:translate-x-0 hover:translate-y-0 md:hidden"
                    onClick={() => setOpen((prev) => !prev)}
                    aria-expanded={open}
                    aria-controls="mobile-navigation"
                    aria-label={open ? "Tutup menu" : "Buka menu"}
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

            {/* Desktop-only mobile menu remains hidden; bottom navigation is direct-access. */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        id="mobile-navigation"
                        className="hidden border-t-2 border-border bg-secondary-background px-4 pb-4 pt-3 overflow-hidden md:hidden"
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
