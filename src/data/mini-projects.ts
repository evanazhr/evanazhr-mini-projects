import { Slash, Type } from "lucide-react"
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
    }
]

export default miniProjects
