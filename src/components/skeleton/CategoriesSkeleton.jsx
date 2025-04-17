export default function CategoriesSkeleton() {
  return (
    <nav className="wrapper">
      <ul className="flex animate-pulse gap-2 py-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <li key={idx} className="h-8 w-20 rounded-md bg-gray-300 p-2"></li>
        ))}
      </ul>
    </nav>
  );
}
