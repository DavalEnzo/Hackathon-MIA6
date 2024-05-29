import React, { useState, useEffect } from "react";
import axios from "axios";

const Ranking = () => {
  const [medalData, setMedalData] = useState({});
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2020");

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await axios.get("https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/hosts/allYears");
        const data = response.data;
        setYears(data);
        if (data.length > 0) {
          setSelectedYear(data[0].game_year);
        
        }
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const fetchData = async (year) => {
        try {
          const response = await axios.get(
            `https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/results/get_top_countries_by_year/${year}`
          );
          setMedalData((prevData) => ({
            ...prevData,
            [year]: response.data,
          }));
        } catch (error) {
          console.error("Error fetching medal data:", error);
        }
      };

      fetchData(selectedYear);
    }
  }, [selectedYear]);

  const countries = medalData[selectedYear] || [];

  return (
    <div>
      <div className="text-center mb-3">
        <select
          className="form-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year, index) => (
            <option key={index} value={year.game_year}>
              {year.game_year}
            </option>
          ))}
        </select>
      </div>
      <ul className="list-group list-group-flush">
        {countries.map((country, index) => (
          <li
            className="list-group-item justify-content-between d-flex"
            key={index}
          >
            <div>{country.country_name}</div>
            <div>{country.medal_count}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;