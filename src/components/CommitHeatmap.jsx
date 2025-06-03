import React from "react";
import "./CommitHeatmap.css";

const CommitHeatmap = ({ data }) => {
  return (
    <div className="heatmap-container">
      {Array.from({ length: 7 }).map((_, row) => (
        <div className="heatmap-row" key={row}>
          {data
            .filter((_, i) => i % 7 === row)
            .map((day, idx) => (
              <div
                key={idx}
                className="star"
                data-commit={day.commits}
                title={`${day.date}\n${day.messages.join("\n")}`} // ✅ 메시지 출력
              ></div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default CommitHeatmap;
