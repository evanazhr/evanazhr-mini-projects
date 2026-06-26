import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Interpolasi Linear Calculator",
  description: "Mencari nilai dari Interpolasi Linier dengan kalkulator interaktif.",
}

export default function InterpolasiLinierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
