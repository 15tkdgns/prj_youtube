import { useState, useEffect } from "react";
import Button from "../components/common/Button";

export default function ScrapbookPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);

  // 저장된 영상 불러오기
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("scrapbook")) || [];
    setVideos(stored);
  }, []);

  // 영상 추가
  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      alert("유튜브 URL을 입력해주세요!");
      return;
    }
    const updated = [...videos, videoUrl];
    setVideos(updated);
    localStorage.setItem("scrapbook", JSON.stringify(updated));
    setVideoUrl("");
  };

  // 영상 삭제
  const handleRemoveVideo = (index) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
    localStorage.setItem("scrapbook", JSON.stringify(updated));
  };

  // 유튜브 썸네일 URL 생성
  const getThumbnail = (url) => {
    try {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
    } catch {
      return null;
    }
  };

return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50 p-8 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
        📒 나의 스크랩북
      </h2>

      {/* 영상 URL 입력 */}
      <div className="flex mb-8 w-full max-w-xl shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <input
          type="text"
          placeholder="유튜브 URL 입력"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700" />
        <button
          onClick={handleAddVideo}
          className="bg-green-500 text-white px-6 font-semibold hover:bg-green-600 transition-colors whitespace-nowrap">
          추가
        </button>
      </div>

      {/* 영상 리스트 */}
      {videos.length === 0 ? (
        <p className="text-gray-500 italic">저장된 영상이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {videos.map((url, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              {getThumbnail(url) && (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={getThumbnail(url)}
                    alt="thumbnail"
                    className="w-full hover:scale-105 transition-transform duration-300"/>
                </a>
              )}
              <div className="flex justify-between items-center p-3">
                <p className="truncate w-60 text-sm text-gray-600">{url}</p>
                <button
                  onClick={() => handleRemoveVideo(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button to="/" className="bg-blue-600 text-white mt-10 px-6 py-3 rounded-lg shadow hover:bg-blue-700">
        홈으로 돌아가기
      </Button>
    </div>
  );
}