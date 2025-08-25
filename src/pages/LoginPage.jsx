import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 성공 가정 (기능 유지)
    localStorage.setItem("isLoggedIn", "true");
    navigate("/menu");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-rose-50 via-white to-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">유튜브 스크랩북</h1>
            <p className="text-sm text-gray-500">내가 원하는 영상을 한곳에</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">로그인</h2>
        <p className="text-sm text-gray-500 mb-6">
          버튼을 눌러 시작해요.
        </p>

        <Button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white h-11 rounded-lg shadow hover:shadow-md">
            로그인하기
        </Button>
      </div>
    </div>
  );
}
