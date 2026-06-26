'use client'

import { CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import miniProjects from "@/data/mini-projects"

export default function Palindrom() {
    const [text, setText] = useState('')
    const [result, setResult] = useState<{ isPalindrom: boolean; message: string } | null>(null)
    const [pageHeaderData] = useState(() => 
        miniProjects.find((project) => project.id === 'palindrom')
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (text.trim() === "") return

        const normalized = text.toLowerCase().replace(/\s+/g, '')
        const isPalindrom = normalized === normalized.split("").reverse().join('')

        setResult({
            isPalindrom,
            message: isPalindrom
                ? `"${text}" adalah palindrom`
                : `"${text}" bukan palindrom`,
        })
    }

    const accentColor = pageHeaderData?.accent || 'var(--chart-2)'

    return (
        <div 
            className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern"
            style={{ '--page-accent': accentColor } as React.CSSProperties}
        >
            <main className="flex-1">
                {/* Page header */}
                <PageHeader
                    title={pageHeaderData?.title || "Palindrom Checker"}
                    description={pageHeaderData?.description || ""}
                    accent={accentColor}
                />

                {/* Main Content */}
                <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                    <div className="mx-auto max-w-xl">
                        <Card className="mb-8 p-0 overflow-hidden border-2 border-border shadow-shadow bg-secondary-background">
                            {/* Card header */}
                            <CardHeader className="bg-main border-b-2 border-border text-main-foreground px-5 py-3">
                                <CardTitle className="text-main-foreground text-sm font-black uppercase tracking-widest">
                                    Masukkan Teks
                                </CardTitle>
                            </CardHeader>

                            {/* Form */}
                            <CardContent className="p-5">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <Label htmlFor="text-input" className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                                            Teks
                                        </Label>
                                        <Input
                                            id="text-input"
                                            type="text"
                                            value={text}
                                            onChange={(e) => {
                                                setText(e.target.value)
                                                setResult(null)
                                            }}
                                            placeholder="contoh: katak, radar, level..."
                                            required
                                            className="bg-background text-foreground"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full font-bold"
                                    >
                                        Cek Sekarang
                                    </Button>
                                </form>
                            </CardContent>

                            {/* Result */}
                            {result && (
                                <div
                                    className={`flex items-start gap-3 p-4 mx-5 mb-5 border-2 border-border rounded-base shadow-shadow ${
                                        result.isPalindrom ? "bg-main text-main-foreground" : "bg-chart-3/20 text-foreground"
                                    }`}
                                >
                                    {result.isPalindrom ? (
                                        <CheckCircle className="mt-0.5 size-5 shrink-0 text-main-foreground" />
                                    ) : (
                                        <XCircle className="mt-0.5 size-5 shrink-0 text-chart-3" />
                                    )}
                                    <p className="text-sm font-bold break-all flex-1 min-w-0">{result.message}</p>
                                </div>
                            )}
                        </Card>

                        {/* Info box */}
                        <div className="flex flex-col gap-2 p-4 mt-6 border-2 border-border bg-secondary-background rounded-base shadow-shadow">
                            <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">Apa itu palindrom?</p>
                            <p className="text-sm font-medium text-foreground/80 leading-relaxed">
                                Palindrom adalah kata atau kalimat yang jika dibaca dari depan dan belakang menghasilkan urutan yang sama.
                                Contoh: <strong>katak</strong>, <strong>radar</strong>, <strong>level</strong>.
                                Pengecekan mengabaikan huruf kapital dan spasi.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

