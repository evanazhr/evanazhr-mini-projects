import type { LucideIcon } from "lucide-react"

export type Project = {
    title: string
    description: string
    category: string
    href: string
    accent: string
    /** Path ke gambar di /public. Jika tidak diisi, fallback ke icon. */
    image?: string
    /** Lucide icon sebagai fallback saat image tidak tersedia. */
    icon?: LucideIcon
}
