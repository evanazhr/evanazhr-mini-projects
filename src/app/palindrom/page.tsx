'use client'

import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Palindrom() {
    const [text, setText] = useState('')
    const [result, setResult] = useState<{ isPalindrom: boolean; message: string } | null>(null)

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
        <div className="min-h-[100dvh] flex flex-col bg-[#fffef0]">
            <Navbar />

            <main className="flex-1">
                {/* Page header */}
                <div className="border-b-[3px] border-[#1a1a1a] bg-[#2196F3]">
                    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                        <Link
                            href="/"
                            className="mb-4 inline-flex items-center gap-1.5 border-[2px] border-white/60 px-3 py-1 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                        >
                            <ArrowLeft className="size-3.5" />
                            Kembali
                        </Link>
                        <h1 className="text-3xl font-black text-white md:text-4xl">Palindrom Checker</h1>
                        <p className="mt-1 text-sm font-medium text-white/80">
                            Cek apakah sebuah kata atau kalimat merupakan palindrom.
                        </p>
                    </div>
                </div>

                {/* Main card */}
                <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                    <div className="mx-auto max-w-xl">
                        <div className="border-[3px] border-[#1a1a1a] bg-white shadow-[6px_6px_0px_#1a1a1a]">
                            {/* Card header */}
                            <div className="border-b-[3px] border-[#1a1a1a] bg-[#FFEB3B] px-5 py-3">
                                <h2 className="text-sm font-black uppercase tracking-widest text-[#1a1a1a]">
                                    Masukkan Teks
                                </h2>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="text-input" className="text-xs font-bold uppercase tracking-wider text-[#555]">
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
                                        className="h-11 w-full border-[3px] border-[#1a1a1a] bg-[#fffef0] px-3 text-base font-medium text-[#1a1a1a] placeholder:text-[#aaa] outline-none focus:bg-white focus:shadow-[4px_4px_0px_#2196F3] transition-shadow duration-150"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="h-11 w-full border-[3px] border-[#1a1a1a] bg-[#1a1a1a] text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#FFEB3B] transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#FFEB3B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_#FFEB3B]"
                                >
                                    Cek Sekarang
                                </button>
                            </form>

                            {/* Result */}
                            {result && (
                                <div
                                    className={`mx-5 mb-5 flex items-start gap-3 border-[3px] border-[#1a1a1a] p-4 ${
                                        result.isPalindrom ? "bg-[#FFEB3B]" : "bg-[#FF5252]/10"
                                    }`}
                                >
                                    {result.isPalindrom ? (
                                        <CheckCircle className="mt-0.5 size-5 shrink-0 text-[#1a1a1a]" />
                                    ) : (
                                        <XCircle className="mt-0.5 size-5 shrink-0 text-[#FF5252]" />
                                    )}
                                    <p className="text-sm font-bold text-[#1a1a1a]">{result.message}</p>
                                </div>
                            )}
                        </div>

                        {/* Info box */}
                        <div className="mt-6 border-[3px] border-[#1a1a1a] bg-[#2196F3]/10 p-4 shadow-[4px_4px_0px_#1a1a1a]">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-2">Apa itu palindrom?</p>
                            <p className="text-sm font-medium text-[#555]" style={{ lineHeight: "1.6" }}>
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
