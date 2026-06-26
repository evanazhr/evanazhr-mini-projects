import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'evanazhr Mini Projects',
    short_name: 'Mini Projects',
    description: 'Kumpulan mini project interaktif oleh evanazhr.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FACC00',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
