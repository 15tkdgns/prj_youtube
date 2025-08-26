// axios 라이브러리 임포트
// HTTP 요청을 쉽게 보내기 위해 사용합니다.
import axios from 'axios';

// 유튜브 API를 사용하기 위한 개인 API 키
const API_KEY = 'AIzaSyDgJZMNOtA7dLzQuW94XaxcV59GCZvFlTU';

// 유튜브 데이터 API v3 기본 URL
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * 대한민국 인기 동영상 목록을 가져오는 함수
 * - 홈 화면 '전체' 카테고리에 표시할 용도로 사용
 * - YouTube API 'videos' 엔드포인트 사용
 * @returns {Promise<Array>} 인기 동영상 목록 (각 동영상은 id, title, channel, url, category 포함)
 */
export const getPopularVideos = async () => {
  try {
    // axios GET 요청
    const response = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'snippet',        // snippet: 동영상 제목, 채널명 등 기본 정보
        chart: 'mostPopular',   // chart: 'mostPopular'로 인기 동영상 조회
        maxResults: 12,         // 한 번에 가져올 동영상 수 (최대 50)
        regionCode: 'KR',       // KR: 대한민국 기준
        key: API_KEY,           // 인증용 API 키
      },
    });

    // API 응답 데이터에서 필요한 정보만 추출하여 가공
    // response.data.items: 실제 동영상 데이터 배열
    const videos = response.data.items.map(item => ({
      id: item.id,                           // 동영상 고유 ID
      title: item.snippet.title,             // 동영상 제목
      channel: item.snippet.channelTitle,    // 채널명
      url: `https://www.youtube.com/watch?v=${item.id}`, // 바로가기 URL
      category: '인기 영상',                 // 카테고리 표시용 문자열
    }));

    return videos; // 가공된 동영상 배열 반환

  } catch (error) {
    // 요청 실패 시 콘솔에 오류 출력
    console.error('YouTube 인기 동영상을 가져오는 중 오류 발생:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};

/**
 * 특정 키워드로 동영상을 검색하는 함수
 * - 카테고리별 동영상 조회에 사용
 * - YouTube API 'search' 엔드포인트 사용
 * @param {string} query - 검색할 키워드 (예: "게임", "음악")
 * @returns {Promise<Array>} 검색 결과 동영상 목록
 */
export const searchVideos = async (query) => {
  try {
    // axios GET 요청
    const response = await axios.get(`${YOUTUBE_API_URL}/search`, {
      params: {
        part: 'snippet',   // snippet: 동영상 기본 정보
        q: query,          // 검색 키워드
        maxResults: 12,    // 가져올 동영상 수
        type: 'video',     // 동영상만 검색 (채널/플레이리스트 제외)
        key: API_KEY,      // 인증용 API 키
      },
    });

    // 검색 결과 구조가 다르기 때문에 별도로 가공
    // response.data.items: 검색 결과 배열
    // 각 item의 id.videoId: 동영상 고유 ID
    const videos = response.data.items.map(item => ({
      id: item.id.videoId,                     // 동영상 ID
      title: item.snippet.title,               // 제목
      channel: item.snippet.channelTitle,      // 채널명
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`, // URL
      category: query,                         // 검색어를 카테고리로 활용
    }));

    return videos; // 가공된 검색 결과 반환

  } catch (error) {
    // 검색 실패 시 오류 출력
    console.error(`'${query}' 검색 중 오류 발생:`, error);
    return []; // 오류 발생 시 빈 배열 반환
  }
};
