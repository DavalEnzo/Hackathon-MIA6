import React, { useState } from "react";

const Ranking = () => {
  const medalData = {
    2020: [
      { name: "USA", medals: 10 },
      { name: "China", medals: 8 },
      { name: "Japan", medals: 6 },
      { name: "Germany", medals: 5 },
      { name: "Russia", medals: 4 },
      { name: "Australia", medals: 3 },
      { name: "France", medals: 2 },
      { name: "Canada", medals: 1 },
    ],
    2016: [
      { name: "USA", medals: 12 },
      { name: "China", medals: 9 },
      { name: "Japan", medals: 7 },
      { name: "Germany", medals: 6 },
      { name: "Russia", medals: 5 },
      { name: "Australia", medals: 4 },
      { name: "France", medals: 3 },
      { name: "Canada", medals: 2 },
    ],
    2012: [
      { name: "USA", medals: 11 },
      { name: "China", medals: 10 },
      { name: "Japan", medals: 8 },
      { name: "Germany", medals: 7 },
      { name: "Russia", medals: 6 },
      { name: "Australia", medals: 5 },
      { name: "France", medals: 4 },
      { name: "Canada", medals: 3 },
    ],
  };

  const [selectedYear, setSelectedYear] = useState("2020");
  const countries = medalData[selectedYear];

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
  );
};

export default Ranking;
