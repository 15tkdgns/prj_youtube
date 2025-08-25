import Button from "../components/common/Button";

export default function SettingsPage() {
  return (
    <div className="p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">⚙ 설정 페이지</h2>
      <p className="mb-4">설정 옵션 예시</p>
      <Button to="/menu" className="bg-blue-500">메뉴로 돌아가기</Button>
    </div>
  );
}
