import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  const handleUpload = (e) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      alert("URL을 입력해주세요!");
      return;
    }

    // 기존 스크랩북 불러오기
    const scrapbook = JSON.parse(localStorage.getItem("scrapbook")) || [];
    scrapbook.push(videoUrl);
    localStorage.setItem("scrapbook", JSON.stringify(scrapbook));

    alert("영상이 스크랩북에 저장되었습니다!");
    setVideoUrl("");
    navigate("/scrapbook");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">영상 업로드</h2>

        <input
          type="text"
          placeholder="YouTube 영상 URL 입력"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          업로드
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
