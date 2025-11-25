export default function FeaturesPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Features for Workspace: {params.slug}</h1>
      <p>This is the features page.</p>
    </div>
  );
}