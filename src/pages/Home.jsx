import React, { useEffect, useState } from "react";
import GalaxyMap from "../components/GalaxyMap";
import CommitHeatmap from "../components/CommitHeatmap";
import { getCommitStars } from "../github/getCommitStars";
import { getRecentCommits } from "../github/getRecentCommits";

import "./Home.css";

const Home = () => {
  const [commitCount, setCommitCount] = useState(0);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    // 오늘 커밋 수
    async function fetchCount() {
      const count = await getCommitStars("jinyorjin");
      setCommitCount(count);
    }

    // 최근 30일 커밋 데이터
    async function fetchHeatmap() {
      const data = await getRecentCommits("jinyorjin"); // 최근 7일 → 확장 가능
      setHeatmapData(data);
    }

    fetchCount();
    fetchHeatmap();
  }, []);
  // 🔧 테스트용 dummy (확실히 별이 보이는지 확인용)
  const dummy = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return {
      date: d.toISOString().split("T")[0],
      commits: Math.floor(Math.random() * 6),
      messages: [],
    };
  });
  return (
    <div className="home-container">
      <GalaxyMap recentCommits={heatmapData} />

      <h1 className="main-title">My Coding Journey</h1>
      <p className="subtitle">Turn your daily progress into constellations.</p>
      <p className="commit-subtle">🔥 {commitCount} commits today</p>

      <CommitHeatmap data={heatmapData} />
    </div>
  );
};

export default Home;
