export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params; // front-end
  const { tag } = await searchParams; // all

  return <div>CategoryPage</div>;
}
