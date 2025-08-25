    import Button from "../components/common/Button";

export default function ProfilePage() {
  return (
    <div className="p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">👤 내 프로필 페이지</h2>
      <p className="mb-4">사용자 정보 예시</p>
      <Button to="/menu" className="bg-blue-500">메뉴로 돌아가기</Button>
    </div>
  );
}
