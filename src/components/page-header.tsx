'use client'
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type PageHeaderProps = {
    title: string;
    description: string;
    accent?: string;
    icon?: LucideIcon; 
}

export default function PageHeader({ 
    title, 
    description, 
    accent = 'var(--chart-2)' 
}: PageHeaderProps) {
    
    return (
        <div 
            className="mx-auto my-4 w-[calc(100%-2rem)] max-w-5xl bg-secondary-background border-2 border-border border-l-8 rounded-base shadow-shadow" 
            style={{ borderLeftColor: accent }}
        >
            <div className="px-6 py-5 md:px-8">
                <Breadcrumb className="mb-4">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link href="/">
                                    Home
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                
                <h1 className="text-3xl font-black text-foreground md:text-4xl">{title}</h1>
                <p className="mt-1.5 text-sm font-medium text-foreground/70">
                    {description}
                </p>
            </div>
        </div>
    )
}