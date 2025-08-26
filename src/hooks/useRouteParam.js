import { useParams } from "react-router-dom";

// URL에서 파라미터 값을 가져오는 훅
export default function useRouteParam(paramName, defaultValue = "") {
  const params = useParams();
  const value = params[paramName];
  
  
  if (!value) {
    return defaultValue;
  }
  
  return value;
}


