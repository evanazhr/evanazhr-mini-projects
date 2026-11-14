import type { Metadata } from "next"
import AboutContent from "./about-content"
import { getProjects } from "@/lib/get-projects"

export const metadata: Metadata = {
    title: "About",
    description: "Informasi tentang pengembang dan proyek portofolio mini ini",
}

export default function About() {
    const projects = getProjects()
    const categoryCount = new Set(projects.map((p) => p.category)).size

    return <AboutContent projectCount={projects.length} categoryCount={categoryCount} />
}
