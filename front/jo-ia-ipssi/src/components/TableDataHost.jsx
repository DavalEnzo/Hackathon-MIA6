import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";

export default function TableDataHost() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    fetchHosts(page);
  }, [page]);

  const fetchHosts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hackathon-mia-hackathon-mia-1a3ee907.koyeb.app/hosts?page=${page}&limit=20`
      );
      console.log(page)
      setData((prevData) => [...prevData, ...response.data]);
      setHasMore(response.data.length > 0); 
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleScroll = useCallback(() => {
    const container = tableContainerRef.current;
    if (container) {
      const bottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
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
      {loading && <div>Loading...</div>}
    </div>
  );
}