import Button from "../components/common/Button";
import VideoList from "../components/features/Scrapbook/VideoList";
import { Link } from "react-router-dom";

export default function HomePage() {
  const sampleVideos = [
    { id: 1, title: "React 강의", channel: "코딩유튜버" },
    { id: 2, title: "게임 리뷰", channel: "게임유튜버" },
    { id: 3, title: "음악 모음", channel: "음악유튜버" },
  ];
  return (
    <div className="flex w-full">
      <aside className="w-60 bg-gray-100 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/category/all" className="hover:text-red-500">전체</Link>
          </li>
          <li>
            <Link to="/category/game" className="hover:text-red-500">🎮 게임</Link>
          </li>
          <li>
            <Link to="/category/music" className="hover:text-red-500">🎵 음악</Link>
          </li>
          <li>
            <Link to="/category/movie" className="hover:text-red-500">🎬 영화</Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold mb-4">추천 영상</h2>
          <h1 className="text-3xl font-bold mb-6">Welcome to YouTube Scrapbook 🎬</h1>
          <Button to="/login" className="bg-blue-600 text-white">
            로그인
          </Button>
        </div>
        <VideoList videos={sampleVideos} />
      </main>
    </div>
  );
}
