import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 성공 가정
    localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장
    navigate("/menu"); // 메뉴 페이지 이동
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-6">로그인 페이지</h2>
      <Button onClick={handleLogin} className="bg-green-600">
        로그인하기
      </Button>
    </div>
  );
}
