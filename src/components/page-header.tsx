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
    accent = 'var(--nb-blue)' 
}: PageHeaderProps) {
    
    return (
        <div 
            className="border-b-[3px] border-nb-black" 
            style={{ backgroundColor: accent }}
        >
            <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 xl:px-16">
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
                
                <h1 className="text-3xl font-black text-white md:text-4xl">{title}</h1>
                <p className="mt-1.5 text-sm font-medium text-white/80">
                    {description}
                </p>
            </div>
        </div>
    )
}