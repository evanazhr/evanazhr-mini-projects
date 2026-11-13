import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import MobileBottomNavigation from "@/components/mobile-bottom-navigation";
import Footer from "@/components/footer";
import PWARegister from "@/components/pwa-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | evanazhr.mini.projects",
    default: "evanazhr.mini.projects",
  },
  description: "Kumpulan mini project interaktif yang dibuat oleh evanazhr untuk belajar dan bereksperimen.",
  icons: {
    icon: [
      { url: "/pwa-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/pwa-icon-192.png",
    apple: "/pwa-icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mini Projects",
  },
};

export const viewport: Viewport = {
  themeColor: "#FACC00",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grid-pattern">
        <PWARegister />
        <Navbar />
        {children}
        <MobileBottomNavigation/>
        <Footer/>
      </body>
    </html>
  );
}
