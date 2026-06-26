'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import QRCode from "qrcode"
import { 
  QrCode, 
  Download, 
  Copy, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Settings, 
  Sliders, 
  FileText,
  Info
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PageHeader from "@/components/page-header"

const FG_COLOR_PRESETS = [
  { name: "Hitam", hex: "#000000" },
  { name: "Biru", hex: "#7A83FF" },
  { name: "Merah", hex: "#FF4D50" },
  { name: "Hijau", hex: "#00D696" },
  { name: "Ungu", hex: "#9C27B0" },
]

const BG_COLOR_PRESETS = [
  { name: "Putih", hex: "#ffffff" },
  { name: "Kuning Pastel", hex: "#FFF9E6" },
  { name: "Biru Muda", hex: "#E8F0FE" },
  { name: "Transparan", hex: "#ffffff00" },
]

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState("https://github.com/evanazhr")
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [size, setSize] = useState("300")
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<"L" | "M" | "Q" | "H">("M")
  
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  // Generate QR Code on state change
  useEffect(() => {
    if (!inputText.trim()) {
      queueMicrotask(() => {
        setQrDataUrl("")
      })
      return
    }
    
    QRCode.toDataURL(inputText, {
      width: parseInt(size, 10),
      margin: 2,
      errorCorrectionLevel: errorCorrectionLevel,
      color: {
        dark: fgColor,
        light: bgColor,
      }
    })
      .then((url) => {
        setQrDataUrl(url)
        setErrorMessage("")
      })
      .catch((err) => {
        setErrorMessage(err.message || "Gagal membuat QR Code")
      })
  }, [inputText, fgColor, bgColor, size, errorCorrectionLevel])

  const handleDownload = () => {
    if (!qrDataUrl) return
    setDownloading(true)
    
    try {
      const link = document.createElement("a")
      link.href = qrDataUrl
      link.download = `qrcode-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (e) {
      console.error(e)
    } finally {
      setTimeout(() => setDownloading(false), 800)
    }
  }

  const handleCopyText = () => {
    if (!inputText) return
    navigator.clipboard.writeText(inputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setInputText("https://github.com/evanazhr")
    setFgColor("#000000")
    setBgColor("#ffffff")
    setSize("300")
    setErrorCorrectionLevel("M")
  }

  // Active status checks for preset colors
  const isFgPresetActive = (hex: string) => fgColor.toLowerCase() === hex.toLowerCase()
  const isBgPresetActive = (hex: string) => bgColor.toLowerCase() === hex.toLowerCase()

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern">
      <main className="flex-1">
        {/* Page header */}
        <PageHeader
          title="QR Code Generator"
          description="Buat kode QR kustom secara instan dan aman dari URL atau teks dengan pratinjau langsung."
          accent="var(--chart-4)"
        />

        <div className="mx-auto w-[calc(100%-2rem)] max-w-5xl py-8 ">
          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* ── Left column: Input and Customization ── */}
            <div className="flex flex-col gap-6 lg:col-span-2">
              
              {/* Input Card */}
              <Card className="bg-secondary-background border-2 border-border shadow-shadow">
                <CardContent className="p-6 flex flex-col gap-6">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-chart-4 text-black border-2 border-border font-bold text-xs uppercase tracking-widest rounded-base shadow-[2px_2px_0px_0px_var(--border)]">
                      <FileText className="size-3.5" />
                      <span>Input Data</span>
                    </div>
                    <span className="text-xs font-bold text-foreground/50">
                      URL atau Teks bebas
                    </span>
                  </div>

                  {/* Input Field */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="qr-input" className="text-sm font-black text-foreground">
                      Masukkan URL / Teks
                    </Label>
                    <div className="relative flex items-center">
                      <Input
                        id="qr-input"
                        type="text"
                        placeholder="Ketik tautan atau teks di sini..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="pr-10 h-12 bg-background font-medium text-sm border-2 border-border focus:ring-0"
                      />
                      {inputText && (
                        <button
                          onClick={handleCopyText}
                          title="Salin Input"
                          className="absolute right-3 p-1 text-foreground/60 hover:text-foreground transition-colors"
                        >
                          {copied ? <Check className="size-4 text-chart-4" /> : <Copy className="size-4" />}
                        </button>
                      )}
                    </div>
                    <p className="text-xs font-medium text-foreground/60">
                      Mendukung semua protokol URL standar (http, https, mailto, tel) atau teks paragraf bebas.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Customization Settings Card */}
              <Card className="bg-secondary-background border-2 border-border shadow-shadow">
                <CardContent className="p-6 flex flex-col gap-6">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-chart-2 text-white border-2 border-border font-bold text-xs uppercase tracking-widest rounded-base shadow-[2px_2px_0px_0px_var(--border)]">
                      <Settings className="size-3.5" />
                      <span>Pengaturan Desain</span>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    
                    {/* Foreground Color */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-black text-foreground">
                        Warna Utama (Foreground)
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {FG_COLOR_PRESETS.map((color) => (
                          <button
                            key={color.hex}
                            onClick={() => setFgColor(color.hex)}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                            className={`size-8 rounded-base border-2 border-border shadow-[1px_1px_0px_var(--border)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
                              isFgPresetActive(color.hex) 
                                ? "ring-2 ring-offset-2 ring-foreground scale-105" 
                                : ""
                            }`}
                          >
                            {isFgPresetActive(color.hex) && (
                              <Check 
                                className={`size-4 ${
                                  color.hex === "#ffffff" ? "text-black" : "text-white"
                                }`} 
                              />
                            )}
                          </button>
                        ))}
                        
                        {/* Custom Color Picker */}
                        <div className="relative size-8 rounded-base border-2 border-border bg-background shadow-[1px_1px_0px_var(--border)] flex items-center justify-center overflow-hidden cursor-pointer">
                          <input
                            type="color"
                            value={fgColor.startsWith("#ffffff00") ? "#000000" : fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="absolute inset-0 size-full opacity-0 cursor-pointer"
                            title="Kustom Warna"
                          />
                          <Sliders className="size-4 text-foreground/60 pointer-events-none" />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-foreground/50">
                        Warna saat ini: <code className="font-bold text-foreground">{fgColor}</code>
                      </p>
                    </div>

                    {/* Background Color */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-black text-foreground">
                        Latar Belakang (Background)
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {BG_COLOR_PRESETS.map((color) => (
                          <button
                            key={color.hex}
                            onClick={() => setBgColor(color.hex)}
                            style={{ 
                              backgroundColor: color.hex === "#ffffff00" ? "transparent" : color.hex,
                              backgroundImage: color.hex === "#ffffff00" 
                                ? "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)" 
                                : "none",
                              backgroundSize: "8px 8px",
                              backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0"
                            }}
                            title={color.name}
                            className={`size-8 rounded-base border-2 border-border shadow-[1px_1px_0px_var(--border)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
                              isBgPresetActive(color.hex) 
                                ? "ring-2 ring-offset-2 ring-foreground scale-105" 
                                : ""
                            }`}
                          >
                            {isBgPresetActive(color.hex) && (
                              <Check 
                                className={`size-4 ${
                                  color.hex === "#000000" ? "text-white" : "text-black"
                                }`} 
                              />
                            )}
                          </button>
                        ))}
                        
                        {/* Custom Color Picker */}
                        <div className="relative size-8 rounded-base border-2 border-border bg-background shadow-[1px_1px_0px_var(--border)] flex items-center justify-center overflow-hidden cursor-pointer">
                          <input
                            type="color"
                            value={bgColor.endsWith("00") ? "#ffffff" : bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="absolute inset-0 size-full opacity-0 cursor-pointer"
                            title="Kustom Warna Latar"
                          />
                          <Sliders className="size-4 text-foreground/60 pointer-events-none" />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-foreground/50">
                        Warna saat ini: <code className="font-bold text-foreground">{bgColor === "#ffffff00" ? "Transparan" : bgColor}</code>
                      </p>
                    </div>

                    {/* QR Code Size */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="qr-size" className="text-sm font-black text-foreground">
                        Ukuran Resolusi Gambar
                      </Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger id="qr-size" className="w-full bg-background border-2 border-border font-bold shadow-[2px_2px_0px_var(--border)] h-10">
                          <SelectValue placeholder="Pilih Ukuran" />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary-background border-2 border-border font-medium">
                          <SelectItem value="200" className="hover:bg-main/20">Kecil (200 x 200 px)</SelectItem>
                          <SelectItem value="300" className="hover:bg-main/20">Sedang (300 x 300 px)</SelectItem>
                          <SelectItem value="400" className="hover:bg-main/20">Besar (400 x 400 px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Error Correction Level */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-black text-foreground">
                        Tingkat Koreksi Kesalahan (ECL)
                      </Label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(["L", "M", "Q", "H"] as const).map((level) => {
                          const levelLabels = { L: "Rendah", M: "Sedang", Q: "Tinggi", H: "Sangat Tinggi" }
                          const active = errorCorrectionLevel === level
                          return (
                            <button
                              key={level}
                              type="button"
                              onClick={() => setErrorCorrectionLevel(level)}
                              className={`py-2 text-xs font-black rounded-base border-2 border-border shadow-[2px_2px_0px_var(--border)] active:translate-y-0 active:shadow-none transition-all cursor-pointer ${
                                active 
                                  ? "bg-main text-main-foreground -translate-y-0.5" 
                                  : "bg-background text-foreground hover:bg-foreground/5"
                              }`}
                              title={`${levelLabels[level]} (${level} - memulihkan hingga ${
                                level === "L" ? "7%" : level === "M" ? "15%" : level === "Q" ? "25%" : "30%"
                              } data rusak)`}
                            >
                              {level}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                  </div>
                  
                  {/* Warning on low contrast */}
                  <div className="flex items-start gap-2.5 bg-background border-2 border-border p-3.5 rounded-base">
                    <Info className="size-4 text-chart-5 shrink-0 mt-0.5" />
                    <div className="text-xs font-semibold text-foreground/80 leading-relaxed">
                      <span className="font-black text-foreground">Tips Kontras:</span> Pastikan warna utama (Foreground) jauh lebih gelap dibandingkan warna latar belakang (Background) agar kode QR dapat dipindai dengan mudah oleh kamera ponsel pintar.
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* ── Right column: Preview and Actions ── */}
            <div className="flex flex-col gap-6">
              
              {/* Preview Card */}
              <Card className="bg-secondary-background border-2 border-border shadow-shadow">
                <CardContent className="p-6 flex flex-col gap-6 items-center">
                  {/* Header Badge */}
                  <div className="w-full flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-chart-3 text-white border-2 border-border font-bold text-xs uppercase tracking-widest rounded-base shadow-[2px_2px_0px_0px_var(--border)]">
                      <Sparkles className="size-3.5 text-white" />
                      <span>Live Preview</span>
                    </div>
                  </div>

                  {/* QR Image Display */}
                  <div className="w-full aspect-square border-2 border-border bg-background rounded-base shadow-[4px_4px_0px_var(--border)] flex items-center justify-center p-6 relative overflow-hidden group">
                    
                    {/* Grid background placeholder for transparent QR codes */}
                    {bgColor === "#ffffff00" && (
                      <div 
                        className="absolute inset-0 size-full opacity-30 pointer-events-none"
                        style={{
                          backgroundImage: "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                          backgroundSize: "12px 12px",
                          backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0"
                        }}
                      />
                    )}

                    {qrDataUrl ? (
                      <Image
                        src={qrDataUrl}
                        alt="QR Code Preview"
                        width={parseInt(size, 10)}
                        height={parseInt(size, 10)}
                        unoptimized
                        className="max-h-full max-w-full object-contain relative z-10 select-none transition-transform duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-center text-foreground/40 p-4">
                        <QrCode className="size-16 stroke-[1] animate-pulse text-foreground/30" />
                        <div>
                          <p className="text-sm font-black text-foreground/60">Data Masih Kosong</p>
                          <p className="text-xs font-semibold text-foreground/40 mt-1">Ketik URL atau teks untuk melihat kode QR Anda di sini</p>
                        </div>
                      </div>
                    )}

                    {errorMessage && (
                      <div className="absolute inset-0 bg-red-500/90 text-white p-4 flex items-center justify-center text-center text-xs font-bold border-2 border-border rounded-base z-20">
                        {errorMessage}
                      </div>
                    )}
                  </div>

                  {/* Stats Info */}
                  <div className="w-full grid grid-cols-2 gap-2 text-center text-xs font-bold">
                    <div className="border-2 border-border bg-background p-2 rounded-base">
                      <p className="text-foreground/50 uppercase text-[9px] tracking-wider">Ukuran</p>
                      <p className="text-foreground mt-0.5">{size} x {size} px</p>
                    </div>
                    <div className="border-2 border-border bg-background p-2 rounded-base">
                      <p className="text-foreground/50 uppercase text-[9px] tracking-wider">Koreksi (ECL)</p>
                      <p className="text-foreground mt-0.5">{errorCorrectionLevel} (Level)</p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="w-full flex flex-col gap-3 pt-2">
                    {/* Download Button */}
                    <button
                      type="button"
                      disabled={!qrDataUrl}
                      onClick={handleDownload}
                      className={`w-full py-3 px-4 border-2 border-border font-black rounded-base shadow-shadow flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        qrDataUrl 
                          ? "bg-main text-main-foreground hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none active:translate-x-boxShadowX active:translate-y-boxShadowY active:shadow-none" 
                          : "bg-background text-foreground/40 border-border/50 shadow-none cursor-not-allowed"
                      }`}
                    >
                      <Download className={`size-4 ${downloading ? "animate-bounce" : ""}`} />
                      <span>{downloading ? "Mengunduh..." : "Unduh Gambar (PNG)"}</span>
                    </button>

                    {/* Reset Button */}
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full py-2.5 px-4 bg-background text-foreground border-2 border-border font-bold rounded-base shadow-[2px_2px_0px_var(--border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <RotateCcw className="size-4" />
                      <span>Atur Ulang Pengaturan</span>
                    </button>
                  </div>

                </CardContent>
              </Card>

            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
