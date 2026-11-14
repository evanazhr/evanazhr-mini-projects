'use client'

import { Languages } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, toggleLanguage } = useLanguage()
  const nextLanguage = language === "id" ? "EN" : "ID"

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={language === "id" ? "Switch to English" : "Ganti ke bahasa Indonesia"}
      title={language === "id" ? "Switch to English" : "Ganti ke bahasa Indonesia"}
      className={`inline-flex items-center justify-center gap-2 border-2 border-border bg-main font-black text-main-foreground shadow-[3px_3px_0_var(--border)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_var(--border)] ${compact ? "size-10 p-0 text-xs" : "h-9 px-3 text-xs"}`}
    >
      <Languages className="size-4" aria-hidden="true" />
      <span>{nextLanguage}</span>
    </button>
  )
}
