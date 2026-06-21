'use client'

import { useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Key, ArrowRight, Copy, Check, Shuffle, AlertCircle } from "lucide-react"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import miniProjects from "@/data/mini-projects"

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export default function MonoalphabeticCipher() {
  const [keyword, setKeyword] = useState("")
  const [cipherKey, setCipherKey] = useState(ALPHABET)
  const [inputText, setInputText] = useState("")
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")
  const [copied, setCopied] = useState(false)

  const [pageHeaderData] = useState(() =>
    miniProjects.find((project) => project.id === 'monoalphabetic-cipher')
  )

  // Generate key dynamically from keyword
  useEffect(() => {
    if (keyword.trim() === "") {
      setCipherKey(ALPHABET)
      return
    }

    const normalized = keyword.toUpperCase().replace(/[^A-Z]/g, "")
    const uniqueChars = Array.from(new Set(normalized))
    const combined = [...uniqueChars, ...ALPHABET.split("")]
    const finalKey = Array.from(new Set(combined)).slice(0, 26).join("")
    
    setCipherKey(finalKey)
  }, [keyword])

  // Randomize key permutation
  const handleRandomizeKey = () => {
    const arr = ALPHABET.split("")
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setCipherKey(arr.join(""))
    setKeyword("") // Clear keyword input since it's now a random shuffle
  }

  // Live encryption / decryption logic
  const outputText = useMemo(() => {
    if (!inputText) return ""
    
    const result: string[] = []
    const keySource = mode === "encrypt" ? ALPHABET : cipherKey
    const keyTarget = mode === "encrypt" ? cipherKey : ALPHABET

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i]
      const upperChar = char.toUpperCase()
      const index = keySource.indexOf(upperChar)

      if (index !== -1) {
        const substituted = keyTarget[index]
        const isLowercase = char === char.toLowerCase() && char !== char.toUpperCase()
        result.push(isLowercase ? substituted.toLowerCase() : substituted)
      } else {
        result.push(char)
      }
    }
    return result.join("")
  }, [inputText, cipherKey, mode])

  // Copy to clipboard helper
  const handleCopyToClipboard = () => {
    if (!outputText) return
    navigator.clipboard.writeText(outputText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const accentColor = pageHeaderData?.accent || '#9C27B0'

  return (
    <div 
      className="min-h-[100dvh] flex flex-col bg-background"
      style={{ '--page-accent': accentColor } as React.CSSProperties}
    >
      <main className="flex-1">
        {/* Page header */}
        <PageHeader
          title={pageHeaderData?.title || "Monoalphabetic Cipher"}
          description={pageHeaderData?.description || "Enkripsi dan dekripsi teks menggunakan sandi substitusi monoalfabetik."}
          accent={accentColor}
        />

        {/* Main Content */}
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 xl:px-16">
          <div className="flex flex-col gap-8">
            
            {/* Card 1: Key configuration */}
            <Card>
              <CardHeader className="bg-nb-yellow">
                <CardTitle className="text-nb-black flex items-center gap-2">
                  <Key className="size-4 text-nb-black" />
                  Pengaturan Kunci Substitusi
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end gap-3">
                  <div className="flex-1 flex flex-col gap-1.5">
                    <label htmlFor="keyword-input" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                      Kata Kunci / Keyword (A-Z)
                    </label>
                    <Input
                      id="keyword-input"
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Masukkan kata kunci... (contoh: RAHASIA)"
                      className="w-full bg-white"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleRandomizeKey}
                    variant="outline"
                    className="sm:w-auto shrink-0 flex items-center gap-2"
                  >
                    <Shuffle className="size-4" />
                    Acak Kunci (Shuffle)
                  </Button>
                </div>

                {/* Letters mapping table */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                    Tabel Pemetaan Abjad (Alphabet Mapping Table)
                  </span>
                  
                  <div className="overflow-x-auto border-[3px] border-nb-black shadow-[4px_4px_0px_var(--nb-black)]">
                    <table className="w-full border-collapse text-center text-xs font-black min-w-[700px]">
                      <thead>
                        <tr className="bg-nb-yellow border-b-[3px] border-nb-black">
                          <th className="p-2.5 border-r-[3px] border-nb-black bg-nb-black text-white shrink-0 sticky left-0 z-10 w-24 select-none">
                            Sebelum
                          </th>
                          {ALPHABET.split("").map((char, i) => (
                            <td key={i} className="p-2 border-r-[3px] border-nb-black text-nb-black bg-nb-yellow/10 font-bold select-none">
                              {char}
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white">
                          <th className="p-2.5 border-r-[3px] border-nb-black bg-nb-black text-white shrink-0 sticky left-0 z-10 w-24 select-none">
                            Sesudah
                          </th>
                          {cipherKey.split("").map((char, i) => {
                            const isChanged = char !== ALPHABET[i]
                            return (
                              <td 
                                key={i} 
                                className={`p-2 border-r-[3px] border-nb-black font-black transition-colors ${
                                  isChanged ? 'bg-nb-yellow text-nb-black' : 'text-nb-gray bg-white'
                                }`}
                              >
                                {char}
                              </td>
                            )
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Encryption/Decryption process */}
            <Card>
              <CardHeader className="bg-[#9C27B0]" style={{ backgroundColor: 'var(--page-accent)' }}>
                <CardTitle className="text-white flex items-center gap-2">
                  <ArrowRight className="size-4 text-white" />
                  Proses Enkripsi &amp; Dekripsi
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 flex flex-col gap-6">
                
                {/* Mode Selector Tabs */}
                <div className="flex border-[3px] border-nb-black shadow-[4px_4px_0px_var(--nb-black)]">
                  <button
                    type="button"
                    onClick={() => setMode("encrypt")}
                    className={`flex-1 py-3 text-sm font-black uppercase tracking-wider transition-all select-none border-r-[3px] border-nb-black cursor-pointer ${
                      mode === "encrypt" 
                        ? 'bg-nb-black text-white' 
                        : 'bg-white text-nb-black hover:bg-nb-yellow/10'
                    }`}
                  >
                    Enkripsi Teks
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("decrypt")}
                    className={`flex-1 py-3 text-sm font-black uppercase tracking-wider transition-all select-none cursor-pointer ${
                      mode === "decrypt" 
                        ? 'bg-nb-black text-white' 
                        : 'bg-white text-nb-black hover:bg-nb-yellow/10'
                    }`}
                  >
                    Dekripsi Teks
                  </button>
                </div>

                {/* Input / Output text areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="input-text" className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                      Teks Masuk ({mode === "encrypt" ? "Plaintext" : "Ciphertext"})
                    </label>
                    <textarea
                      id="input-text"
                      rows={5}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={mode === "encrypt" ? "Ketik pesan rahasia yang ingin dienkripsi..." : "Ketik sandi rahasia yang ingin didekripsi..."}
                      className="w-full p-3 font-medium text-sm text-nb-black bg-nb-beige border-[3px] border-nb-black rounded-none outline-none focus-visible:bg-white focus-visible:shadow-[4px_4px_0px_var(--page-accent)] transition-all resize-none"
                    />
                  </div>

                  {/* Right: Output */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-nb-gray">
                        Hasil ({mode === "encrypt" ? "Ciphertext" : "Plaintext"})
                      </span>
                      {outputText && (
                        <Button
                          onClick={handleCopyToClipboard}
                          variant="outline"
                          size="xs"
                          className="flex items-center gap-1.5 hover:bg-nb-yellow"
                        >
                          {copied ? (
                            <>
                              <Check className="size-3.5" />
                              Tersalin
                            </>
                          ) : (
                            <>
                              <Copy className="size-3.5" />
                              Salin
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                    <textarea
                      id="output-text"
                      rows={5}
                      value={outputText}
                      readOnly
                      placeholder="Hasil akan muncul di sini secara otomatis..."
                      className="w-full p-3 font-black text-sm text-nb-black bg-nb-yellow/5 border-[3px] border-nb-black rounded-none outline-none resize-none select-all"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Box */}
            <div className="nb-info-box">
              <p className="text-xs font-bold uppercase tracking-wider text-nb-black mb-2 flex items-center gap-1.5">
                <AlertCircle className="size-4 shrink-0" />
                Cara Kerja Sandi Substitusi Monoalfabetik
              </p>
              <p className="text-sm font-medium text-nb-gray leading-relaxed mb-3">
                Sandi substitusi monoalfabetik bekerja dengan memetakan setiap huruf dalam alfabet asli (plaintext) ke huruf lain secara konsisten berdasarkan baris kunci (ciphertext).
              </p>
              <ul className="text-xs font-semibold text-nb-gray list-disc pl-4 space-y-2 leading-relaxed">
                <li>
                  <strong className="text-nb-black">Kata Kunci</strong>: Huruf unik dari kata kunci diletakkan di awal alfabet baru, lalu huruf alfabet lainnya yang belum dipakai akan diisikan berurutan. Misalnya, kunci <strong className="text-nb-black">“RAHASIA”</strong> memetakan huruf abjad pertama ke <strong className="text-nb-black">R, A, H, S, I</strong> diikuti oleh abjad tersisa (<strong className="text-nb-black">B, C, D, E, F, G, J, K, L, M, N, O, P, Q, T, U, V, W, X, Y, Z</strong>).
                </li>
                <li>
                  <strong className="text-nb-black">Acak Kunci (Shuffle)</strong>: Mengacak 26 huruf alfabet secara acak tanpa kata kunci spesifik untuk mendapatkan keamanan pemetaan yang lebih tinggi.
                </li>
                <li>
                  Simbol, angka, dan spasi tidak diubah demi mempertahankan struktur kalimat asli. Kapitalisasi huruf (casing) dipertahankan saat proses selesai.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
