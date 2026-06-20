'use client'
import { ArrowLeft, LucideIcon } from "lucide-react";
import Link from "next/link";

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
                <Link
                    href="/"
                    className="mb-4 inline-flex items-center gap-1.5 border-[2px] border-white/60 px-3 py-1 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                    <ArrowLeft className="size-3.5" />
                    Kembali
                </Link>
                <h1 className="text-3xl font-black text-white md:text-4xl">{title}</h1>
                <p className="mt-1 text-sm font-medium text-white/80">
                    {description}
                </p>
            </div>
        </div>
    )
}