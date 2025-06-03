// GitHub 유저의 오늘 커밋 수를 가져오는 함수
export async function getCommitStars(username) {
  // 1. GitHub Events API 요청 (최근 활동 목록 가져오기)
  const res = await fetch(`https://api.github.com/users/${username}/events`);

  // 2. JSON 형식으로 변환
  const events = await res.json();

  // 3. 오늘 날짜를 YYYY-MM-DD 형식으로 추출
  const today = new Date().toLocaleDateString("en-CA"); // "2025-06-04"

  // 4. 커밋 총합을 저장할 변수
  let totalCommits = 0;

  // 5. 이벤트 배열 반복하면서 PushEvent 중 오늘 날짜인 것만 카운트
  events.forEach((event) => {
    const isPush = event.type === "PushEvent";
    const isToday = event.created_at.startsWith(today);

    if (isPush && isToday) {
      // 커밋 배열의 길이만큼 누적
      totalCommits += event.payload.commits.length;
    }
  });

  // 6. 최종 커밋 수 반환
  return totalCommits;
}
