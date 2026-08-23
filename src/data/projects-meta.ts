import { Brain, Slash, Type, ListTodo, Key, Dices, QrCode } from "lucide-react"
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
}

export default projectsMeta
