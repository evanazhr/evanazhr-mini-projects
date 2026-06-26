import { Slash, Type, ListTodo, Key, Dices, QrCode } from "lucide-react"
import type { Project } from "@/types/project.type"

const miniProjects: Project[] = [
    {
        id: "palindrom",
        title: "Palindrom Checker",
        description: "Cek apakah sebuah kata atau kalimat merupakan palindrom.",
        category: "String",
        href: "/palindrom",
        accent: "#2196F3",
        icon: Type,
        // image: "/screenshots/palindrom.png",  // uncomment jika sudah ada screenshot
    },
    {
        id : "interpolasi-linier",
        title: "Interpolasi Linear Calculator",
        description: "Mencari nilai dari Interpolasi Linier.",
        category: "Math",
        href: "/interpolasi-linier",
        accent: "#54c125",
        icon: Slash,
        // image: "/screenshots/palindrom.png",  // uncomment jika sudah ada screenshot
    },
    {
        id: "todo-list",
        title: "To-Do List",
        description: "Kelola daftar tugas harian Anda dengan mudah.",
        category: "Utility",
        href: "/todo-list",
        accent: "#FF5252",
        icon: ListTodo,
    },
    {
        id: "monoalphabetic-cipher",
        title: "Monoalphabetic Cipher",
        description: "Enkripsi dan dekripsi teks menggunakan sandi substitusi monoalfabetik.",
        category: "Cryptography",
        href: "/monoalphabetic-cipher",
        accent: "#9C27B0",
        icon: Key,
    },
    {
        id: "roll-dice",
        title: "Roll Dice",
        description: "Simulasi melempar dadu dengan animasi interaktif dan riwayat lemparan.",
        category: "Game",
        href: "/roll-dice",
        accent: "#FF9800",
        icon: Dices,
    },
    {
        id: "qr-code-generator",
        title: "QR Code Generator",
        description: "Buat kode QR kustom dari URL atau teks dengan fitur unduh dan pratinjau.",
        category: "Utility",
        href: "/qr-code-generator",
        accent: "#00D696",
        icon: QrCode,
    }
]

export default miniProjects
