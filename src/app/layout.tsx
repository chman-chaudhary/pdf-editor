import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PDFProvider } from "@/context/PDFContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDF Merger & Reorder",
  description: "Merge and reorder PDF files effortlessly",
  icons: {
    icon: ["/logo/icons-16.png", "/logo/icons-32.png"],
    apple: [
      "/logo/icons-57.png",
      "/logo/icons-60.png",
      "/logo/icons-70.png",
      "/logo/icons-72.png",
      "/logo/icons-76.png",
      "/logo/icons-96.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PDFProvider>{children}</PDFProvider>
      </body>
    </html>
  );
}
