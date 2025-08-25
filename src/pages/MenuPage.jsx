import Button from "../components/common/Button";

export default function MenuPage() {
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h2 className="text-2xl font-bold mb-6">메뉴 선택</h2>
      <Button to="/scrapbook" className="bg-blue-500">📒 스크랩북 보기</Button>
      <Button to="/profile" className="bg-purple-500">👤 내 프로필</Button>
      <Button to="/settings" className="bg-gray-500">⚙ 설정</Button>
      <Button to="/" onClick={handleLogout} className="bg-red-500">🏠 홈으로 (로그아웃)</Button>
    </div>
  );
}
