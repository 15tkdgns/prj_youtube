// --------------------------------------------------
// 컴포넌트 import
// --------------------------------------------------

// 공용 버튼 컴포넌트 (프로젝트 내에서 공통으로 쓰는 버튼 UI)
import Button from "../components/common/Button";

// VideoList 컴포넌트 (추천 영상 목록을 출력하는 역할)
// 실제 프로젝트 구조에 맞게 import 경로를 수정해야 함
import VideoList from "../components/features/Scrapbook/VideoList"; 

// --------------------------------------------------
// HomePage 컴포넌트
// --------------------------------------------------
// 앱의 메인 홈 화면을 구성하는 컴포넌트
// 좌측에 카테고리 메뉴, 우측에 추천 영상 리스트를 보여주는 구조
export default function HomePage() {
  // --------------------------------------------------
  // 임시로 사용할 샘플 영상 데이터
  // 실제로는 API 호출을 통해 가져오거나 DB에서 불러오게 됨
  // id: 고유 번호, title: 영상 제목, channel: 업로더 이름
  const sampleVideos = [
    { id: 1, title: "React 강의", channel: "코딩유튜버" },
    { id: 2, title: "게임 리뷰", channel: "게임유튜버" },
    { id: 3, title: "음악 모음", channel: "음악유튜버" },
  ];

  return (
    // 전체 레이아웃을 flexbox로 배치
    // 왼쪽은 aside(사이드 메뉴), 오른쪽은 main(메인 콘텐츠)
    <div className="flex w-full">
      
      {/* --------------------------------------------------
          사이드바 (왼쪽 메뉴 영역)
          -------------------------------------------------- */}
      <aside className="w-60 bg-gray-100 p-4">
        <ul className="space-y-2">
          {/* 카테고리 메뉴 리스트 */}
          {/* hover 시 글자색이 빨간색으로 바뀌게 설정 */}
          <li className="cursor-pointer hover:text-red-500">전체</li>
          <li className="cursor-pointer hover:text-red-500">🎮 게임</li>
          <li className="cursor-pointer hover:text-red-500">🎵 음악</li>
          <li className="cursor-pointer hover:text-red-500">🎬 영화</li>
        </ul>
      </aside>

      {/* --------------------------------------------------
          메인 콘텐츠 영역 (오른쪽)
          -------------------------------------------------- */}
      <main className="flex-1 p-6 bg-white">
        
        {/* 상단 영역 : 제목 + 로그인/회원가입 버튼 */}
        <div className="flex justify-between items-center mb-6">
          
          {/* 홈페이지 메인 타이틀 */}
          <h1 className="text-3xl font-bold">
            Welcome to YouTube Scrapbook 🎬
          </h1>
          
          {/* 버튼 영역 */}
          {/* flex gap-4 → 버튼 사이에 여백 주기 */}
          <div className="flex gap-4">
            
            {/* 로그인 버튼 */}
            {/* Button 컴포넌트는 내부적으로 react-router-dom의 Link를 사용해서
                "/login" 경로로 이동할 수 있게 만들어져 있음 */}
            <Button to="/login" className="bg-blue-600">
              로그인
            </Button>
            
            {/* 회원가입 버튼 */}
            {/* "/register" 경로로 이동 */}
            <Button to="/register" className="bg-green-600">
              회원가입
            </Button>
          </div>
        </div>
        
        {/* 추천 영상 섹션 제목 */}
        <h2 className="text-xl font-semibold mb-4">추천 영상</h2>
        
        {/* 영상 목록 출력 */}
        {/* VideoList 컴포넌트에 props로 sampleVideos 배열을 전달 */}
        <VideoList videos={sampleVideos} />
      </main>
    </div>
  );
}
