import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Roll Dice",
  description: "Simulasi melempar dadu dengan animasi interaktif dan riwayat lemparan.",
}

export default function RollDiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
