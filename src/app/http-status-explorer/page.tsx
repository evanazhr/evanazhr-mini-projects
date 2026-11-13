'use client'

import { useMemo, useState } from "react"
import PageHeader from "@/components/page-header"
import projectsMeta from "@/data/projects-meta"

type StatusTuple = [number, string, string, string]

const statuses: StatusTuple[] = [
  [200, "OK", "Permintaan berhasil diproses.", "Membaca data atau menampilkan halaman."],
  [201, "Created", "Resource baru berhasil dibuat.", "Membuat user atau posting baru."],
  [204, "No Content", "Berhasil tanpa response body.", "Update atau delete yang tidak mengembalikan data."],
  [301, "Moved Permanently", "URL resource telah berpindah permanen.", "Redirect domain lama ke domain baru."],
  [400, "Bad Request", "Request tidak valid atau gagal dipahami.", "Payload JSON tidak sesuai format."],
  [401, "Unauthorized", "Autentikasi diperlukan atau tidak valid.", "Token login hilang atau expired."],
  [403, "Forbidden", "Server memahami request, tetapi menolaknya.", "User tidak memiliki permission."],
  [404, "Not Found", "Resource yang diminta tidak ditemukan.", "Endpoint atau halaman tidak tersedia."],
  [422, "Unprocessable Content", "Data valid secara sintaks tetapi gagal validasi.", "Form berisi email yang sudah terdaftar."],
  [429, "Too Many Requests", "Terlalu banyak request dalam waktu singkat.", "Rate limit API tercapai."],
  [500, "Internal Server Error", "Server mengalami error yang tidak terduga.", "Exception pada backend."],
  [503, "Service Unavailable", "Service sedang tidak tersedia.", "Maintenance atau server overload."],
]

const normalize = (value: string) => value
  .toLocaleLowerCase("id-ID")
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .trim()
  .replace(/\s+/g, " ")

function getGroup(code: number) {
  return `${Math.floor(code / 100)}xx`
}

export default function HttpStatusExplorer() {
  const meta = projectsMeta["http-status-explorer"]
  const [query, setQuery] = useState("")
  const [search, setSearch] = useState("")
  const [group, setGroup] = useState("all")

  const filtered = useMemo(() => {
    const term = normalize(search)
    return statuses.filter(([code, name, description, example]) => {
      const matchesGroup = group === "all" || getGroup(code) === group
      if (!matchesGroup) return false
      if (!term) return true

      const searchable = normalize(`${code} ${name} ${description} ${example} ${getGroup(code)}`)
      return searchable.includes(term)
    })
  }, [group, search])

  return (
    <div className="min-h-[100dvh] bg-background bg-grid-pattern">
      <PageHeader {...meta} />
      <main className="mx-auto max-w-5xl px-4 pb-12 md:px-8">
        <section className="mb-5 rounded-none border-2 border-border bg-secondary-background p-4 shadow-shadow">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSearch(query)
            }}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <label className="flex-1 font-bold">
              Cari status HTTP
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Contoh: 404, not found, redirect..."
                className="mt-2 h-11 w-full rounded-none border-2 border-border bg-background px-3 font-normal"
              />
            </label>
            <button
              type="submit"
              className="h-11 rounded-none border-2 border-border bg-main px-5 font-bold shadow-shadow"
            >
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {["all", "1xx", "2xx", "3xx", "4xx", "5xx"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setGroup(item)}
                className={`rounded-none border-2 border-border px-3 py-2 text-sm font-bold ${
                  group === item ? "bg-main shadow-shadow" : "bg-background"
                }`}
              >
                {item === "all" ? "Semua" : item}
              </button>
            ))}
          </div>

          <p className="mt-3 text-sm text-foreground/70" aria-live="polite">
            Menampilkan {filtered.length} dari {statuses.length} status
            {search && <> untuk “{search}”</>}
          </p>
        </section>

        {filtered.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map(([code, name, description, example]) => (
              <article key={code} className="rounded-none border-2 border-border bg-secondary-background p-5 shadow-shadow">
                <div className="flex items-baseline gap-3">
                  <strong className="text-3xl">{code}</strong>
                  <h2 className="text-xl font-black">{name}</h2>
                </div>
                <p className="mt-3">{description}</p>
                <p className="mt-2 text-sm text-foreground/70">Contoh: {example}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-none border-2 border-dashed border-border bg-secondary-background p-8 text-center">
            <h2 className="text-xl font-black">Status tidak ditemukan</h2>
            <p className="mt-2 text-foreground/70">Coba cari dengan kode seperti 404 atau kata seperti “unauthorized”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setSearch("")
                setGroup("all")
              }}
              className="mt-5 rounded-none border-2 border-border bg-main px-4 py-2 font-bold shadow-shadow"
            >
              Reset filter
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
