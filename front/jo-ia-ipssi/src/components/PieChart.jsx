// src/PieChart.js
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.defaults.font.family = "Paris2024-Variable";


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const medalData = {
    2020: {
      labels: ["USA", "China", "Japan", "Germany", "UK"],
      datasets: [
        {
          label: "Total Medals",
          data: [118, 88, 58, 54, 60],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    2016: {
      labels: ["USA", "China", "Japan", "Germany", "UK"],
      datasets: [
        {
          label: "Total Medals",
          data: [120, 70, 65, 56, 62],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    2012: {
      labels: ["USA", "China", "Japan", "Germany", "UK"],
      datasets: [
        {
          label: "Total Medals",
          data: [110, 100, 50, 44, 48],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
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
        display: true,
        text: `Paris Olympics Medal Distribution (${selectedYear})`,
      },
    },
  };

  return (
    <div>
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
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
