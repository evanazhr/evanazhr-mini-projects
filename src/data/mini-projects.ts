import { Type } from "lucide-react"
import type { Project } from "@/types/project.type"

const miniProjects: Project[] = [
    {
        title: "Palindrom Checker",
        description: "Cek apakah sebuah kata atau kalimat merupakan palindrom.",
        category: "String",
        href: "/palindrom",
        accent: "#2196F3",
        icon: Type,
        // image: "/screenshots/palindrom.png",  // uncomment jika sudah ada screenshot
    },
]

export default miniProjects
