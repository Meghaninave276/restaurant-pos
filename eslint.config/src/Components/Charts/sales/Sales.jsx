import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";
import { ButtonGroup, Button } from "react-bootstrap";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

export default function Sales() {
  const [period, setPeriod] = useState("daily");

  // 📊 Chart data based on period
  const chartData = {
    daily: {
      labels: ["11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM"],
      data: [20, 50, 90, 156, 120, 90, 60, 40],
    },
    monthly: {
      labels: [
        "Week 1",
        "Week 2",
        "Week 3",
        "Week 4"
      ],
      data: [800, 1250, 950, 1100],
    },
    yearly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      data: [12000, 15000, 11000, 18000, 21000, 19000, 22000, 24000, 20000, 23000, 25000, 27000],
    },
  };

  const selected = chartData[period];

  const data = {
    labels: selected.labels,
    datasets: [
      {
        label: `${period.charAt(0).toUpperCase() + period.slice(1)} Sales`,
        data: selected.data,
        fill: true,
        backgroundColor: "rgba(255, 154, 0, 0.25)",
        borderColor: "#ff9a00",
        tension: 0.4,
        pointBackgroundColor: "#ff9a00",
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div>
      {/* ===== Filter Buttons ===== */}
      <ButtonGroup className="mb-3 d-flex justify-content-center">
        <Button
          variant={period === "daily" ? "warning" : "outline-warning"}
          onClick={() => setPeriod("daily")}
        >
          Daily
        </Button>
        <Button
          variant={period === "monthly" ? "warning" : "outline-warning"}
          onClick={() => setPeriod("monthly")}
        >
          Monthly
        </Button>
        <Button
          variant={period === "yearly" ? "warning" : "outline-warning"}
          onClick={() => setPeriod("yearly")}
        >
          Yearly
        </Button>
      </ButtonGroup>

      {/* ===== Chart ===== */}
      <Line data={data} options={options} />
    </div>
  );
}
