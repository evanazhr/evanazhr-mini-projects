'use client'
import { ArrowLeft, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"

type PageHeaderProps = {
    title: string;
    description: string;
    accent?: string;
    icon?: LucideIcon; 
}

export default function PageHeader({ 
    title, 
    description, 
    accent = 'var(--nb-blue)' 
}: PageHeaderProps) {
    
    return (
        <div 
            className="border-b-[3px] border-nb-black" 
            style={{ backgroundColor: accent }}
        >
            <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                <Button
                    asChild
                    variant="outline"
                    size="xs"
                    className="mb-4 text-white border-white/40 bg-transparent hover:bg-white/20 hover:text-white shadow-none hover:shadow-none active:shadow-none hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0"
                >
                    <Link href="/">
                        <ArrowLeft className="size-3.5" />
                        Kembali
                    </Link>
                </Button>
                <h1 className="text-3xl font-black text-white md:text-4xl">{title}</h1>
                <p className="mt-1 text-sm font-medium text-white/80">
                    {description}
                </p>
            </div>
        </div>
    )
}