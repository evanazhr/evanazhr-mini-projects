import Link from "next/link"
import { ArrowLeft, Code2, Layers, Wrench } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import miniProjects from "@/data/mini-projects"

const skills = ["TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js"]

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/evanazhr",
        icon: FaGithub,
        description: "@evanazhr",
    },
]

export default function About() {
    return (
        <div className="min-h-[100dvh] flex flex-col bg-[#fffef0]">
            <Navbar />

            <main className="flex-1">
                {/* Page header */}
                <div className="border-b-[3px] border-[#1a1a1a] bg-[#FFEB3B]">
                    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                        <Link
                            href="/"
                            className="mb-5 inline-flex items-center gap-1.5 border-[2px] border-[#1a1a1a] bg-white px-3 py-1 text-sm font-semibold text-[#1a1a1a] shadow-[3px_3px_0px_#1a1a1a] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#1a1a1a] transition-all duration-150"
                        >
                            <ArrowLeft className="size-3.5" />
                            Kembali
                        </Link>
                        <h1 className="text-[clamp(2rem,4vw,3rem)] font-black leading-none tracking-tight text-[#1a1a1a]">
                            About
                        </h1>
                        <p className="mt-2 text-sm font-medium text-[#555]">
                            Tentang saya dan project ini
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* ── Left column ── */}
                        <div className="flex flex-col gap-6 lg:col-span-2">

                            {/* Bio card */}
                            <div className="border-[3px] border-[#1a1a1a] bg-white shadow-[5px_5px_0px_#1a1a1a]">
                                <div className="border-b-[3px] border-[#1a1a1a] bg-[#FF5252] px-5 py-3 flex items-center gap-2">
                                    <Code2 className="size-4 text-white" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                        Siapa Saya
                                    </h2>
                                </div>
                                <div className="p-5 flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="size-16 border-[3px] border-[#1a1a1a] bg-[#FFEB3B] flex items-center justify-center shadow-[4px_4px_0px_#1a1a1a] shrink-0">
                                            <span className="text-2xl font-black text-[#1a1a1a]">E</span>
                                        </div>
                                        <div>
                                            <p className="text-xl font-black text-[#1a1a1a]">evanazhr</p>
                                            <p className="text-sm font-medium text-[#555]">Web Developer</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-[#555]" style={{ lineHeight: "1.7" }}>
                                        Halo! Saya seorang web developer yang suka belajar dengan cara membuat
                                        mini project kecil. Setiap project di sini dibuat untuk mengeksplorasi
                                        satu konsep atau teknik tertentu secara langsung.
                                    </p>
                                </div>
                            </div>

                            {/* About this project */}
                            <div className="border-[3px] border-[#1a1a1a] bg-white shadow-[5px_5px_0px_#1a1a1a]">
                                <div className="border-b-[3px] border-[#1a1a1a] bg-[#2196F3] px-5 py-3 flex items-center gap-2">
                                    <Layers className="size-4 text-white" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                        Tentang Project Ini
                                    </h2>
                                </div>
                                <div className="p-5 flex flex-col gap-3">
                                    <p className="text-sm font-medium text-[#555]" style={{ lineHeight: "1.7" }}>
                                        Halaman ini adalah kumpulan mini project yang saya buat sebagai sarana
                                        belajar. Setiap project berdiri sendiri, fokus pada satu fitur atau
                                        konsep, dan bisa langsung dicoba.
                                    </p>
                                    <div className="border-[2px] border-[#1a1a1a] bg-[#fffef0] p-3 flex items-center justify-between">
                                        <span className="text-sm font-semibold text-[#1a1a1a]">Total Projects</span>
                                        <span className="text-2xl font-black text-[#1a1a1a]">{miniProjects.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Right column ── */}
                        <div className="flex flex-col gap-6">

                            {/* Stack / skills */}
                            <div className="border-[3px] border-[#1a1a1a] bg-white shadow-[5px_5px_0px_#1a1a1a]">
                                <div className="border-b-[3px] border-[#1a1a1a] bg-[#FFEB3B] px-5 py-3 flex items-center gap-2">
                                    <Wrench className="size-4 text-[#1a1a1a]" />
                                    <h2 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a]">
                                        Tech Stack
                                    </h2>
                                </div>
                                <div className="p-4 flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="border-[2px] border-[#1a1a1a] bg-[#fffef0] px-2.5 py-1 text-xs font-bold text-[#1a1a1a] shadow-[2px_2px_0px_#1a1a1a]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Social / GitHub */}
                            <div className="border-[3px] border-[#1a1a1a] bg-white shadow-[5px_5px_0px_#1a1a1a]">
                                <div className="border-b-[3px] border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">
                                        Links
                                    </h2>
                                </div>
                                <div className="p-4 flex flex-col gap-3">
                                    {socialLinks.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 border-[2px] border-[#1a1a1a] bg-[#fffef0] px-3 py-2.5 shadow-[3px_3px_0px_#1a1a1a] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#1a1a1a] transition-all duration-150"
                                        >
                                            <div className="border-[2px] border-[#1a1a1a] bg-[#1a1a1a] p-1.5">
                                                <link.icon className="size-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-[#1a1a1a]">{link.label}</p>
                                                <p className="text-xs font-medium text-[#555]">{link.description}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
