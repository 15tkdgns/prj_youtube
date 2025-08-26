import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo } from "react";

// 네비게이션 관련 기능을 제공하는 커스텀 훅
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goTo = useCallback((path) => {
    navigate(path);
  }, [navigate]);
  
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  
  const isActive = useCallback((path) => {
    return location.pathname === path;
  }, [location.pathname]);
  
  const currentPath = useMemo(() => location.pathname, [location.pathname]);
  
  return {
    goTo,
    goBack,
    isActive,
    currentPath
  };
};
