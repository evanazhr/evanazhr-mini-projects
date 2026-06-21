'use client'

import Link from "next/link"
import { CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

    const accentColor = pageHeaderData?.accent || 'var(--nb-blue)'

    return (
        <div 
            className="min-h-[100dvh] flex flex-col bg-background"
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
                        <Card className="mb-8">
                            {/* Card header */}
                            <CardHeader className="bg-nb-yellow">
                                <CardTitle className="text-nb-black">
                                    Masukkan Teks
                                </CardTitle>
                            </CardHeader>

                            {/* Form */}
                            <CardContent className="p-5">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="text-input" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                                            Teks
                                        </label>
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
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        style={{ '--button-shadow': 'var(--nb-yellow)' } as React.CSSProperties}
                                    >
                                        Cek Sekarang
                                    </Button>
                                </form>
                            </CardContent>

                            {/* Result */}
                            {result && (
                                <div
                                    className={`nb-result-box mx-5 mb-5 ${
                                        result.isPalindrom ? "bg-nb-yellow" : "bg-nb-red/10"
                                    }`}
                                >
                                    {result.isPalindrom ? (
                                        <CheckCircle className="mt-0.5 size-5 shrink-0 text-nb-black" />
                                    ) : (
                                        <XCircle className="mt-0.5 size-5 shrink-0 text-nb-red" />
                                    )}
                                    <p className="text-sm font-bold text-nb-black break-all flex-1 min-w-0">{result.message}</p>
                                </div>
                            )}
                        </Card>

                        {/* Info box */}
                        <div className="nb-info-box mt-6">
                            <p className="text-xs font-bold uppercase tracking-wider text-nb-black mb-2">Apa itu palindrom?</p>
                            <p className="text-sm font-medium text-nb-gray" style={{ lineHeight: "1.6" }}>
                                Palindrom adalah kata atau kalimat yang jika dibaca dari depan dan belakang menghasilkan urutan yang sama.
                                Contoh: <strong>katak</strong>, <strong>radar</strong>, <strong>level</strong>.
                                Pengecekan mengabaikan huruf kapital dan spasi.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
