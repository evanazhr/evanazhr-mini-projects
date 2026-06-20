'use client'

import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import miniProjects from "@/data/mini-projects"

export default function Palindrom() {
    const [text, setText] = useState('')
    const [result, setResult] = useState<{ isPalindrom: boolean; message: string } | null>(null)
    const [pageHeaderData, setPageHeaderData] = useState(() => miniProjects.find(
        (project) => project.id === 'palindrom')
    )

    const handleSubmit = (e: { preventDefault: () => void }) => {
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

    return (
        <div 
            className="min-h-[100dvh] flex flex-col bg-background"
            style={{ '--page-accent': pageHeaderData?.accent || 'var(--nb-blue)' } as React.CSSProperties}
        >
            <main className="flex-1">
                {/* Page header */}
                <PageHeader
                    title={pageHeaderData?.title || ""}
                    description={pageHeaderData?.description || ""}
                    accent={pageHeaderData?.accent || ""}
                />

                {/* Main card */}
                <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                    <div className="mx-auto max-w-xl">
                        <div className="nb-card">
                            {/* Card header */}
                            <div className="nb-card-header bg-nb-yellow">
                                <h2 className="text-sm font-black uppercase tracking-widest text-nb-black">
                                    Masukkan Teks
                                </h2>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="text-input" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                                        Teks
                                    </label>
                                    <input
                                        id="text-input"
                                        type="text"
                                        value={text}
                                        onChange={(e) => {
                                            setText(e.target.value)
                                            setResult(null)
                                        }}
                                        placeholder="contoh: katak, radar, level..."
                                        required
                                        className="nb-input"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="nb-button"
                                >
                                    Cek Sekarang
                                </button>
                            </form>

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
                                    <p className="text-sm font-bold text-nb-black">{result.message}</p>
                                </div>
                            )}
                        </div>

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
