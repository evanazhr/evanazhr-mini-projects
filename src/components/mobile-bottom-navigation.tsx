'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, UserRound, LayoutGrid } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"

/**
 * Bottom bar Neubrutalism:
 * - Home & About = destinasi (punya state aktif).
 * - Bahasa & GitHub = aksi global (tanpa state aktif), tetap satu keluarga
 *   tile supaya thumb zone seragam dan rapi.
 */
const tileBase =
  "group flex min-h-12 w-full flex-col items-center justify-center gap-1 border-2 px-1 py-1.5 text-[10px] font-bold leading-none transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"

const tileActive =
  "border-border bg-main text-foreground shadow-[2px_2px_0_var(--border)] active:shadow-none"

const tileInactive = "border-transparent text-foreground/60 hover:bg-background hover:text-foreground"

export default function MobileBottomNavigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isAbout = pathname === "/about"

  return (
    <nav
      aria-label="Navigasi utama mobile"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[100] mx-auto max-w-md md:hidden"
    >
      <div className="grid grid-cols-4 items-stretch gap-1 border-2 border-border bg-secondary-background p-1.5 shadow-shadow">
        <Link
          href="/"
          aria-current={isHome ? "page" : undefined}
          className={`${tileBase} ${isHome ? tileActive : tileInactive}`}
        >
          <Home className="size-5" aria-hidden="true" strokeWidth={2.25} />
          <span>Home</span>
        </Link>

        <Link
          href="/#projects"
          className={`${tileBase} ${tileInactive}`}
        >
          <LayoutGrid className="size-5" aria-hidden="true" strokeWidth={2.25} />
          <span>Projects</span>
        </Link>
        <Link
          href="/about"
          aria-current={isAbout ? "page" : undefined}
          className={`${tileBase} ${isAbout ? tileActive : tileInactive}`}
        >
          <UserRound className="size-5" aria-hidden="true" strokeWidth={2.25} />
          <span>About</span>
        </Link>

        <LanguageSwitcher compact tileClassName={tileBase} tileInactiveClassName={tileInactive} />
      </div>
    </nav>
  )
}
