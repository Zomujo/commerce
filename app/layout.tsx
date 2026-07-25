import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});



const siteTitle =
  "WG Trade - Connecting African Industry to the World";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | WG Trade",
  },
  description:
    "WG Trade connects businesses to the materials, markets and commercial capabilities required to produce, build and grow across Africa and global markets.",
  keywords:
    "WG Trade, Africa trade, industrial sourcing, critical minerals, industrial chemicals, polymers, metals, trade execution, trade finance, market access",
  icons: {
    icon: '/logo.png?v=3',
    shortcut: '/logo.png?v=3',
    apple: '/logo.png',
  },
  openGraph: {
    title: siteTitle,
    description:
      "WG Trade connects businesses to the materials, markets and commercial capabilities required to produce, build and grow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
