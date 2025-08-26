import { useParams } from "react-router-dom";

// URL에서 파라미터 값을 가져오는 간단한 훅
export default function useRouteParam(paramName, defaultValue = "") {
  const params = useParams();
  const value = params[paramName];
  
  // 값이 없으면 기본값 반환
  if (!value) {
    return defaultValue;
  }
  
  return value;
}


