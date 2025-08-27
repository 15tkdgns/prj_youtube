// src/pages/ScrapbookPage.jsx
// 기능 요약
// - 유튜브 URL을 추가/표시/삭제
// - 각 카드의 하단 버튼을 「…」 토글 메뉴로 변경 (수정, 삭제 제공)
// - 수정: 간단히 prompt 로 URL 교체 (원하면 모달로 확장 가능)

import { useState, useEffect } from "react";
import Button from "../components/common/Button";
// (선택) 유틸을 쓰고 싶다면 아래 라인 사용
import { getThumbnailUrl } from "../utils/youtube";

export default function ScrapbookPage() {
  // 입력창의 URL 값
  const [videoUrl, setVideoUrl] = useState("");
  // 저장된 URL 리스트 (문자열 배열로 운용) — 기존과 호환
  const [videos, setVideos] = useState([]);
  // 열려있는 케밥(…) 메뉴의 인덱스 (없으면 null)
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // 1) 마운트 시 localStorage → 상태로 가져오기
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("scrapbook")) || [];
    setVideos(stored);
  }, []);

  // 2) URL 추가
  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      alert("유튜브 URL을 입력해주세요!");
      return;
    }
    const updated = [...videos, videoUrl.trim()];
    setVideos(updated);
    localStorage.setItem("scrapbook", JSON.stringify(updated));
    setVideoUrl("");
  };

  // 3) URL 삭제
  const handleRemoveVideo = (index) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
    localStorage.setItem("scrapbook", JSON.stringify(updated));
    setOpenMenuIndex(null); // 메뉴 닫기
  };

  // 4) URL 수정 (간단히 prompt 사용)
  const handleEditVideo = (index) => {
    const current = videos[index];
    const next = window.prompt("새 YouTube URL을 입력하세요.", current);
    if (next == null) return; // 취소
    const trimmed = next.trim();
    if (!trimmed) {
      alert("빈 URL은 저장할 수 없습니다.");
      return;
    }
    const updated = videos.map((v, i) => (i === index ? trimmed : v));
    setVideos(updated);
    localStorage.setItem("scrapbook", JSON.stringify(updated));
    setOpenMenuIndex(null); // 메뉴 닫기
  };

  // 5) 유튜브 썸네일 URL 생성 (utils 사용)
  const getThumb = (url) => getThumbnailUrl(url);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50 p-8 flex flex-col items-center">
      {/* 타이틀 */}
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">📒 나의 스크랩북</h2>

      {/* URL 입력 + 추가 버튼 */}
      <div className="flex mb-8 w-full max-w-xl shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <input
          type="text"
          placeholder="유튜브 URL 입력"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
        />
        <button
          onClick={handleAddVideo}
          className="bg-green-500 text-white px-6 font-semibold hover:bg-green-600 transition-colors whitespace-nowrap"
        >
          추가
        </button>
      </div>

      {/* 리스트 */}
      {videos.length === 0 ? (
        <p className="text-gray-500 italic">저장된 영상이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {videos.map((url, index) => (
            // 카드: 메뉴를 카드 기준 absolute 로 배치하므로 relative 필요
            <div
              key={index}
              className="relative bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              {/* 썸네일 */}
              {getThumb(url) && (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={getThumb(url)}
                    alt="thumbnail"
                    className="w-full hover:scale-105 transition-transform duration-300"
                  />
                </a>
              )}

              {/* 하단: URL + 케밥 메뉴 버튼 */}
              <div className="flex justify-between items-center p-3">
                <p className="truncate w-60 text-sm text-gray-600">{url}</p>

                {/* 케밥(…) 버튼: 클릭 시 해당 카드의 메뉴 열기/닫기 */}
                <button
                  aria-haspopup="menu"
                  aria-expanded={openMenuIndex === index}
                  onClick={() =>
                    setOpenMenuIndex((prev) => (prev === index ? null : index))
                  }
                  className="w-8 h-8 grid place-items-center rounded-md border text-gray-600 hover:bg-gray-50"
                  title="메뉴 열기"
                >
                  {/* 유니코드 ⋯ */}
                  <span className="text-lg leading-none">⋯</span>
                </button>

                {/* 드롭다운 메뉴 */}
                {openMenuIndex === index && (
                  <div
                    role="menu"
                    className="absolute right-3 bottom-12 w-28 bg-white border rounded-lg shadow-lg z-10 overflow-hidden"
                  >
                    <button
                      role="menuitem"
                      onClick={() => handleEditVideo(index)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      수정
                    </button>
                    <button
                      role="menuitem"
                      onClick={() => handleRemoveVideo(index)}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 홈으로 이동 버튼 */}
      <Button to="/" className="bg-blue-600 text-white mt-10 px-6 py-3 rounded-lg shadow hover:bg-blue-700">
        홈으로 돌아가기
      </Button>
    </div>
  );
}
