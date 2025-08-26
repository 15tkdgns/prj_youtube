import { useState, useEffect } from "react";

// 로컬스토리지에 값을 저장하고 불러오는 간단한 훅
export default function useLocalStorage(key, initialValue) {
  // 초기값 설정
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // 값이 바뀔 때마다 로컬스토리지에 저장
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("저장 실패:", error);
    }
  }, [key, value]);

  return [value, setValue];
}


