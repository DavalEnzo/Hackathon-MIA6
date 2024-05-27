// src/TrendChart.js
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendChart = () => {
  const medalData = {
    USA: {
      labels: ["2008", "2012", "2016", "2020", "2024"],
      datasets: [
        {
          label: "USA",
          data: [110, 104, 121, 113, 120],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    },
    China: {
      labels: ["2008", "2012", "2016", "2020", "2024"],
      datasets: [
        {
          label: "China",
          data: [100, 88, 70, 89, 90],
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
        },
      ],
    },
    Russia: {
      labels: ["2008", "2012", "2016", "2020", "2024"],
      datasets: [
        {
          label: "Russia",
          data: [72, 82, 56, 71, 75],
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
        },
      ],
    },
    UK: {
      labels: ["2008", "2012", "2016", "2020", "2024"],
      datasets: [
        {
          label: "UK",
          data: [47, 65, 67, 65, 70],
          borderColor: "rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
        },
      ],
    },
  };

  const [selectedCountry, setSelectedCountry] = useState("USA");
  const data = medalData[selectedCountry];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Olympics Total Medals Trend (${selectedCountry})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="col-12 col-sm-6 col-xxl-4 mt-4">
      <div className="text-center mb-3">
        <select
          className="form-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="USA">USA</option>
          <option value="China">China</option>
          <option value="Russia">Russia</option>
          <option value="UK">UK</option>
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default TrendChart;