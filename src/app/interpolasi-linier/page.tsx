'use client'

import Link from "next/link"
import { Calculator } from "lucide-react"
import { useState } from "react"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import miniProjects from "@/data/mini-projects"

export default function InterpolasiLinier() {
    const [pageHeaderData] = useState(() =>
        miniProjects.find((project) => project.id === 'interpolasi-linier')
    )

    const [x0, setX0] = useState<string>("")
    const [fx0, setFx0] = useState<string>("")
    const [x1, setX1] = useState<string>("")
    const [fx1, setFx1] = useState<string>("")
    const [x, setX] = useState<string>("")
    const [f1x, setF1x] = useState<number | null>(null)

    const interpolasiLinier = () => {
        if (x0 === "" || fx0 === "" || x1 === "" || fx1 === "" || x === "") {
            alert("Semua input harus diisi!")
            return
        }

        const valX0 = Number(x0)
        const valFx0 = Number(fx0)
        const valX1 = Number(x1)
        const valFx1 = Number(fx1)
        const valX = Number(x)

        if (isNaN(valX0) || isNaN(valFx0) || isNaN(valX1) || isNaN(valFx1) || isNaN(valX)) {
            alert("Semua input harus berupa angka yang valid!")
            return
        }

        if (valX1 === valX0) {
            alert("Nilai x1 tidak boleh sama dengan x0 untuk menghindari pembagian dengan nol.")
            return
        }

        const minX = Math.min(valX0, valX1)
        const maxX = Math.max(valX0, valX1)

        if (valX < minX) {
            alert(`Nilai X tidak boleh lebih kecil dari ${minX}`)
            return
        }

        if (valX > maxX) {
            alert(`Nilai X tidak boleh lebih besar dari ${maxX}`)
            return
        }

        const hitung = valFx0 + ((valFx1 - valFx0) / (valX1 - valX0)) * (valX - valX0)

        setF1x(hitung)
    }

    const resetFields = () => {
        setX0("")
        setFx0("")
        setX1("")
        setFx1("")
        setX("")
        setF1x(null)
    }

    const accentColor = pageHeaderData?.accent || '#54c125'

    return (
        <div 
            className="min-h-[100dvh] flex flex-col bg-background"
            style={{ '--page-accent': accentColor } as React.CSSProperties}
        >
            <main className="flex-1">
                {/* Page header */}
                <PageHeader
                    title={pageHeaderData?.title || "Interpolasi Linear Calculator"}
                    description={pageHeaderData?.description || ""}
                    accent={accentColor}
                />

                {/* Main Content */}
                <div className="mx-auto max-w-5xl px-4 py-10 md:px-8 xl:px-16">
                    <div className="mx-auto max-w-xl">
                        <Card>
                            {/* Card header */}
                            <CardHeader className="bg-[#54c125]" style={{ backgroundColor: 'var(--page-accent)' }}>
                                <CardTitle className="text-white">
                                    Masukkan Koordinat &amp; Titik X
                                </CardTitle>
                            </CardHeader>

                            {/* Card Content Form */}
                            <CardContent className="p-5 flex flex-col gap-4">
                                {/* Grid for x0 & f(x0) */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="x0" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                                            Titik x₀
                                        </label>
                                        <Input
                                            id="x0"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="contoh: 1"
                                            value={x0}
                                            onChange={(e) => {
                                                setX0(e.target.value)
                                                setF1x(null)
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="fx0" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                                            Nilai f(x₀)
                                        </label>
                                        <Input
                                            id="fx0"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="contoh: 2"
                                            value={fx0}
                                            onChange={(e) => {
                                                setFx0(e.target.value)
                                                setF1x(null)
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Grid for x1 & f(x1) */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="x1" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                                            Titik x₁
                                        </label>
                                        <Input
                                            id="x1"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="contoh: 3"
                                            value={x1}
                                            onChange={(e) => {
                                                setX1(e.target.value)
                                                setF1x(null)
                                            }}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="fx1" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                                            Nilai f(x₁)
                                        </label>
                                        <Input
                                            id="fx1"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="contoh: 6"
                                            value={fx1}
                                            onChange={(e) => {
                                                setFx1(e.target.value)
                                                setF1x(null)
                                            }}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Input for x */}
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="x" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                                        Nilai x (yang dicari)
                                    </label>
                                    <Input
                                        id="x"
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="contoh: 2 (harus di antara x₀ dan x₁)"
                                        value={x}
                                        onChange={(e) => {
                                            setX(e.target.value)
                                            setF1x(null)
                                        }}
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3 mt-2">
                                    <Button
                                        type="button"
                                        onClick={interpolasiLinier}
                                        className="flex-1"
                                        style={{ '--button-shadow': 'var(--page-accent)' } as React.CSSProperties}
                                    >
                                        Hitung
                                    </Button>
                                    {(x0 || fx0 || x1 || fx1 || x) && (
                                        <Button
                                            type="button"
                                            onClick={resetFields}
                                            variant="outline"
                                            className="w-auto px-5"
                                        >
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </CardContent>

                            {/* Result display */}
                            {f1x !== null && (
                                <div 
                                    className="nb-result-box mx-5 mb-5 bg-nb-yellow"
                                    style={{ backgroundColor: 'color-mix(in srgb, var(--page-accent) 15%, var(--nb-yellow) 85%)' }}
                                >
                                    <Calculator className="mt-0.5 size-5 shrink-0 text-nb-black" />
                                    <div className="flex-1 min-w-0 break-words">
                                        <p className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                                            Hasil Interpolasi Linier
                                        </p>
                                        <p className="text-lg font-black text-nb-black mt-1">
                                            f₁({x}) = {f1x}
                                        </p>
                                        <p className="text-xs text-nb-gray mt-1 leading-relaxed">
                                            Formula: f({x}) = {fx0} + (({fx1} - {fx0}) / ({x1} - {x0})) * ({x} - {x0})
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Info box */}
                        <div className="nb-info-box mt-6">
                            <p className="text-xs font-bold uppercase tracking-wider text-nb-black mb-2">
                                Apa itu Interpolasi Linear?
                            </p>
                            <p className="text-sm font-medium text-nb-gray" style={{ lineHeight: "1.6" }}>
                                Interpolasi linear adalah metode untuk menentukan nilai di antara dua titik data yang diketahui secara linier.
                                Metode ini mengasumsikan hubungan antara kedua titik tersebut membentuk garis lurus.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}