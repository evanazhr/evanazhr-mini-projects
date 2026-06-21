'use client'

import Link from "next/link"
import { AlertOctagon, Home } from "lucide-react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <Card className="shadow-[8px_8px_0px_var(--nb-black)]">
            {/* Header */}
            <CardHeader className="bg-nb-red text-white flex flex-col items-center py-6">
              <AlertOctagon className="size-16 text-white animate-pulse" />
              <h1 className="text-5xl font-black text-white tracking-widest mt-2">
                404
              </h1>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-6 text-center flex flex-col gap-4">
              <CardTitle className="text-xl font-black text-nb-black uppercase tracking-wider">
                Halaman Tidak Ditemukan
              </CardTitle>
              <p className="text-sm font-medium text-nb-gray leading-relaxed">
                Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin alamat URL salah ketik atau halaman telah dihapus.
              </p>

              {/* Back to Home Button */}
              <Button
                asChild
                variant="default"
                size="default"
                className="mt-2 w-full font-bold"
                style={{ '--button-shadow': 'var(--nb-yellow)' } as React.CSSProperties}
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
