// src/RankingChart.js
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RankingChart = () => {
  const medalData = {
    2020: {
      labels: ["USA", "China", "Japan", "Germany", "UK"],
      datasets: [
        {
          label: "Gold Medals",
          data: [45, 38, 28, 24, 22],
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
        {
          label: "Silver Medals",
          data: [36, 32, 26, 20, 18],
          backgroundColor: "rgba(192, 192, 192, 0.2)",
          borderColor: "rgba(192, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Bronze Medals",
          data: [33, 29, 24, 19, 15],
          backgroundColor: "rgba(205, 127, 50, 0.2)",
          borderColor: "rgba(205, 127, 50, 1)",
          borderWidth: 1,
        },
      ],
    },
    2016: {
      labels: ["USA", "China", "Japan", "Germany", "UK"],
      datasets: [
        {
          label: "Gold Medals",
          data: [46, 37, 27, 23, 21],
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
        {
          label: "Silver Medals",
          data: [35, 31, 25, 19, 17],
          backgroundColor: "rgba(192, 192, 192, 0.2)",
          borderColor: "rgba(192, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Bronze Medals",
          data: [34, 28, 23, 18, 14],
          backgroundColor: "rgba(205, 127, 50, 0.2)",
          borderColor: "rgba(205, 127, 50, 1)",
          borderWidth: 1,
        },
      ],
    },
    2012: {
      labels: ["USA", "China", "Japan", "Germany", "UK"],
      datasets: [
        {
          label: "Gold Medals",
          data: [44, 36, 26, 22, 20],
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
        {
          label: "Silver Medals",
          data: [34, 30, 24, 18, 16],
          backgroundColor: "rgba(192, 192, 192, 0.2)",
          borderColor: "rgba(192, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Bronze Medals",
          data: [32, 27, 22, 17, 13],
          backgroundColor: "rgba(205, 127, 50, 0.2)",
          borderColor: "rgba(205, 127, 50, 1)",
          borderWidth: 1,
        },
      ],
    },
  };

  const [selectedYear, setSelectedYear] = useState("2020");
  const data = medalData[selectedYear];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: `Paris Olympics Medal Ranking (${selectedYear})`,
      },
    },
  };

  return (
    <div className="col-12 col-sm-6 col-xxl-4 mt-4">
      <div className="text-center mb-3">
        <select
          className="form-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="2020">2020</option>
          <option value="2016">2016</option>
          <option value="2012">2012</option>
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RankingChart;
