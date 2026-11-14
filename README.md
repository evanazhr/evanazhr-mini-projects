# evanazhr.mini.projects

Kumpulan mini project interaktif, tools, dan utility yang dibuat oleh **evanazhr** untuk belajar, bereksperimen, dan membantu menyelesaikan masalah sehari-hari.

Setiap project tersedia sebagai halaman mandiri di dalam aplikasi Next.js. Beberapa halaman juga dapat digunakan dalam bahasa Indonesia dan Inggris melalui language switcher.

## Isi project

Saat ini tersedia:

| Project | Route | Kategori |
| --- | --- | --- |
| Palindrom Checker | `/palindrom` | String |
| Interpolasi Linear Calculator | `/interpolasi-linier` | Math |
| To-Do List | `/todo-list` | Utility |
| Monoalphabetic Cipher | `/monoalphabetic-cipher` | Cryptography |
| Roll Dice | `/roll-dice` | Game |
| QR Code Generator | `/qr-code-generator` | Utility |
| Brain Dump | `/brain-dump` | Utility |
| HTTP Status Explorer | `/http-status-explorer` | Developer Tools |
| Git Cheat Sheet | `/git-cheat-sheet` | Developer Tools |
| Expense Splitter | `/expense-splitter` | Finance |
| Pomodoro Timer | `/pomodoro` | Productivity |
| Regex Tester | `/regex-tester` | Developer Tools |

Selain halaman project, tersedia juga halaman informasi di `/about`.

## Teknologi

- [Next.js](https://nextjs.org/) 16 dengan App Router
- [React](https://react.dev/) 19 dan TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/) dan Radix UI
- [Lucide React](https://lucide.dev/) untuk ikon
- [Framer Motion](https://motion.dev/) untuk animasi
- PWA manifest dan service worker sederhana
- pnpm sebagai package manager

Antarmuka menggunakan gaya **neubrutalism**: border tebal, warna kontras, hard shadow, dan layout yang responsif. Detail arah visual tersedia di [DESIGN.md](./DESIGN.md).

## Prasyarat

- Node.js versi 20 atau lebih baru
- pnpm versi 9 atau lebih baru

Versi pnpm yang digunakan dapat disesuaikan dengan environment lokal. Repository ini menyertakan `pnpm-lock.yaml`, jadi pnpm direkomendasikan agar instalasi dependency konsisten.

## Menjalankan secara lokal

1. Clone repository dan masuk ke folder project.

   ```bash
   git clone <url-repository>
   cd evanazhr-mini-projects
   ```

2. Install dependency.

   ```bash
   pnpm install
   ```

3. Jalankan development server.

   ```bash
   pnpm dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser.

Development server akan memuat ulang halaman secara otomatis ketika source code berubah.

## Perintah yang tersedia

| Perintah | Keterangan |
| --- | --- |
| `pnpm dev` | Menjalankan development server |
| `pnpm build` | Membuat production build |
| `pnpm start` | Menjalankan hasil production build |
| `pnpm lint` | Menjalankan ESLint |
| `pnpm lint:fix` | Menjalankan ESLint dan memperbaiki masalah yang dapat diperbaiki otomatis |

Belum ada konfigurasi test runner di project ini. Sebelum membuat pull request, jalankan setidaknya `pnpm lint` dan `pnpm build`.

## Struktur folder

```text
.
├── public/                 # Asset statis, ikon, gambar, dan service worker
├── src/
│   ├── app/                # Route dan halaman App Router
│   ├── components/         # Komponen layout dan UI bersama
│   ├── data/               # Registry metadata project
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility dan helper server/client
│   └── types/              # Definisi tipe TypeScript
├── DESIGN.md               # Catatan design system
├── next.config.ts          # Konfigurasi Next.js
├── package.json            # Script dan dependency
└── tsconfig.json           # Konfigurasi TypeScript
```

## Menambahkan mini project

Project pada halaman utama ditemukan secara otomatis dari folder `src/app/`. Folder baru yang memiliki `page.tsx`, `page.jsx`, atau `page.js` akan dianggap sebagai mini project.

Langkah yang disarankan:

1. Buat folder route baru, misalnya `src/app/nama-project/`.
2. Tambahkan `page.tsx` dengan UI dan interaksi project.
3. Tambahkan `layout.tsx` jika project membutuhkan metadata halaman khusus.
4. Daftarkan judul, deskripsi, kategori, warna aksen, dan ikon di [`src/data/projects-meta.ts`](./src/data/projects-meta.ts).
5. Tambahkan terjemahan untuk teks baru di [`src/components/language-provider.tsx`](./src/components/language-provider.tsx) bila halaman perlu mendukung bahasa Inggris.
6. Jalankan lint dan build untuk memastikan route baru dapat dikompilasi.

`src/lib/get-projects.ts` menangani auto-discovery dan fallback metadata. Route seperti `/about` tidak ditampilkan sebagai project karena masuk dalam daftar pengecualian.

## Bahasa

Bahasa awal aplikasi adalah Indonesia. Pengguna dapat berpindah ke bahasa Inggris menggunakan language switcher. Pilihan bahasa disimpan di `localStorage` dengan key `mini-projects-language`.

## PWA dan asset

Metadata PWA tersedia melalui `src/app/manifest.ts`. Ikon aplikasi berada di `public/`, sedangkan registrasi service worker ditangani oleh `src/components/pwa-register.tsx` dan file service worker berada di `public/sw.js`.

## Build dan deployment

Buat dan jalankan production build dengan:

```bash
pnpm build
pnpm start
```

Project ini kompatibel dengan deployment Next.js seperti [Vercel](https://vercel.com/) maupun platform lain yang dapat menjalankan Node.js. Pastikan perintah build menggunakan dependency yang ter-install dari lockfile.

## Kontribusi

Perubahan kecil, perbaikan bug, dan project baru dipersilakan. Saat mengirim perubahan:

1. Gunakan struktur dan pola komponen yang sudah ada.
2. Pertahankan desain responsif untuk layar mobile dan desktop.
3. Perbarui metadata dan dokumentasi jika menambahkan route baru.
4. Jalankan `pnpm lint` dan `pnpm build` sebelum membuat pull request.

## Lisensi

Belum ada lisensi open-source yang ditentukan di repository ini. Hubungi pemilik repository sebelum menggunakan atau mendistribusikan ulang project ini di luar repository.
