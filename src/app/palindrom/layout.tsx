import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Palindrom Checker",
  description: "Cek apakah sebuah kata atau kalimat merupakan palindrom secara instan.",
}

export default function PalindromLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
