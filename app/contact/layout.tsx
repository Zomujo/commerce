import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact WG Trade",
  description:
    "Contact WG Trade to discuss industrial sourcing, raw materials, market access, supplier partnerships or trade opportunities across Africa and beyond.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact WG Trade",
    description:
      "Talk with WG Trade about sourcing, partnerships and cross-border industrial trade.",
  },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
