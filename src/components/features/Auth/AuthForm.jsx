/**
 * AuthForm
 * - 로그인/회원가입을 하나의 컴포넌트에서 공용으로 처리합니다.
 *
 * Props
 * - mode: "login" | "register"
 *   - "login"  → 로그인 폼으로 동작
 *   - "register" → 회원가입 폼으로 동작
 * - onSuccess?: (type: "login" | "register") => void
 *   - 인증이 성공했을 때 상위 컴포넌트(HomePage 등)로 결과를 알려줍니다.
 *   - 상위는 이 콜백을 이용해 모달을 닫거나, 알림을 띄우거나, 다음 동작을 제어할 수 있습니다.
 *
 * 동작 개요
 * 1) 입력값을 내부 state로 관리(제어 컴포넌트)
 * 2) 제출 시 mode에 따라 login/register 중 하나를 실행
 * 3) 실패 시 error 메시지를 화면에 표시
 * 4) 성공 시 onSuccess 콜백 호출 (상위에서 UI 제어)
 */

import { useState } from "react";
// AuthContext에서 로그인/회원가입 함수를 가져옵니다.
// 경로는 현재 프로젝트 구조(components/common/features/Auth/AuthForm.jsx 기준)에 맞춘 상대경로입니다.
import { useAuth } from "../../../contexts/AuthContext";

export default function AuthForm({ mode = "login", onSuccess }) {
  // 전역 인증 컨텍스트에서 동작 함수를 가져옵니다.
  const { login, register } = useAuth();

  // 입력값을 제어하기 위한 상태들
  const [username, setUsername] = useState(""); // 아이디
  const [password, setPassword] = useState(""); // 비밀번호

  // 사용자에게 표시할 에러 메시지
  const [error, setError] = useState("");

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼의 기본 동작(페이지 새로고침) 방지
    setError("");       // 이전 에러 초기화

    if (mode === "login") {
      // 로그인 시도
      const ok = login(username, password);

      if (!ok) {
        // 로그인 실패: 아이디/비밀번호가 일치하지 않음
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        return;
      }

      // 로그인 성공: 상위로 알림 → 상위(HomePage 등)에서 모달 닫기/알림 처리
      onSuccess && onSuccess("login");
    } else {
      // 회원가입 시도
      const ok = register(username, password);

      if (!ok) {
        // 회원가입 실패: 이미 존재하는 아이디
        setError("이미 사용 중인 아이디입니다.");
        return;
      }

      // 회원가입 성공: 상위로 알림 → 보통 로그인 모드로 전환/알림 노출
      onSuccess && onSuccess("register");
    }
  };

  return (
    // onSubmit에 위의 핸들러 연결
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      {/* 에러 메시지는 있을 때만 표시합니다. role="alert"로 스크린리더 접근성 개선 */}
      {error && (
        <p className="text-red-500 text-sm text-center" role="alert">
          {error}
        </p>
      )}

      {/* 아이디 입력: 제어 컴포넌트(값과 onChange로 상태를 동기화) */}
      <input
        type="text"
        placeholder="아이디"
        className="border px-4 py-2 rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"   // 브라우저 자동완성 힌트
        required                  // 공백 제출 방지
      />

      {/* 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호"
        className="border px-4 py-2 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        required
      />

      {/* 제출 버튼: 라벨은 모드에 따라 동적으로 변경, 접근성용 aria-label 추가 */}
      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded-lg shadow hover:shadow-md"
        aria-label={mode === "login" ? "로그인하기" : "회원가입"}
      >
        {mode === "login" ? "로그인하기" : "회원가입"}
      </button>
    </form>
  );
}