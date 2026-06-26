'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from "lucide-react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Runtime Page Error:", error)
  }, [error])

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <Card className="shadow-shadow border-2 border-border p-0 overflow-hidden bg-secondary-background">
            {/* Header */}
            <CardHeader className="bg-chart-3 text-white border-b-2 border-border flex flex-col items-center py-6 space-y-0">
              <AlertTriangle className="size-16 text-white animate-bounce" />
              <h1 className="text-xl font-black uppercase tracking-widest text-white mt-2">
                Terjadi Kesalahan
              </h1>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-6 text-center flex flex-col gap-4">
              <CardTitle className="text-base font-black text-foreground uppercase tracking-wider">
                Aplikasi Mengalami Kendala
              </CardTitle>
              <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                Maaf, terjadi kesalahan tak terduga saat memproses halaman ini. Silakan coba memuat ulang halaman.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-2">
                <Button
                  onClick={() => reset()}
                  variant="default"
                  className="w-full font-bold"
                >
                  <RefreshCw className="size-4 mr-2" />
                  Coba Lagi
                </Button>

                <Button
                  asChild
                  variant="neutral"
                  className="w-full font-bold"
                >
                  <Link href="/">
                    <Home className="size-4 mr-2" />
                    Kembali ke Beranda
                  </Link>
                </Button>
              </div>

              {/* Collapsible Error details */}
              <div className="mt-4 border-t-2 border-border pt-4 text-left">
                <button
                  type="button"
                  onClick={() => setShowDetails((prev) => !prev)}
                  className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                >
                  <span>Detail Kesalahan</span>
                  {showDetails ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>

                {showDetails && (
                  <div className="mt-2 bg-chart-3/5 border-2 border-border p-3 rounded-base overflow-auto max-h-40">
                    <p className="text-xs font-mono text-chart-3 break-all leading-relaxed whitespace-pre-wrap">
                      {error.message || "Unknown error"}
                    </p>
                    {error.digest && (
                      <p className="text-[10px] font-mono text-foreground/70 mt-2 break-all">
                        Digest ID: {error.digest}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

