'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Language = "id" | "en"

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

/** Shared translations for the shell and the small utility interfaces. */
export const translations: Record<string, string> = {
  "Home": "Beranda", "Beranda": "Home", "About": "Tentang", "Tentang": "About",
  "Projects": "Proyek", "Project": "Proyek", "Kategori": "Categories",
  "GitHub": "GitHub", "Search": "Cari", "Cari": "Search", "Search project...": "Cari project...", "Cari project...": "Search projects...", 
  "Lihat Project": "View project", "View project": "Lihat project", "Lihat source code": "View source code", "View source code": "Lihat source code",
  "Project, tools, dan utility": "Projects, tools, and utilities", "Projects, tools, and utilities": "Project, tools, dan utility",
  "Hal kecil yang": "Small things that", "bisa dipakai.": "you can use.", "Small things that": "Hal kecil yang", "you can use.": "bisa dipakai.",
  "Kumpulan mini project untuk belajar, bereksperimen, dan membantu menyelesaikan masalah sehari-hari.": "A collection of small projects for learning, experimenting, and solving everyday problems.",
  "A collection of small projects for learning, experimenting, and solving everyday problems.": "Kumpulan mini project untuk belajar, bereksperimen, dan membantu menyelesaikan masalah sehari-hari.",
  "by : evanazhr": "by : evanazhr",
  "Tampilkan": "Show", "Show": "Tampilkan", "project / halaman": "projects / page", "projects / page": "project / halaman",
  "Halaman": "Page", "Page": "Halaman", "dari": "of", "of": "dari",
  "Tidak ada project ditemukan": "No projects found", "No projects found": "Tidak ada project ditemukan",
  "Coba kata kunci atau kategori lain": "Try another keyword or category", "Try another keyword or category": "Coba kata kunci atau kategori lain",
  "Semua": "All", "All": "Semua", "Lainnya": "Other", "Other": "Lainnya",
  "Batal": "Cancel", "Cancel": "Batal", "Hapus": "Delete", "Delete": "Hapus", "Edit": "Edit", "Tambah": "Add", "Add": "Tambah",
  "Simpan": "Save", "Save": "Simpan", "Reset": "Reset", "Salin": "Copy", "Copy": "Salin", "Unduh": "Download", "Download": "Unduh",
  "Belum ada riwayat": "No history yet", "No history yet": "Belum ada riwayat", "Belum ada tugas harian": "No daily tasks yet", "No daily tasks yet": "Belum ada tugas harian",
  "Tugas Baru": "New task", "New task": "Tugas Baru", "Catatan": "Notes", "Notes": "Catatan", "Warna": "Color", "Color": "Warna",
  "Peserta": "People", "People": "Peserta", "Barang yang dibeli": "Purchased items", "Purchased items": "Barang yang dibeli",
  "Ringkasan pembayaran": "Payment summary", "Payment summary": "Ringkasan pembayaran", "Tambah barang": "Add item", "Add item": "Tambah barang",
  "Buat kode QR kustom secara instan dan aman dari URL atau teks dengan pratinjau langsung.": "Create a custom QR code from a URL or text with an instant preview.",
  "Create a custom QR code from a URL or text with an instant preview.": "Buat kode QR kustom secara instan dan aman dari URL atau teks dengan pratinjau langsung.",
  "Input Data": "Input data", "Input data": "Input Data", "Pengaturan Desain": "Design settings", "Design settings": "Pengaturan Desain",
  "Live Preview": "Live preview", "Live preview": "Live Preview", "Atur Ulang Pengaturan": "Reset settings", "Reset settings": "Atur Ulang Pengaturan",
  "Kembali ke beranda": "Back to home", "Back to home": "Kembali ke beranda", "Tentang Proyek": "About the project", "About the project": "Tentang Proyek",
  "Siapa Saya": "About me", "About me": "Siapa Saya", "Developer": "Developer", "Aktif": "Active", "Active": "Aktif",
  "Fokus & Pendekatan di website ini": "Focus and approach", "Focus and approach": "Fokus & Pendekatan di website ini",
  "Buka GitHub evanazhr": "Open evanazhr GitHub", "Open evanazhr GitHub": "Buka GitHub evanazhr",
  "Kumpulan tools kecil untuk belajar, bereksperimen, dan menyelesaikan masalah sehari-hari.": "Small tools for learning, experimenting, and solving everyday problems.",
  "Small tools for learning, experimenting, and solving everyday problems.": "Kumpulan tools kecil untuk belajar, bereksperimen, dan menyelesaikan masalah sehari-hari.",
  "Palindrom Checker": "Palindrome Checker", "Cek apakah sebuah kata atau kalimat merupakan palindrom.": "Check whether a word or sentence is a palindrome.", "Check whether a word or sentence is a palindrome.": "Cek apakah sebuah kata atau kalimat merupakan palindrom.",
  "Interpolasi Linear Calculator": "Linear Interpolation Calculator", "Mencari nilai dari Interpolasi Linier dengan kalkulator interaktif.": "Find values with an interactive linear interpolation calculator.", "Find values with an interactive linear interpolation calculator.": "Mencari nilai dari Interpolasi Linier dengan kalkulator interaktif.",
  "Kelola daftar tugas harian Anda dengan mudah.": "Manage your daily tasks with ease.", "Manage your daily tasks with ease.": "Kelola daftar tugas harian Anda dengan mudah.",
  "Enkripsi dan dekripsi teks menggunakan sandi substitusi monoalfabetik.": "Encrypt and decrypt text with a monoalphabetic substitution cipher.", "Encrypt and decrypt text with a monoalphabetic substitution cipher.": "Enkripsi dan dekripsi teks menggunakan sandi substitusi monoalfabetik.",
  "Simulasi melempar dadu dengan animasi interaktif dan riwayat lemparan.": "Simulate dice rolls with interactive animation and roll history.", "Simulate dice rolls with interactive animation and roll history.": "Simulasi melempar dadu dengan animasi interaktif dan riwayat lemparan.",
  "Buat kode QR kustom dari URL atau teks dengan fitur unduh dan pratinjau.": "Create custom QR codes from URLs or text with download and preview.", "Create custom QR codes from URLs or text with download and preview.": "Buat kode QR kustom dari URL atau teks dengan fitur unduh dan pratinjau.",
  "Tuang semua yang ada di pikiranmu. Catatan otomatis terhapus sesuai waktu yang kamu atur.": "Empty your mind. Notes are automatically deleted after the time you set.", "Empty your mind. Notes are automatically deleted after the time you set.": "Tuang semua yang ada di pikiranmu. Catatan otomatis terhapus sesuai waktu yang kamu atur.",
  "Cari arti dan penggunaan kode status HTTP dengan cepat.": "Quickly find the meaning and usage of HTTP status codes.", "Quickly find the meaning and usage of HTTP status codes.": "Cari arti dan penggunaan kode status HTTP dengan cepat.",
  "Temukan command Git berdasarkan workflow dan salin dengan satu klik.": "Find Git commands by workflow and copy them with one click.", "Find Git commands by workflow and copy them with one click.": "Temukan command Git berdasarkan workflow dan salin dengan satu klik.",
  "Bagi tagihan bersama teman dan lihat siapa membayar atau menerima.": "Split bills with friends and see who pays or receives money.", "Split bills with friends and see who pays or receives money.": "Bagi tagihan bersama teman dan lihat siapa membayar atau menerima.",
  "Fokus dengan countdown kerja, waktu istirahat, alarm, dan riwayat sesi.": "Focus with work countdowns, breaks, alarms, and session history.", "Focus with work countdowns, breaks, alarms, and session history.": "Fokus dengan countdown kerja, waktu istirahat, alarm, dan riwayat sesi.",
  "Uji regular expression dan lihat match serta capture group secara langsung.": "Test regular expressions and see matches and capture groups live.", "Test regular expressions and see matches and capture groups live.": "Uji regular expression dan lihat match serta capture group secara langsung.",
  "Developer Tools": "Developer Tools", "Finance": "Finance", "Productivity": "Productivity", "Cryptography": "Cryptography", "Game": "Game", "String": "String", "Math": "Math", "Utility": "Utility",
  "Kumpulan mini project interaktif yang dibuat oleh evanazhr untuk belajar dan bereksperimen.": "A collection of interactive mini projects by evanazhr for learning and experimentation.",
  "A collection of interactive mini projects by evanazhr for learning and experimentation.": "Kumpulan mini project interaktif yang dibuat oleh evanazhr untuk belajar dan bereksperimen.",
}

export function translateValue(value: string, language: Language) {
  if (language === "id") return value
  const trimmed = value.trim()
  const translated = translations[trimmed]
  if (!translated) return value
  return value.replace(trimmed, translated)
}

function translatePage(language: Language) {
  if (typeof document === "undefined") return
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let node: Node | null
  while ((node = walker.nextNode())) nodes.push(node as Text)
  nodes.forEach((textNode) => {
    if (textNode.parentElement?.closest("script,style,svg")) return
    const element = textNode.parentElement
    if (!element) return
    const original = element.dataset.originalText ?? textNode.textContent ?? ""
    element.dataset.originalText = original
    textNode.textContent = translateValue(original, language)
  })
  document.documentElement.lang = language
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider")
  return context
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id")
  const setLanguage = (next: Language) => {
    setLanguageState(next)
    window.localStorage.setItem("mini-projects-language", next)
  }
  const value = useMemo(() => ({ language, setLanguage, toggleLanguage: () => setLanguage(language === "id" ? "en" : "id") }), [language])

  useEffect(() => {
    const stored = window.localStorage.getItem("mini-projects-language") as Language | null
    if (stored === "en" || stored === "id") setLanguageState(stored)
  }, [])

  useEffect(() => {
    translatePage(language)
  }, [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
