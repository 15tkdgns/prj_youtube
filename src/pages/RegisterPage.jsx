// --------------------------------------------------
// 필요한 라이브러리 및 컴포넌트 import
// --------------------------------------------------
import React, { useState } from "react";
import { Link } from "react-router-dom"; // 페이지 이동용 Link 컴포넌트
import Button from "../components/common/Button"; // 공통 버튼 컴포넌트
import { useAuth } from "../contexts/AuthContext"; // AuthContext의 훅 (register 함수 사용)

// --------------------------------------------------
// RegisterPage 컴포넌트
// --------------------------------------------------
// 회원가입 페이지: 아이디와 비밀번호 입력 → register() 호출 → 성공/실패 처리
const RegisterPage = () => {
  // AuthContext에서 register 함수 가져오기
  const { register } = useAuth();

  // 상태 관리: 입력 값과 에러 메시지
  const [username, setUsername] = useState(""); // 사용자 아이디
  const [password, setPassword] = useState(""); // 사용자 비밀번호
  const [error, setError] = useState("");       // 에러 메시지 상태

  // --------------------------------------------------
  // 회원가입 처리 함수
  // --------------------------------------------------
  const handleRegister = (e) => {
    e.preventDefault(); // form 기본 제출 동작(새로고침) 막기
    setError("");       // 기존 에러 메시지 초기화

    // 1. 유효성 검사 (빈 값 체크)
    if (!username || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return; // 조건 만족하지 않으면 함수 종료
    }

    // 2. AuthContext의 register 함수 실행
    // - 성공 시 true 반환
    // - 실패 시 false 반환
    const success = register(username, password);

    if (success) {
      // 회원가입 성공 시 알림
      // 보통은 여기서 navigate("/login") 같은 코드로 로그인 페이지 이동
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    } else {
      // 이미 동일한 아이디가 존재하는 경우
      setError("이미 사용 중인 아이디입니다.");
    }
  };

  // --------------------------------------------------
  // UI 렌더링
  // --------------------------------------------------
  return (
    // 화면 전체를 세로/가로 중앙 정렬한 배경
    <div className="h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50 flex items-center justify-center p-4">
      
      {/* 카드 형태의 회원가입 박스 */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-xl p-8">
        
        {/* 페이지 타이틀 */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          회원가입
        </h2>

        {/* 에러 메시지 (조건부 렌더링) */}
        {/* error 값이 있으면 빨간색 텍스트로 표시 */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        {/* --------------------------------------------------
            회원가입 입력 폼
            -------------------------------------------------- */}
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          
          {/* 아이디 입력창 */}
          <input
            type="text"
            placeholder="아이디"
            className="border px-4 py-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 입력할 때 상태 업데이트
          />

          {/* 비밀번호 입력창 */}
          <input
            type="password"
            placeholder="비밀번호"
            className="border px-4 py-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 입력할 때 상태 업데이트
          />

          {/* 회원가입 버튼 */}
          {/* type="submit" → form의 onSubmit 실행 */}
          <Button type="submit" className="bg-green-600 text-white">
            회원가입
          </Button>
        </form>

        {/* --------------------------------------------------
            하단 안내문구
            --------------------------------------------------
            - 이미 계정이 있는 경우 로그인 페이지로 이동할 수 있도록 Link 제공
            -------------------------------------------------- */}
        <p className="mt-4 text-center text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

// 컴포넌트 export (다른 곳에서 import 가능)
export default RegisterPage;
