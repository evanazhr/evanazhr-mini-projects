'use client'

import { useEffect, type ReactNode } from "react"
import { useLanguageStore, translateValue } from "@/stores/language-store"

export type { Language } from "@/stores/language-store"
export { translateValue, translations } from "@/stores/language-store"

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "SVG", "NOSCRIPT", "CODE", "PRE"])

/**
 * State per text-node: `source` = teks asli (Indonesia), `applied` = nilai
 * terakhir yang kita tulis ke DOM (null bila belum pernah menerjemahkan).
 * WeakMap dipakai agar entri otomatis hilang saat node di-unmount oleh React.
 *
 * PENTING: kalau kita hanya menyimpan `source`, teks dinamis (timer, counter)
 * akan "dikembalikan" ke nilai basi setiap render — teksnya flip-flop. Karena
 * itu kita deteksi perubahan dari luar (React): bila isi node bukan `source`
 * dan bukan `applied`, berarti itu sumber baru.
 */
const nodeState = new WeakMap<Text, { source: string; applied: string | null }>()

function translateNode(node: Text, language: "id" | "en") {
  const current = node.textContent ?? ""
  let entry = nodeState.get(node)

  if (!entry || (current !== entry.source && current !== entry.applied)) {
    // Pertama kali bertemu, atau React menulis konten baru ke node ini.
    entry = { source: current, applied: null }
    nodeState.set(node, entry)
  }

  const next = language === "id" ? entry.source : translateValue(entry.source, language)
  if (current !== next) node.textContent = next
  entry.applied = next
}

const TRANSLATABLE_ATTRS = ["placeholder", "aria-label", "title", "alt"] as const
const attrState = new WeakMap<Element, Map<string, { source: string; applied: string | null }>>()

function translateAttribute(el: Element, attr: string, language: "id" | "en") {
  const current = el.getAttribute(attr)
  if (!current) return
  let map = attrState.get(el)
  if (!map) {
    map = new Map()
    attrState.set(el, map)
  }
  let entry = map.get(attr)
  if (!entry || (current !== entry.source && current !== entry.applied)) {
    entry = { source: current, applied: null }
    map.set(attr, entry)
  }
  const next = language === "id" ? entry.source : translateValue(entry.source, language)
  if (current !== next) el.setAttribute(attr, next)
  entry.applied = next
}

function translateDocument(language: "id" | "en") {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let node: Node | null
  while ((node = walker.nextNode())) nodes.push(node as Text)
  for (const textNode of nodes) {
    const parent = textNode.parentElement
    if (!parent || SKIP_TAGS.has(parent.tagName)) continue
    translateNode(textNode, language)
  }
  for (const el of document.querySelectorAll(TRANSLATABLE_ATTRS.map((a) => `[${a}]`).join(","))) {
    for (const attr of TRANSLATABLE_ATTRS) translateAttribute(el, attr, language)
  }
  if (document.documentElement.lang !== language) document.documentElement.lang = language
}

export function useLanguage() {
  const language = useLanguageStore((state) => state.language)
  const setLanguage = useLanguageStore((state) => state.setLanguage)
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage)
  return { language, setLanguage, toggleLanguage }
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useLanguageStore((state) => state.language)

  useEffect(() => {
    // translateDocument bersifat idempoten: ia hanya menulis ulang text-node
    // yang nilainya berbeda, jadi aman dipicu berkali-kali tanpa loop.
    const apply = () => translateDocument(language)
    apply()

    // React me-render ulang teks sumber (Indonesia) setiap kali state berubah,
    // sehingga terjemahan harus diterapkan kembali pada setiap mutasi DOM.
    let raf = 0
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(apply)
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...TRANSLATABLE_ATTRS],
    })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [language])

  return <>{children}</>
}
