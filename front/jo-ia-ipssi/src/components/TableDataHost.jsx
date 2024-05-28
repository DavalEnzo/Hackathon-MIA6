import axios from "axios";
import { useEffect, useState } from "react";


function TableDataAthlete() {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchAthletes();
    }, []);

    const fetchAthletes = async () => {
      try {
        const response = await axios.get(
          "https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/hosts?limit=53"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

  console.log(data);
  return (
    <div
      className="table-responsive"
      style={{ height: "500px", overflowy: "scroll" }}
    >
      <table className="table">
        <thead>
        <tr>
            <th>Nom</th>
            <th>Saison</th>
            <th>Année</th>
            <th>Date de début</th>
            <th>Date de fin</th>
        </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.game_name}</td>
              <td>{item.game_season}</td>
              <td>{item.game_year}</td>
              <td>{item.game_start_date}</td>
              <td>{item.game_end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableDataAthlete;
