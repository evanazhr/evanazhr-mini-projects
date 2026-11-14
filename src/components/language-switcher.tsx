'use client'

import { Languages } from "lucide-react"
import { useLanguageStore } from "@/stores/language-store"

type LanguageSwitcherProps = {
  /** Mode tile: dipakai di bottom bar mobile (seragam dengan Home/About/GitHub). */
  compact?: boolean
  tileClassName?: string
  tileInactiveClassName?: string
}

export default function LanguageSwitcher({
  compact = false,
  tileClassName,
  tileInactiveClassName,
}: LanguageSwitcherProps) {
  const language = useLanguageStore((state) => state.language)
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage)
  const nextLanguage = language === "id" ? "EN" : "ID"

  if (compact) {
    const tile =
      tileClassName ??
      "group flex min-h-12 flex-col items-center justify-center gap-1 border-2 px-1 py-1.5 text-[10px] font-bold leading-none transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px]"

    return (
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={language === "id" ? "Switch to English" : "Ganti ke bahasa Indonesia"}
        title={language === "id" ? "Switch to English" : "Ganti ke bahasa Indonesia"}
        className={`${tile} ${tileInactiveClassName ?? "border-transparent text-foreground/60 hover:bg-background hover:text-foreground"} hover:border-border`}
      >
        <Languages className="size-5" aria-hidden="true" strokeWidth={2.25} />
        <span>{language.toUpperCase()}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "id" ? "Switch to English" : "Ganti ke bahasa Indonesia"}
      title={language === "id" ? "Switch to English" : "Ganti ke bahasa Indonesia"}
      className="inline-flex h-9 items-center justify-center gap-1.5 border-2 border-border bg-main px-3 text-xs font-black text-main-foreground shadow-[3px_3px_0_var(--border)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_var(--border)]"
    >
      <Languages className="size-4" aria-hidden="true" />
      <span>{nextLanguage}</span>
    </button>
  )
}
