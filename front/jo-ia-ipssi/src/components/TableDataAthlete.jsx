import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";

export default function TableDataAthlete() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    fetchAthletes(page);
  }, [page]);

  const fetchAthletes = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/athletes/all?page=${page}&limit=20`
      );
      setData((prevData) => [...prevData, ...response.data]);
      setHasMore(response.data.length > 0); // Assuming the API returns an empty array when there's no more data
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleScroll = useCallback(() => {
    const container = tableContainerRef.current;
    if (container) {
      const bottom =
        Math.round(container.scrollHeight - container.scrollTop) === container.clientHeight;
      if (bottom && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  return (
    <div
      ref={tableContainerRef}
      className="table-responsive"
      style={{ height: "500px", overflowY: "scroll" }}
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
              <td>{Math.round(item.athlete_year_birth)}</td>
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
      {loading && <div className="text-center my-2">Chargement...</div>}
    </div>
  );
}
