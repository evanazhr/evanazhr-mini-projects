import { Brain, Slash, Type, ListTodo, Key, Dices, QrCode, Globe, GitBranch, Receipt, Timer, SearchCode } from "lucide-react"
import type { LucideIcon } from "lucide-react"

/**
 * Metadata registry untuk setiap project.
 * Cukup tambahkan entry baru di sini saat bikin halaman baru.
 * Kalau halaman baru TIDAK didaftarkan di sini, akan tetap muncul
 * di home dengan fallback title/description/icon/category.
 */
export type ProjectMeta = {
    title: string
    description: string
    category: string
    accent: string
    icon?: LucideIcon
    image?: string
    /** Set true untuk sembunyikan dari list (misal: halaman WIP) */
    hidden?: boolean
}

const projectsMeta: Record<string, ProjectMeta> = {
    "palindrom": {
        title: "Palindrom Checker",
        description: "Cek apakah sebuah kata atau kalimat merupakan palindrom.",
        category: "String",
        accent: "#2196F3",
        icon: Type,
    },
    "interpolasi-linier": {
        title: "Interpolasi Linear Calculator",
        description: "Mencari nilai dari Interpolasi Linier dengan kalkulator interaktif.",
        category: "Math",
        accent: "#54c125",
        icon: Slash,
    },
    "todo-list": {
        title: "To-Do List",
        description: "Kelola daftar tugas harian Anda dengan mudah.",
        category: "Utility",
        accent: "#FF5252",
        icon: ListTodo,
    },
    "monoalphabetic-cipher": {
        title: "Monoalphabetic Cipher",
        description: "Enkripsi dan dekripsi teks menggunakan sandi substitusi monoalfabetik.",
        category: "Cryptography",
        accent: "#9C27B0",
        icon: Key,
    },
    "roll-dice": {
        title: "Roll Dice",
        description: "Simulasi melempar dadu dengan animasi interaktif dan riwayat lemparan.",
        category: "Game",
        accent: "#FF9800",
        icon: Dices,
    },
    "qr-code-generator": {
        title: "QR Code Generator",
        description: "Buat kode QR kustom dari URL atau teks dengan fitur unduh dan pratinjau.",
        category: "Utility",
        accent: "#00D696",
        icon: QrCode,
    },
    "brain-dump": {
        title: "Brain Dump",
        description: "Tuang semua yang ada di pikiranmu. Catatan otomatis terhapus sesuai waktu yang kamu atur.",
        category: "Utility",
        accent: "#FF5252",
        icon: Brain,
    },
    "http-status-explorer": {
        title: "HTTP Status Explorer",
        description: "Cari arti dan penggunaan kode status HTTP dengan cepat.",
        category: "Developer Tools",
        accent: "#2196F3",
        icon: Globe,
    },
    "git-cheat-sheet": {
        title: "Git Cheat Sheet",
        description: "Temukan command Git berdasarkan workflow dan salin dengan satu klik.",
        category: "Developer Tools",
        accent: "#FF9800",
        icon: GitBranch,
    },
    "expense-splitter": {
        title: "Expense Splitter",
        description: "Bagi tagihan bersama teman dan lihat siapa membayar atau menerima.",
        category: "Finance",
        accent: "#00D696",
        icon: Receipt,
    },
    "pomodoro": {
        title: "Pomodoro Timer",
        description: "Fokus dengan countdown kerja, waktu istirahat, alarm, dan riwayat sesi.",
        category: "Productivity",
        accent: "#FF5252",
        icon: Timer,
    },
    "regex-tester": {
        title: "Regex Tester",
        description: "Uji regular expression dan lihat match serta capture group secara langsung.",
        category: "Developer Tools",
        accent: "#9C27B0",
        icon: SearchCode,
    },
}

export default projectsMeta
