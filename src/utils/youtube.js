// YouTube URL에서 비디오 ID를 추출하는 함수
function getVideoId(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    }
    return urlObj.searchParams.get("v");
  } catch (e) {
    console.error("Invalid URL", e);
    return null;
  }
}

// 비디오 ID를 사용해 썸네일 URL을 생성하는 함수
export function getThumbnailUrl(url) {
  const videoId = getVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
}