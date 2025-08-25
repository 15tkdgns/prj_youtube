import Button from "../components/common/Button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to YouTube Scrapbook 🎬</h1>
      <Button to="/login" className="bg-blue-600">
        로그인
      </Button>
    </div>
  );
}
