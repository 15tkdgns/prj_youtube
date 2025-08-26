import useRouteParam from "../hooks/useRouteParam";
import { useNavigation } from "../hooks/useNavigation";

export default function CategoryPage() {
  const category = useRouteParam("category", "all");
  const { goBack } = useNavigation();
  
  return (
    <div className="p-6">
      <button 
        onClick={goBack} 
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← 뒤로가기
      </button>
      <h2 className="text-2xl font-bold">카테고리: {category}</h2>
    </div>
  );
}


