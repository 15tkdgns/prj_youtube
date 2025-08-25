// --------------------------------------------------
// 필요한 라이브러리 및 컴포넌트 import
// --------------------------------------------------
import { Link } from "react-router-dom"; 
// react-router-dom의 Link → 페이지 이동(라우팅)을 위한 컴포넌트

import AuthForm from "../components/features/Auth/AuthForm"; 
// 로그인/회원가입 입력폼을 담당하는 AuthForm 컴포넌트
// 경로가 프로젝트 구조와 정확히 일치하는지 확인 필요

// --------------------------------------------------
// LoginPage 컴포넌트
// --------------------------------------------------
// "로그인 화면"을 담당하는 페이지 컴포넌트
// UI: 중앙 배치된 카드 형태의 로그인 폼
export default function LoginPage() {
  return (
    // 화면 전체를 차지하는 div
    // h-screen : 높이를 화면 전체로
    // bg-gradient-to-br ... : 배경을 왼쪽 위→오른쪽 아래 방향 그라데이션
    // flex items-center justify-center : 내용물을 중앙 정렬
    // p-4 : 모바일 대응을 위한 좌우 여백
    <div className="h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50 flex items-center justify-center p-4">
      
      {/* 로그인 박스 (카드 형태) */}
      {/* w-full max-w-md : 최대 가로폭 768px, 반응형 대응 */}
      {/* bg-white/80 backdrop-blur : 반투명 흰색 배경 + 블러 효과 */}
      {/* border rounded-2xl shadow-xl : 테두리, 둥근 모서리, 그림자 */}
      {/* p-8 : 내부 여백 */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-xl p-8">
        
        {/* 로그인 박스 상단 - 서비스 이름/설명 */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">유튜브 스크랩북</h1>
          <p className="text-sm text-gray-500">내가 원하는 영상을 한곳에</p>
        </div>

        {/* 섹션 타이틀 (로그인) */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
          로그인
        </h2>

        {/* --------------------------------------------------
            AuthForm 컴포넌트
            --------------------------------------------------
            - 로그인/회원가입 공용 입력 폼
            - props로 mode를 전달해서 "login" 모드로 동작
              (회원가입 페이지에서는 mode="register"로 줄 수 있음)
            -------------------------------------------------- */}
        <AuthForm mode="login" />

        {/* --------------------------------------------------
            하단 안내문구
            --------------------------------------------------
            - 아직 계정이 없는 사용자를 위해 회원가입 페이지로 이동 유도
            - react-router-dom의 Link를 사용하여 /register 페이지로 이동
            -------------------------------------------------- */}
        <p className="mt-4 text-center text-gray-500">
          아직 계정이 없으신가요?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
