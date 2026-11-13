'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UserRound } from "lucide-react"
import { FaGithub } from "react-icons/fa"

export default function MobileBottomNavigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isAbout = pathname === "/about"

  return (
    <nav
      aria-label="Navigasi utama mobile"
      className="fixed inset-x-3 bottom-3 z-[100] md:hidden"
    >
      <div className="grid min-h-16 grid-cols-3 items-center gap-1 rounded-none border-2 border-border bg-secondary-background px-2 pb-[env(safe-area-inset-bottom)] shadow-shadow">
        <Link
          href="/"
          aria-current={isHome ? "page" : undefined}
          className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-none text-xs font-bold transition-colors ${isHome ? "bg-main shadow-shadow" : "hover:bg-background"}`}
        >
          <Home className="size-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/about"
          aria-current={isAbout ? "page" : undefined}
          className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-none text-xs font-bold transition-colors ${isAbout ? "bg-main shadow-shadow" : "hover:bg-background"}`}
        >
          <UserRound className="size-5" />
          <span>About</span>
        </Link>
        <a
          href="https://github.com/evanazhr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buka GitHub evanazhr"
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-none text-xs font-bold transition-colors hover:bg-background"
        >
          <FaGithub className="size-5" />
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  )
}
