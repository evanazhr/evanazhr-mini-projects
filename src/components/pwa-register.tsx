'use client'

import { useEffect } from "react"

export default function PWARegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        // Register service worker only in production to avoid conflicts with Next.js HMR/Fast Refresh
        const handleLoad = () => {
          navigator.serviceWorker
            .register("/sw.js")
            .then((reg) => {
              console.log("Service Worker registered successfully with scope:", reg.scope)
            })
            .catch((err) => {
              console.error("Service Worker registration failed:", err)
            })
        }

        if (document.readyState === "complete") {
          handleLoad()
        } else {
          window.addEventListener("load", handleLoad)
          return () => window.removeEventListener("load", handleLoad)
        }
      } else {
        // In development, actively unregister any existing service worker to prevent reload/HMR loops
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister().then((success) => {
              if (success) {
                console.log("Development Mode: Unregistered active service worker successfully")
              }
            })
          }
        })

        // Also clear all caches to remove any stale development assets or webpack chunks
        if ("caches" in window) {
          caches.keys().then((keys) => {
            keys.forEach((key) => {
              caches.delete(key).then(() => {
                console.log(`Development Mode: Cleared cache storage [${key}]`)
              })
            })
          })
        }
      }
    }
  }, [])

  return null
}
