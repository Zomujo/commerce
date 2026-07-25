import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  return {
    title: "Industrial Category",
    description:
      "Explore industrial products and raw materials available from this WG Trade category.",
    alternates: { canonical: `/categories/${id}` },
  };
}

export default function CategoryDetailLayout({ children }: Props) {
  return children;
}
