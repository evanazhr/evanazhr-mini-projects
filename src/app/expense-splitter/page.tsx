'use client'

import { useMemo, useState } from "react"
import PageHeader from "@/components/page-header"
import projectsMeta from "@/data/projects-meta"

type Item = { id: number; name: string; price: number; quantity: number; buyers: string[] }

const money = (value: number) => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0,
}).format(value)

export default function ExpenseSplitter() {
  const [people, setPeople] = useState(["Ari", "Budi"])
  const [personName, setPersonName] = useState("")
  const [items, setItems] = useState<Item[]>([])
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemQuantity, setItemQuantity] = useState("1")
  const [buyers, setBuyers] = useState<string[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState("")

  const totals = useMemo(() => {
    const result: Record<string, number> = Object.fromEntries(people.map((person) => [person, 0]))
    for (const item of items) {
      if (!item.buyers.length) continue
      const share = (item.price * item.quantity) / item.buyers.length
      item.buyers.forEach((buyer) => { result[buyer] = (result[buyer] ?? 0) + share })
    }
    return result
  }, [items, people])

  const resetItem = () => {
    setItemName("")
    setItemPrice("")
    setItemQuantity("1")
    setBuyers([])
    setEditingId(null)
    setMessage("")
  }

  const addPerson = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = personName.trim()
    if (!name) return setMessage("Masukkan nama orang terlebih dahulu.")
    if (people.some((person) => person.toLowerCase() === name.toLowerCase())) return setMessage("Nama orang sudah ada.")
    setPeople((current) => [...current, name])
    setPersonName("")
    setMessage("")
  }

  const removePerson = (name: string) => {
    setPeople((current) => current.filter((person) => person !== name))
    setBuyers((current) => current.filter((person) => person !== name))
    setItems((current) => current
      .map((item) => ({ ...item, buyers: item.buyers.filter((buyer) => buyer !== name) }))
      .filter((item) => item.buyers.length > 0))
  }

  const toggleBuyer = (name: string) => {
    setBuyers((current) => current.includes(name)
      ? current.filter((person) => person !== name)
      : [...current, name])
  }

  const saveItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const name = itemName.trim()
    const price = Number(itemPrice)
    const quantity = Number(itemQuantity)
    if (!name || !Number.isFinite(price) || price <= 0 || !Number.isInteger(quantity) || quantity < 1 || buyers.length === 0) {
      setMessage("Isi nama barang, harga lebih dari 0, jumlah minimal 1, dan pilih pembelinya.")
      return
    }
    const item: Item = { id: editingId ?? Date.now(), name, price, quantity, buyers: [...buyers] }
    setItems((current) => editingId === null
      ? [...current, item]
      : current.map((entry) => entry.id === editingId ? item : entry))
    resetItem()
  }

  const editItem = (item: Item) => {
    setEditingId(item.id)
    setItemName(item.name)
    setItemPrice(String(item.price))
    setItemQuantity(String(item.quantity))
    setBuyers([...item.buyers])
    setMessage("")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const deleteItem = (id: number) => {
    setItems((current) => current.filter((item) => item.id !== id))
    if (editingId === id) resetItem()
  }

  return (
    <div className="min-h-[100dvh] bg-background bg-grid-pattern">
      <PageHeader {...projectsMeta["expense-splitter"]} />
      <main className="mx-auto grid max-w-5xl gap-5 px-4 pb-12 md:grid-cols-[minmax(0,1fr)_340px] md:px-8">
        <section className="space-y-5">
          <div className="rounded-none border-2 border-border bg-secondary-background p-5 shadow-shadow">
            <h2 className="text-xl font-black">Peserta</h2>
            <form onSubmit={addPerson} className="mt-4 flex gap-2">
              <input value={personName} onChange={(event) => setPersonName(event.target.value)} placeholder="Nama orang baru" className="h-11 min-w-0 flex-1 rounded-none border-2 border-border bg-background px-3" />
              <button type="submit" className="rounded-none border-2 border-border bg-main px-4 font-bold">Tambah</button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {people.map((person) => <span key={person} className="inline-flex items-center gap-2 rounded-none border-2 border-border bg-background px-3 py-2 font-bold">{person}<button type="button" onClick={() => removePerson(person)} aria-label={`Hapus ${person}`} className="text-lg leading-none text-red-600">×</button></span>)}
            </div>
          </div>

          <form onSubmit={saveItem} className="rounded-none border-2 border-border bg-secondary-background p-5 shadow-shadow">
            <div className="flex items-center justify-between gap-3"><h2 className="text-xl font-black">{editingId === null ? "Tambah barang" : "Edit barang"}</h2>{editingId !== null && <button type="button" onClick={resetItem} className="text-sm font-bold underline">Batal edit</button>}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input value={itemName} onChange={(event) => setItemName(event.target.value)} placeholder="Nama barang" className="h-11 rounded-none border-2 border-border bg-background px-3" />
              <input value={itemPrice} onChange={(event) => setItemPrice(event.target.value)} type="number" min="1" step="1" placeholder="Harga satuan (Rp)" className="h-11 rounded-none border-2 border-border bg-background px-3" />
              <input value={itemQuantity} onChange={(event) => setItemQuantity(event.target.value)} type="number" min="1" step="1" placeholder="Jumlah barang" className="h-11 rounded-none border-2 border-border bg-background px-3" />
            </div>
            <p className="mt-5 font-bold">Siapa yang membeli/menggunakan?</p>
            <div className="mt-2 flex flex-wrap gap-2">{people.map((person) => <button key={person} type="button" onClick={() => toggleBuyer(person)} className={`rounded-none border-2 border-border px-3 py-2 font-bold ${buyers.includes(person) ? "bg-main shadow-shadow" : "bg-background"}`}>{person}</button>)}</div>
            {buyers.length > 1 && <p className="mt-2 text-sm text-foreground/70">Harga dibagi rata untuk: {buyers.join(", ")}</p>}
            {message && <p role="alert" className="mt-3 font-bold text-red-600">{message}</p>}
            <button type="submit" className="mt-5 rounded-none border-2 border-border bg-main px-4 py-2 font-bold shadow-shadow">{editingId === null ? "Tambah ke tagihan" : "Simpan perubahan"}</button>
          </form>

          <div className="rounded-none border-2 border-border bg-secondary-background p-5 shadow-shadow">
            <h2 className="text-xl font-black">Barang yang dibeli</h2>
            {items.length === 0 ? <p className="mt-4 text-foreground/60">Belum ada barang. Tambahkan barang di atas.</p> : <div className="mt-4 space-y-3">{items.map((item) => <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-border/20 pb-3"><div><p className="font-bold">{item.name} <span className="font-normal text-foreground/60">× {item.quantity}</span></p><p className="text-sm text-foreground/60">{item.buyers.join(", ")}</p></div><div className="flex items-center gap-3"><strong>{money(item.price * item.quantity)}</strong><button type="button" onClick={() => editItem(item)} className="font-bold underline">Edit</button><button type="button" onClick={() => deleteItem(item.id)} className="font-bold text-red-600">Hapus</button></div></div>)}</div>}
          </div>

          <div className="rounded-none border-2 border-border bg-white p-5 shadow-shadow">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">Cara kerja Expense Splitter</p>
            <ul className="list-disc space-y-1.5 pl-4 text-xs font-semibold leading-relaxed text-foreground/70">
              <li>Tambahkan semua orang yang ikut membayar, lalu masukkan nama barang, harga satuan, dan jumlahnya.</li>
              <li>Pilih orang yang menggunakan barang. Harga barang akan dibagi rata di antara orang yang dipilih.</li>
              <li>Contoh: barang seharga Rp30.000 dengan jumlah 2 dan dipakai 3 orang akan menjadi Rp60.000, lalu masing-masing membayar Rp20.000.</li>
            </ul>
          </div>
        </section>

        <aside className="h-fit rounded-none border-2 border-border bg-main p-5 shadow-shadow md:sticky md:top-24">
          <h2 className="text-xl font-black">Ringkasan pembayaran</h2>
          <p className="mt-1 text-sm">Total: <strong>{money(items.reduce((sum, item) => sum + item.price * item.quantity, 0))}</strong></p>
          <div className="mt-5 space-y-3">{people.map((person) => <div key={person} className="flex justify-between border-b-2 border-border/30 pb-2"><span className="font-bold">{person}</span><strong>{money(totals[person] ?? 0)}</strong></div>)}</div>
          <p className="mt-5 text-sm font-bold">Setiap orang membayar sesuai barang yang dipilihnya.</p>
        </aside>
      </main>
    </div>
  )
}