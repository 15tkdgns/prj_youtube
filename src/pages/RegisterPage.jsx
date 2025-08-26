// --------------------------------------------------
// 필요한 라이브러리 및 컴포넌트 import
// --------------------------------------------------
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
// Link : 다른 페이지로 이동할 때 사용하는 컴포넌트
// useNavigate : 자바스크립트 코드에서 특정 경로로 이동할 때 사용

import Button from '../components/common/Button'; 
// 프로젝트 공용 버튼 컴포넌트

import { useAuth } from '../contexts/AuthContext'; 
// AuthContext에서 제공하는 회원가입/로그인 관련 함수 사용하기 위한 훅

// --------------------------------------------------
// RegisterPage 컴포넌트
// --------------------------------------------------
const RegisterPage = () => {
  // AuthContext에서 register 함수 가져오기
  const { register } = useAuth();

  // useNavigate 훅을 이용해 코드에서 페이지 이동 가능
  const navigate = useNavigate();

  // 입력값과 에러 메시지를 관리할 상태
  const [username, setUsername] = useState(''); // 아이디 입력값
  const [password, setPassword] = useState(''); // 비밀번호 입력값
  const [error, setError] = useState('');       // 에러 메시지

  // --------------------------------------------------
  // 회원가입 처리 함수
  // --------------------------------------------------
  const handleRegister = (e) => {
    e.preventDefault(); // form 제출 시 페이지 새로고침 방지
    setError('');       // 기존 에러 초기화

    // 1. 유효성 검사 (아이디/비밀번호가 모두 입력되었는지 확인)
    if (!username || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 2. register 함수 호출 → true(성공) / false(실패) 반환
    const success = register(username, password);

    if (success) {
      // 회원가입 성공 시
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      navigate('/login'); // 로그인 페이지로 강제 이동
    } else {
      // 이미 동일한 아이디가 존재하는 경우
      setError('이미 사용 중인 아이디입니다.');
    }
  };

  // --------------------------------------------------
  // UI 렌더링
  // --------------------------------------------------
  return (
    // 화면 전체 영역 (세로/가로 중앙 정렬 + 그라데이션 배경)
    <div className="h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50 flex items-center justify-center p-4">
      
      {/* 회원가입 카드 박스 */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-xl p-8">
        
        {/* 회원가입 제목 */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
          회원가입
        </h2>

        {/* 에러 메시지 출력 (조건부 렌더링) */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        {/* --------------------------------------------------
            회원가입 입력 폼
            -------------------------------------------------- */}
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          
          {/* 아이디 입력 필드 */}
          <input
            type="text"
            placeholder="아이디"
            className="border px-4 py-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 입력될 때 상태 업데이트
          />

          {/* 비밀번호 입력 필드 */}
          <input
            type="password"
            placeholder="비밀번호"
            className="border px-4 py-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 입력될 때 상태 업데이트
          />

          {/* 회원가입 버튼 */}
          {/* type="submit" → form 제출 이벤트 트리거 */}
          <Button type="submit" className="bg-green-600 text-white">
            회원가입
          </Button>
        </form>

        {/* --------------------------------------------------
            하단 안내문구
            --------------------------------------------------
            이미 계정이 있는 경우 → 로그인 페이지로 이동할 수 있도록 안내
            react-router-dom의 Link 사용
            -------------------------------------------------- */}
        <p className="mt-4 text-center text-gray-500">
          이미 계정이 있으신가요?{' '}
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
