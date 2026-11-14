import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { en, type Language, type TranslationDictionary } from "@/i18n/translations"

export type { Language, TranslationDictionary }
export { en, translations } from "@/i18n/translations"

/**
 * Mengembalikan `value` dalam `language`. Teks sumber berbahasa Indonesia
 * dikembalikan apa adanya (fallback), sehingga menambah teks baru tidak
 * pernah merusak tampilan.
 *
 * Untuk text-node multi-baris (mis. kalimat di <p> yang dibungkus literal
 * newline di source), setiap baris diterjemahkan terpisah agar key tidak
 * perlu mencakup seluruh paragraf.
 */
export function translateValue(value: string, language: Language): string {
  if (language === "id") return value
  const lines = value.split("\n")
  return lines.map((line) => translateLine(line, language)).join("\n")
}

function translateLine(line: string, language: Language): string {
  const trimmed = line.trim()
  const translated = en[trimmed]
  return translated ? line.replace(trimmed, translated) : line
}

type LanguageState = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "id",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((state) => ({ language: state.language === "id" ? "en" : "id" })),
    }),
    { name: "mini-projects-language", storage: createJSONStorage(() => localStorage) }
  )
)
