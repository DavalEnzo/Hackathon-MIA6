import React, { useState, useEffect } from "react";
import axios from "axios";

const RankingPrediction = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/prediction/");
        const data = response.data;

        const processedData = data.map(country => ({
          name: country.country,
          medals: country.gold + country.silver + country.bronze
        }));

        const sortedData = processedData.sort((a, b) => b.medals - a.medals);

        setCountries(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p className="fs-3 text-center mb-4">Classement des pays par somme de médailles</p>
      <div style={{ height: "500px", overflowY: "scroll" }}>
        <ul className="list-group list-group-flush">
          {countries.map((country, index) => (
            <li className="list-group-item justify-content-between d-flex" key={index}>
              <div>{country.name}</div>
              <div>{country.medals}</div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default RankingPrediction;
