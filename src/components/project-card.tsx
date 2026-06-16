import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/types/project.type"

type Props = {
    project: Project
}

export default function ProjectCard({ project }: Props) {
    const { title, description, category, href, accent, image, icon: Icon } = project

    return (
        <article className="group flex flex-col border-[3px] border-[#1a1a1a] bg-white shadow-[5px_5px_0px_#1a1a1a] transition-all duration-150 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0px_#1a1a1a]">
            {/* Thumbnail / Icon fallback */}
            <div
                className="relative aspect-video w-full overflow-hidden border-b-[3px] border-[#1a1a1a] flex items-center justify-center"
                style={{ backgroundColor: accent + "22" }}
            >
                {image ? (
                    <Image
                        src={image}
                        alt={`Screenshot ${title}`}
                        fill
                        className="object-cover"
                    />
                ) : Icon ? (
                    <div
                        className="flex flex-col items-center justify-center gap-2"
                    >
                        <div
                            className="border-[3px] border-[#1a1a1a] p-4 shadow-[4px_4px_0px_#1a1a1a]"
                            style={{ backgroundColor: accent }}
                        >
                            <Icon className="size-10 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                ) : null}

                {/* bottom accent stripe */}
                <div
                    className="absolute bottom-0 left-0 h-1.5 w-full"
                    style={{ backgroundColor: accent }}
                />
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-3 p-4">
                {/* category badge */}
                <span
                    className="self-start border-[2px] border-[#1a1a1a] px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: accent }}
                >
                    {category}
                </span>

                <h2 className="text-lg font-black leading-snug text-[#1a1a1a]">
                    {title}
                </h2>

                <p className="flex-1 text-sm font-medium text-[#555]" style={{ lineHeight: "1.6" }}>
                    {description}
                </p>

                <Link
                    href={href}
                    className="mt-2 inline-flex items-center gap-1.5 self-start border-[2px] border-[#1a1a1a] bg-[#1a1a1a] px-3 py-1.5 text-sm font-bold text-white shadow-[3px_3px_0px_#FFEB3B] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0px_#FFEB3B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#FFEB3B]"
                >
                    Lihat Project
                    <ArrowRight className="size-3.5" />
                </Link>
            </div>
        </article>
    )
}
