import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "../components/CategoryPage";
import {
  getCategoryBySlug,
  portfolioCategories,
} from "../components/categoryData";

type CategoryRouteProps = {
  params: Promise<{ category: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioCategories.map((category) => ({
    category: category.slug.slice(1),
  }));
}

export async function generateMetadata({
  params,
}: CategoryRouteProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: category.title,
    description: category.description,
    alternates: {
      canonical: category.slug,
    },
  };
}

export default async function CategoryRoute({ params }: CategoryRouteProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return <CategoryPage category={category} />;
}
