import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Monoalphabetic Cipher",
  description: "Enkripsi dan dekripsi teks menggunakan sandi substitusi monoalfabetik.",
}

export default function MonoalphabeticCipherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
