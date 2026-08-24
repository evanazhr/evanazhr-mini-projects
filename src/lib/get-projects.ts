import fs from "fs"
import path from "path"
import projectsMeta from "@/data/projects-meta"
import type { Project } from "@/types/project.type"

/** 
 * Slug yang dikecualikan dari list (bukan project page).
 * Tambah di sini kalau ada route baru yang bukan mini-project.
 */
const EXCLUDED_SLUGS = new Set(["about", "api"])

/**
 * Auto-discover semua project dari folder src/app/.
 * Setiap subfolder yang punya page.tsx dianggap sebagai project.
 * Metadata diambil dari projects-meta.ts, fallback ke nilai default
 * kalau slug belum terdaftar.
 */
export function getProjects(): Project[] {
    const appDir = path.join(process.cwd(), "src", "app")

    const slugs = fs
        .readdirSync(appDir, { withFileTypes: true })
        .filter((entry) => {
            if (!entry.isDirectory()) return false
            if (entry.name.startsWith("_") || entry.name.startsWith(".")) return false
            if (EXCLUDED_SLUGS.has(entry.name)) return false

            // Hanya masukkan folder yang punya page.tsx / page.jsx / page.js
            const hasPage = ["page.tsx", "page.jsx", "page.js"].some((f) =>
                fs.existsSync(path.join(appDir, entry.name, f))
            )
            return hasPage
        })
        .map((entry) => entry.name)

    return slugs.map((slug): Project => {
        const meta = projectsMeta[slug]

        // Format slug jadi judul yang lebih manusiawi sebagai fallback
        const fallbackTitle = slug
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")

        return {
            id: slug,
            title: meta?.title ?? fallbackTitle,
            description: meta?.description ?? `Mini project: ${fallbackTitle}`,
            category: meta?.category ?? "Lainnya",
            href: `/${slug}`,
            accent: meta?.accent ?? "#7A83FF",
            // icon tidak di-include di sini — React components tidak bisa
            // di-serialize melewati server→client boundary.
            // ProjectCard me-resolve icon langsung dari projects-meta berdasarkan id/slug.
            image: meta?.image,
            hidden: meta?.hidden ?? false,
        }
    }).filter((p) => !p.hidden)
}
