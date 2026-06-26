import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project.type"

type Props = {
    project: Project
}

export default function ProjectCard({ project }: Props) {
    const { title, description, category, href, accent, image, icon: Icon } = project

    return (
        <Card className="bg-secondary-background border-2 border-border shadow-shadow overflow-hidden p-0">
            {/* Thumbnail / Icon fallback */}
            <CardHeader className="p-0">
                <div
                    className="relative aspect-video w-full overflow-hidden border-b-2 border-border flex items-center justify-center"
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
                                className="border-2 border-border p-4 shadow-shadow"
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
            </CardHeader>

            {/* Body */}
            <CardContent className="flex flex-1 flex-col gap-3 p-5">
                {/* category badge */}
                <span
                    className="self-start border-2 border-border px-2 py-0.5 text-xs font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: accent }}
                >
                    {category}
                </span>

                <h2 className="text-lg font-black leading-snug text-foreground">
                    {title}
                </h2>

                <p className="flex-1 text-sm font-medium text-foreground/70" style={{ lineHeight: "1.6" }}>
                    {description}
                </p>

                <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="mt-2 self-start font-bold"
                >
                    <Link href={href}>
                        Lihat Project
                        <ArrowRight className="size-3.5" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}

