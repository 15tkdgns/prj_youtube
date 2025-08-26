// src/pages/HomePage.jsx
import { useState, useEffect } from "react";

// 공통 버튼
import Button from "../components/common/Button";

// 동영상 리스트
import VideoList from "../components/features/Scrapbook/VideoList";

// 인증 컨텍스트 (로그인 여부/로그아웃)
import { useAuth } from "../contexts/AuthContext";

// 인증 폼 (모달 내부에서 재사용)
import AuthForm from "../components/features/Auth/AuthForm";

// YouTube API
import { getPopularVideos, searchVideos } from "../api/youtubeApi";

export default function HomePage() {
  // 동영상/카테고리 상태
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const categories = ["전체", "게임", "음악", "영화"];

  // 인증 상태/액션
  const { isAuthenticated, logout } = useAuth();

  // 로그인/회원가입 모달 제어
  // null | "login" | "register"
  const [authMode, setAuthMode] = useState(null);
  const closeAuth = () => setAuthMode(null);

  // 폼 동작 성공 시 콜백
const handleAuthSuccess = (type) => {
  if (type === "register") {
    alert("회원가입 성공!");
    setAuthMode("login"); // 회원가입 후 로그인 모드로 전환 (원하면 닫기로 변경 가능)
  } else {
    alert("로그인 성공!");
    closeAuth(); // 모달 닫기
  }
};

  // 카테고리별 영상 불러오기
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const list =
        selectedCategory === "전체"
          ? await getPopularVideos()
          : await searchVideos(selectedCategory);
      setVideos(list);
      setLoading(false);
    };
    fetchVideos();
  }, [selectedCategory]);

  return (
    <div className="flex w-full">
      {/* 사이드바 */}
      <aside className="w-60 bg-gray-100 p-4">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer hover:text-red-500 ${
                selectedCategory === category ? "font-bold text-red-500" : ""
              }`}
            >
              {category === "게임" && "🎮 "}
              {category === "음악" && "🎵 "}
              {category === "영화" && "🎬 "}
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-6 bg-white">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Welcome to YouTube Scrapbook 🎬
          </h1>

          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <Button to="/scrapbook" className="bg-purple-600">
                  스크랩북
                </Button>
                <Button onClick={logout} className="bg-red-600">
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setAuthMode("login")} className="bg-blue-600">
                  로그인
                </Button>
                <Button
                  onClick={() => setAuthMode("register")}
                  className="bg-green-600"
                >
                  회원가입
                </Button>
              </>
            )}
          </div>
        </div>

        {/* 선택된 카테고리 제목 */}
        <h2 className="text-xl font-semibold mb-4">
          {selectedCategory === "전체"
            ? "대한민국 인기 동영상"
            : `${selectedCategory} 관련 동영상`}
        </h2>

        {/* 리스트/로딩 */}
        {loading ? (
          <p className="text-center">영상을 불러오는 중입니다...</p>
        ) : (
          <VideoList videos={videos} />
        )}
      </main>

      {/* 인증 모달 */}
      {authMode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={closeAuth}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="close"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-4 text-center">
              {authMode === "login" ? "로그인" : "회원가입"}
            </h3>

            {/* AuthForm은 onSuccess 콜백을 받을 수 있어야 합니다 */}
            <AuthForm mode={authMode} onSuccess={handleAuthSuccess} />

            {authMode === "login" ? (
              <p className="mt-3 text-center text-sm text-gray-500">
                아직 계정이 없으신가요?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setAuthMode("register")}
                >
                  회원가입
                </button>
              </p>
            ) : (
              <p className="mt-3 text-center text-sm text-gray-500">
                이미 계정이 있으신가요?{" "}
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setAuthMode("login")}
                >
                  로그인
                </button>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
