'use client'

import Link from "next/link"
import { AlertOctagon, Home } from "lucide-react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <Card className="shadow-shadow border-2 border-border p-0 overflow-hidden bg-secondary-background">
            {/* Header */}
            <CardHeader className="bg-main text-main-foreground border-b-2 border-border flex flex-col items-center py-6 space-y-0">
              <AlertOctagon className="size-16 text-main-foreground animate-pulse" />
              <h1 className="text-5xl font-black text-main-foreground tracking-widest mt-2">
                404
              </h1>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-6 text-center flex flex-col gap-4">
              <CardTitle className="text-xl font-black text-foreground uppercase tracking-wider">
                Halaman Tidak Ditemukan
              </CardTitle>
              <p className="text-sm font-medium text-foreground/70 leading-relaxed">
                Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin alamat URL salah ketik atau halaman telah dihapus.
              </p>

              {/* Back to Home Button */}
              <Button
                asChild
                variant="default"
                size="default"
                className="mt-2 w-full font-bold"
              >
                <Link href="/">
                  <Home className="size-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

