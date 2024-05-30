import { useState, useEffect } from "react";
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
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RankingChart = () => {
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

        const top20 = sortedData.slice(0, 20);

        const labels = top20.map((item) => item.country_name);
        const goldData = top20.map((item) => item.medal_count_gold);
        const silverData = top20.map((item) => item.medal_count_silver);
        const bronzeData = top20.map((item) => item.medal_count_bronze);

        const formattedData = {
          labels,
          datasets: [
            {
              label: "Or",
              data: goldData,
              backgroundColor: "rgba(255, 215, 0, 0.6)",
              borderColor: "rgba(255, 215, 0, 1)",
              borderWidth: 1,
            },
            {
              label: "Argent",
              data: silverData,
              backgroundColor: "rgba(192, 192, 192, 0.6)",
              borderColor: "rgba(192, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Bronze",
              data: bronzeData,
              backgroundColor: "rgba(205, 127, 50, 0.6)",
              borderColor: "rgba(205, 127, 50, 1)",
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
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default RankingChart;