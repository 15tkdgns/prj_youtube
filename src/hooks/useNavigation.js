import { useNavigate, useLocation } from "react-router-dom";

// 페이지 이동과 현재 페이지 확인을 위한 훅
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 페이지 이동
  const goTo = (path) => {
    navigate(path);
  };
  
  // 뒤로가기
  const goBack = () => {
    navigate(-1);
  };
  
  // 현재 페이지인지 확인
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return {
    goTo,
    goBack,
    isActive,
    currentPath: location.pathname
  };
};
