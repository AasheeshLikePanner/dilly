export default function DashboardSlugPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Dashboard for {params.slug}</h1>
      <p>Welcome to your workspace dashboard. Use the sidebar to navigate.</p>
    </div>
  );
}