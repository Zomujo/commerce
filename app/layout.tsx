import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle =
  "WG Trade - Africa's Critical Minerals & Industrial Supply Infrastructure";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | WG Trade",
  },
  description:
    "Africa's critical minerals and industrial supply infrastructure. Your trusted B2B marketplace for industrial chemicals and raw materials — request quotes from verified suppliers.",
  keywords:
    "WG Trade, Africa, critical minerals, industrial supply, industrial chemicals, raw materials, polymers, solvents, B2B, chemical suppliers, bulk chemicals, manufacturing materials",
  openGraph: {
    title: siteTitle,
    description:
      "Africa's critical minerals and industrial supply infrastructure. B2B marketplace for industrial chemicals and raw materials.",
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
