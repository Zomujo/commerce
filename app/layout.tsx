import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WasteGrid Procure | Industrial Chemicals & Raw Materials",
  description: "Your trusted B2B marketplace for industrial chemicals and raw materials. Request quotes from verified suppliers for polymers, solvents, pigments, additives, and specialty chemicals.",
  keywords: "industrial chemicals, raw materials, polymers, solvents, B2B chemicals, chemical suppliers, bulk chemicals, manufacturing materials",
  openGraph: {
    title: "WasteGrid Procure | Industrial Chemicals & Raw Materials",
    description: "Your trusted B2B marketplace for industrial chemicals and raw materials. Request quotes from verified suppliers.",
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
