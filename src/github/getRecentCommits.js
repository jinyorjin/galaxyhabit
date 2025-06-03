// 비동기 함수: GitHub에서 최근 커밋 정보를 가져오는 함수
export async function getRecentCommits(username) {
  // GitHub API 호출: 해당 유저의 이벤트 데이터를 가져옴
  const res = await fetch(`https://api.github.com/users/${username}/events`);

  // 받아온 응답(res)을 JSON 형태로 변환하여 사용
  const events = await res.json();

  // 날짜별로 커밋 수와 메시지를 저장할 객체
  const commitsPerDay = {};

  // 이벤트 배열 반복 처리
  for (let event of events) {
    // 이벤트 타입이 "PushEvent"일 때만 처리 (푸시한 커밋만 대상)
    if (event.type === "PushEvent") {
      // created_at: 이벤트가 발생한 날짜/시간
      // 날짜만 추출 (예: "2024-06-03T12:00:00Z" → "2024-06-03")
      const date = new Date(event.created_at).toISOString().split("T")[0];

      // 커밋 메시지들만 배열로 추출 (배열 형태)
      const messages = event.payload.commits.map((c) => c.message);

      // 해당 날짜에 처음 등장한 경우 초기값 설정
      if (!commitsPerDay[date]) {
        commitsPerDay[date] = { count: 0, messages: [] };
      }

      // 해당 날짜의 커밋 수 누적
      commitsPerDay[date].count += messages.length;

      // 해당 날짜의 메시지 목록에 추가
      commitsPerDay[date].messages.push(...messages);
    }
  }

  // 최근 7일 동안의 데이터를 담을 배열
  const recent7 = [];

  // 오늘 날짜 기준으로 6일 전부터 오늘까지 반복 (총 7일)
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    // i일 전의 날짜 계산
    const day = new Date(today);
    day.setDate(today.getDate() - i);

    // 날짜를 문자열(YYYY-MM-DD) 형식으로 변환
    const key = day.toISOString().split("T")[0];

    // 해당 날짜에 커밋이 없으면 기본값 설정 (count 0, 메시지 없음)
    const data = commitsPerDay[key] || { count: 0, messages: [] };

    // 최근 7일 배열에 날짜별 데이터 추가
    recent7.push({ date: key, commits: data.count, messages: data.messages });
  }

  // 결과 반환: [{ date: "2024-06-01", commits: 2, messages: ["fix bug", "add UI"] }, ...]
  return recent7;
}
