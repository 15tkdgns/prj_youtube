// utils/youtube.js에서 getThumbnailUrl 함수를 가져옵니다.
// 이 함수는 유튜브 URL을 받아 썸네일 이미지 URL을 반환합니다.
import { getThumbnailUrl } from "../../../utils/youtube";

/**
 * VideoItem 컴포넌트
 * - 단일 동영상 정보를 카드 형태로 보여줍니다.
 * - 클릭하면 유튜브 동영상이 새 탭에서 열립니다.
 * @param {Object} props
 * @param {Object} props.video - 표시할 동영상 객체 (id, title, channel, url, category 등 포함)
 */
export default function VideoItem({ video }) {
  // 동영상 URL에서 썸네일 URL 추출
  const thumbnailUrl = getThumbnailUrl(video.url);

  return (
    // a 태그를 사용하여 클릭 시 새 탭에서 유튜브 영상 열기
    <a
      href={video.url}                  // 이동할 유튜브 동영상 URL
      target="_blank"                   // 새 탭에서 열기
      rel="noopener noreferrer"         // 보안/성능 관련 속성
      // Tailwind CSS 클래스 적용
      className="block bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
      // block: div처럼 블록 요소로 표시
      // bg-white: 배경 흰색
      // border: 테두리 기본 스타일
      // rounded-lg: 모서리 둥글게
      // shadow-sm: 기본 그림자
      // hover:shadow-md: 마우스 오버 시 그림자 강화
      // transition-shadow: 그림자 변화에 부드러운 애니메이션
    >
      {/* 썸네일 이미지를 감싸는 영역 */}
      <div className="aspect-video bg-gray-200 overflow-hidden rounded-t-lg">
        {/* 
          aspect-video: 16:9 비율 유지
          bg-gray-200: 로딩 중 배경 회색
          overflow-hidden: 이미지가 영역을 넘으면 숨김
          rounded-t-lg: 상단 모서리 둥글게
        */}
        <img
          src={thumbnailUrl || `https://via.placeholder.com/400x225?text=${video.title}`}
          alt={video.title}                  // 이미지 접근성용 텍스트
          className="w-full h-full object-cover hover:scale-105 transition-transform"
          // w-full: 가로 100% 채우기
          // h-full: 세로 100% 채우기
          // object-cover: 비율 유지하며 영역 가득 채우기
          // hover:scale-105: 마우스 오버 시 5% 확대
          // transition-transform: 확대 애니메이션 부드럽게
        />
      </div>

      {/* 제목과 채널명을 보여주는 영역 */}
      <div className="p-3">
        {/* 제목 */}
        <h3 className="font-semibold text-gray-800 line-clamp-2">
          {/* 
            font-semibold: 약간 두껍게
            text-gray-800: 진한 회색 글씨
            line-clamp-2: 최대 2줄로 줄이고 ... 표시
          */}
          {video.title}
        </h3>
        {/* 채널명 */}
        <p className="text-sm text-gray-500 mt-1">
          {/* 
            text-sm: 작은 글씨
            text-gray-500: 연한 회색
            mt-1: 제목과 채널명 사이 약간 여백
          */}
          {video.channel}
        </p>
      </div>
    </a>
  );
}