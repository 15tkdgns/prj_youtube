import React, {createContext, useState, useContext} from "react";

// --------------------------------------------------
// [유틸 함수] localStorage에 사용자 목록(users)을 저장/불러오기
// --------------------------------------------------

// localStorage에서 "users"라는 키로 저장된 데이터를 가져옴
// 없을 경우 빈 배열 [] 반환
const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

// 사용자 배열을 localStorage에 "users"라는 키로 저장
const saveUsers = (users) => localStorage.setItem("users", JSON.stringify(users));

// --------------------------------------------------
// Context 생성
// --------------------------------------------------
// AuthContext는 로그인 상태, 로그인/로그아웃/회원가입 같은 기능을
// 전역적으로 관리하고 다른 컴포넌트에서도 쉽게 접근 가능하게 해줌
const AuthContext = createContext();

// --------------------------------------------------
// AuthProvider 컴포넌트
// --------------------------------------------------
// App.js에서 <AuthProvider>로 감싸면, 자식 컴포넌트들이
// AuthContext에 저장된 상태와 함수를 모두 사용할 수 있음
export const AuthProvider = ({ children }) => {
  // isAuthenticated : 현재 로그인 여부(true/false)
  // localStorage의 "isLoggedIn" 값을 보고 초기화
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  // --------------------------------------------------
  // 로그인 함수
  // --------------------------------------------------
  // username, password를 받아서 localStorage에 저장된 user 목록에서
  // 일치하는 사용자가 있는지 확인 → 있으면 로그인 성공
  const login = (username, password) => {
    const users = getUsers(); // 저장된 유저 목록 불러오기
    // username, password가 모두 일치하는 user 찾기
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // 로그인 성공 처리
      setIsAuthenticated(true); // 상태 업데이트
      localStorage.setItem("isLoggedIn", "true"); // localStorage에 로그인 기록 저장
      return true;
    }
    // 로그인 실패 (아이디/비밀번호 틀림)
    return false;
  };

  // --------------------------------------------------
  // 로그아웃 함수
  // --------------------------------------------------
  const logout = () => {
    setIsAuthenticated(false); // 로그인 상태 해제
    localStorage.removeItem("isLoggedIn"); // localStorage 기록 삭제
  };
  
  // --------------------------------------------------
  // 회원가입 함수
  // --------------------------------------------------
  // username이 이미 존재하면 false 반환
  // 존재하지 않으면 새 유저를 추가하고 true 반환
  const register = (username, password) => {
    const users = getUsers(); // 기존 유저 목록 불러오기

    // 동일한 username이 있는지 확인
    if (users.find(u => u.username === username)) {
      return false; // 이미 존재하는 아이디 → 회원가입 실패
    }

    // 새 유저 객체 생성
    const newUser = { id: Date.now(), username, password };
    const updatedUsers = [...users, newUser]; // 기존 유저 + 새 유저 합치기
    saveUsers(updatedUsers); // localStorage에 저장
    return true; // 회원가입 성공
  };

  // --------------------------------------------------
  // Context.Provider
  // --------------------------------------------------
  // value 객체에 상태와 함수들을 담아 하위 컴포넌트에서 사용 가능하게 함
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// --------------------------------------------------
// useAuth : Context 소비 훅
// --------------------------------------------------
// 어떤 컴포넌트에서든 useAuth()를 호출하면
// AuthContext의 값(상태와 함수들)을 바로 쓸 수 있음
export const useAuth = () => useContext(AuthContext);
