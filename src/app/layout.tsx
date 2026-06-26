import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
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
      <body className="min-h-full flex flex-col">
        <PWARegister />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
