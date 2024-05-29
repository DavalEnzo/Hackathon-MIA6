import axios from "axios";
import { useEffect, useState } from "react";

export default function TableDataAthlete() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await axios.get(
        "https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/athletes/all?page=1&limit=200"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="table-responsive"
      style={{ height: "500px", overflowy: "scroll" }}
    >
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Médailles</th>
            <th>Année de naissance</th>
            <th>Premier jeu</th>
            <th>Participations aux jeux</th>
            <th>Plus d'infos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.athlete_full_name}</td>
              <td>{item.athlete_medals}</td>
              <td>{item.athlete_year_birth}</td>
              <td>{item.first_game}</td>
              <td>{item.games_participations}</td>
              <td>
                <a target="_blank" rel="noreferrer" href={item.athlete_url}>
                  Voir plus
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
