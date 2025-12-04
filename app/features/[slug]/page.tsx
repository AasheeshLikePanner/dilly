import { notFound } from "next/navigation"

export default function FeaturesPage({ params }: { params: { slug: string } }) {
  if (process.env.NEXT_PUBLIC_SHOW_COMPONENTS === 'false' || (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SHOW_COMPONENTS !== 'true')) {
    notFound()
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Features for Workspace: {params.slug}</h1>
      <p>This is the features page.</p>
    </div>
  );
}