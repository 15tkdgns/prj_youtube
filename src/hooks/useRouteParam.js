import { useParams } from "react-router-dom";

// URL 파라미터 안전 조회 (빈값/미정 시 기본값)
export default function useRouteParam(paramName, defaultValue = "") {
  const params = useParams();
  const value = params[paramName];
  return value ? decodeURIComponent(value) : defaultValue;
}


