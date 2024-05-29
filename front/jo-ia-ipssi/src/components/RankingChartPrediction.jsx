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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RankingChartPrediction = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/prediction/");
        const data = response.data;

        // Sort data by total medals if necessary
        // Assuming total medals = gold + silver + bronze
        const sortedData = data.sort((a, b) => (b.gold + b.silver + b.bronze) - (a.gold + a.silver + a.bronze));

        // Get the top 20 countries
        const top20 = sortedData.slice(0, 20);

        const labels = top20.map(item => item.country);
        const goldData = top20.map(item => item.gold);
        const silverData = top20.map(item => item.silver);
        const bronzeData = top20.map(item => item.bronze);

        const formattedData = {
          labels,
          datasets: [
            {
              label: 'Or',
              data: goldData,
              backgroundColor: 'rgba(255, 215, 0, 0.6)',
              borderColor: 'rgba(255, 215, 0, 1)',
              borderWidth: 1,
            },
            {
              label: 'Argent',
              data: silverData,
              backgroundColor: 'rgba(192, 192, 192, 0.6)',
              borderColor: 'rgba(192, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Bronze',
              data: bronzeData,
              backgroundColor: 'rgba(205, 127, 50, 0.6)',
              borderColor: 'rgba(205, 127, 50, 1)',
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
  }, []);

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
      <p className="text-center fs-3">
        Top 20 des pays par médailles aux JO de Paris 2024
      </p>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default RankingChartPrediction;