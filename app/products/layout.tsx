import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Products & Raw Materials",
  description:
    "Browse WG Trade's industrial products and raw materials, including chemicals, polymers, minerals, additives and specialty materials for African industry.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Industrial Products & Raw Materials | WG Trade",
    description:
      "Source industrial chemicals, polymers, minerals, additives and specialty materials through WG Trade.",
  },
};

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
