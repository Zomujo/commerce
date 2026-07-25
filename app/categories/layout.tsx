import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Product Categories",
  description:
    "Explore WG Trade's industrial sourcing categories, from chemicals and polymers to minerals, additives and specialty raw materials.",
  alternates: { canonical: "/categories" },
  openGraph: {
    title: "Industrial Product Categories | WG Trade",
    description:
      "Explore the industrial materials and product categories available through WG Trade.",
  },
};

export default function CategoriesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
