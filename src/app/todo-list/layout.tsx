import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "To-Do List",
  description: "Kelola daftar tugas harian Anda dengan mudah.",
}

export default function TodoListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
