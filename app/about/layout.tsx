import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About WG Trade",
  description:
    "Learn how WG Trade connects African businesses with global suppliers, buyers and commercial capabilities to make trade work across borders.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About WG Trade",
    description:
      "WG Trade builds trusted commercial connections between African industry and global markets.",
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
