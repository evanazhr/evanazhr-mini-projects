import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brain Dump",
  description: "Tuang semua yang ada di pikiranmu. Catatan otomatis terhapus sesuai waktu yang kamu atur.",
}

export default function BrainDumpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
