import { useCallback, useState } from "react";

// 로컬스토리지 동기화: 지연 초기화 + 단일 setter에서만 write
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const set = useCallback((next) => {
    const resolved = typeof next === "function" ? next(value) : next;
    setValue(resolved);
    try {
      localStorage.setItem(key, JSON.stringify(resolved));
    } catch {}
  }, [key, value]);

  return [value, set];
}


