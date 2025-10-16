import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Income ({ value }) {
  const data = {
    labels: ["Food", "Drink", "Others"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#4CAF50", "#FF9F40", "#FF3B30"],
        cutout: "70%",
      },
    ],
  };

  return (
    <div style={{ position: "relative", width: "250px", margin: "auto" }}>
      <Doughnut data={data} />
      <h4
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "700",
          color: "#333",
        }}
      >
        ${value / 1000}K
      </h4>
    </div>
  );
}
