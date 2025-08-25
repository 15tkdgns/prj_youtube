import useRouteParam from "../hooks/useRouteParam";

export default function CategoryPage() {
  const category = useRouteParam("category", "all");
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">카테고리: {category}</h2>
    </div>
  );
}


