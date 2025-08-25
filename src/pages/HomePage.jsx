// React 훅 import
import { useState, useEffect } from "react";

// 공통 버튼 컴포넌트 import
import Button from "../components/common/Button";

// 동영상 리스트 컴포넌트 import
import VideoList from "../components/features/Scrapbook/VideoList";

// YouTube API 함수 import
// - getPopularVideos: 인기 동영상 가져오기
// - searchVideos: 검색 키워드 기반 동영상 가져오기
import { getPopularVideos, searchVideos } from "../api/youtubeApi";

/**
 * HomePage 컴포넌트
 * - 홈페이지 메인 화면
 * - 사이드바 카테고리 선택, 동영상 리스트 표시, 로그인/회원가입 버튼 포함
 */
export default function HomePage() {
  // 상태 관리
  const [videos, setVideos] = useState([]);                 // 현재 보여줄 동영상 배열
  const [loading, setLoading] = useState(true);           // 동영상 로딩 상태
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 카테고리

  // 사이드바에 표시할 카테고리 배열
  const categories = ["전체", "게임", "음악", "영화"]; // 필요시 '코딩' 등 추가 가능

  /**
   * useEffect 훅
   * - selectedCategory가 바뀔 때마다 실행
   * - 동영상 API 호출 후 상태 업데이트
   */
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true); // 로딩 시작

      let newVideos = [];
      if (selectedCategory === "전체") {
        // '전체' 선택 시 인기 동영상 가져오기
        newVideos = await getPopularVideos();
      } else {
        // 특정 카테고리 선택 시 검색
        newVideos = await searchVideos(selectedCategory);
      }

      setVideos(newVideos); // 가져온 동영상 상태로 저장
      setLoading(false);    // 로딩 완료
    };

    fetchVideos(); // 비동기 함수 실행
  }, [selectedCategory]); // selectedCategory가 바뀔 때마다 실행

  return (
    // 페이지 전체를 flex 레이아웃으로 구성
    <div className="flex w-full">
      
      {/* 사이드바 영역 */}
      <aside className="w-60 bg-gray-100 p-4">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category} // React에서 리스트 렌더링 시 필수 key
              onClick={() => setSelectedCategory(category)} // 클릭 시 카테고리 변경
              className={`cursor-pointer hover:text-red-500 ${
                selectedCategory === category ? "font-bold text-red-500" : ""
              }`}
              /*
                cursor-pointer: 마우스 커서가 손가락 모양으로 변경
                hover:text-red-500: 마우스 오버 시 글자 빨간색
                font-bold text-red-500: 현재 선택된 카테고리 강조
              */
            >
              {/* 카테고리별 이모지 표시 */}
              {category === '게임' && '🎮 '}
              {category === '음악' && '🎵 '}
              {category === '영화' && '🎬 '}
              {category} {/* 실제 카테고리 이름 표시 */}
            </li>
          ))}
        </ul>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 p-6 bg-white">
        {/* 헤더 영역: 페이지 타이틀 + 로그인/회원가입 버튼 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Welcome to YouTube Scrapbook 🎬
          </h1>
          <div className="flex gap-4">
            {/* 커스텀 Button 컴포넌트 사용 */}
            <Button to="/login" className="bg-blue-600">로그인</Button>
            <Button to="/register" className="bg-green-600">회원가입</Button>
          </div>
        </div>

        {/* 선택된 카테고리 제목 */}
        <h2 className="text-xl font-semibold mb-4">
          {selectedCategory === "전체"
            ? "대한민국 인기 동영상"
            : `${selectedCategory} 관련 동영상`}
        </h2>

        {/* 동영상 리스트 또는 로딩 메시지 */}
        {loading ? (
          // 동영상 불러오는 중일 때
          <p className="text-center">영상을 불러오는 중입니다...</p>
        ) : (
          // 동영상 불러오기 완료 시 VideoList 컴포넌트로 전달
          <VideoList videos={videos} />
        )}
      </main>
    </div>
  );
}
