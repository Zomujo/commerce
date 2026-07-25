import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: "Industrial Product Details",
    description:
      "View industrial product specifications and request a quote from WG Trade.",
    alternates: { canonical: `/products/${id}` },
  };
}

export default function ProductDetailLayout({ children }: Props) {
  return children;
}
