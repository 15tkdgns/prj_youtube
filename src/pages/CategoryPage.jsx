import useRouteParam from "../hooks/useRouteParam";
import { useNavigation } from "../hooks/useNavigation";

export default function CategoryPage() {
  const category = useRouteParam("category", "전체");
  const { goBack } = useNavigation();
  
  return (
    <div className="p-6">
      <button 
        onClick={goBack} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        뒤로가기
      </button>
      <h2 className="text-2xl font-bold">카테고리: {category}</h2>
    </div>
  );
}


