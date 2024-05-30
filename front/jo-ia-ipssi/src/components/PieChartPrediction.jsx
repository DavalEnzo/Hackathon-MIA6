import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/prediction/"
        );
        const data = response.data;
        setCountries(data);
        setSelectedCountry(data[0]?.country);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryData = countries.find(
        (country) => country.country === selectedCountry
      );
      if (countryData) {
        setChartData({
          labels: ["Or", "Argent", "Bronze"],
          datasets: [
            {
              label: `Medals for ${selectedCountry}`,
              data: [countryData.gold, countryData.silver, countryData.bronze],
              backgroundColor: [
                "rgba(255, 215, 0, 0.6)",
                "rgba(192, 192, 192, 0.6)",
                "rgba(205, 127, 50, 0.6)",
              ],
              borderColor: [
                "rgba(255, 215, 0, 1)",
                "rgba(192, 192, 192, 1)",
                "rgba(205, 127, 50, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      }
    }
  }, [selectedCountry, countries]);
  
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
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {countries.map((country, index) => (
            <option key={index} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
      </div>
      {chartData && <Pie data={chartData} options={options} />}
    </div>
  );
};

export default PieChart;
