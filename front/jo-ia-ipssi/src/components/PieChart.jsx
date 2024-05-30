import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const PieChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2020");
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get(
          "https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/hosts/allYears"
        );
        setYears(response.data);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/medals/count_by_country/${selectedYear}`
        );
        const data = response.data;
        const sortedData = data.sort(
          (a, b) =>
            b.gold + b.silver + b.bronze - (a.gold + a.silver + a.bronze)
        );

        const top10 = sortedData.slice(0, 10);

        const labels = top10.map((item) => item.country_name);
        const medalCounts = top10.map(
          (item) => item.medal_count_gold + item.medal_count_silver + item.medal_count_bronze
        );

        const formattedData = {
          labels,
          datasets: [
            {
              label: "Total des Médailles",
              data: medalCounts,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)"
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  if (loading) {
    return (
      <div className="mt-5 text-center">
        <p>
          <FontAwesomeIcon className="fs-2" icon={faSpinner} spin />
        </p>
        <p>Chargement...</p>
      </div>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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
          {years.map((year) => (
            <option key={year.game_year} value={year.game_year}>
              {year.game_year}
            </option>
          ))}
        </select>
      </div>
      {chartData && <Pie data={chartData} options={options} />}
    </div>
  );
};

export default PieChart;