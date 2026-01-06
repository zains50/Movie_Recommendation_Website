import { useEffect, useState } from "react";
import TopBar from "./../TopBar/TopBar"
import { get_movie_recommendations } from "../api/api";
import MoviePlate from "./../MoviePlate/MoviePlate"
export default function Recommendations() {
  const [recList, setRecList] = useState([]);

  async function loadWatchList() {
    try {
      const watchList = await get_movie_recommendations("watch_list");
      return watchList?.recommendations ?? [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  useEffect(() => {
    async function init() {
      const list = await loadWatchList();
      setRecList(list);
    }
    init();
  }, []);

  return (
    <>
      <TopBar />
      <div className="MoviesTab">
        {recList.map((movie_id) => (
          <MoviePlate key={movie_id} movie_id={movie_id} />
        ))}
      </div>
    </>
  );
}
