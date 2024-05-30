import { useState, useEffect } from "react";
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
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/hosts/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/medals/count/country/${selectedCountry}`
        );
        const data = response.data;

        const labels = data.map((item) => item.game_year);
        const medalCounts = data.map((item) => item.medal_count);

        const formattedData = {
          labels,
          datasets: [
            {
              label: selectedCountry,
              data: medalCounts,
              fill: false,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
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

    if (selectedCountry) {
      fetchData();
    }
  }, [selectedCountry]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    font: {
      family: "Paris2024-Variable",
    },
  };

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

  return (
    <div>
      <div className="text-center mb-3">
        <select
          className="form-select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country) => (
            <option key={country.country_name} value={country.country_name}>
              {country.country_name}
            </option>
          ))}
        </select>
      </div>
      {chartData && <Line data={chartData} options={options} />}
    </div>
  );
};

export default TrendChart;