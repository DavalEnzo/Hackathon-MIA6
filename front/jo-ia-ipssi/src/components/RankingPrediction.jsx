import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const RankingPrediction = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/prediction/"
        );
        const data = response.data;

        const processedData = data.map((country) => ({
          name: country.country,
          medals: country.gold + country.silver + country.bronze,
        }));

        const sortedData = processedData.sort((a, b) => b.medals - a.medals);

        setCountries(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      <p className="fs-3 text-center mb-4">
        Classement des pays par total des médailles
      </p>
      <div style={{ height: "500px", overflowY: "scroll" }}>
        <ul className="list-group list-group-flush">
          {countries.map((country, index) => (
            <li
              className="list-group-item justify-content-between d-flex"
              key={index}
            >
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
