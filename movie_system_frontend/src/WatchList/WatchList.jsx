import MoviePlate from "./../MoviePlate/MoviePlate";
import TopBar from "./../TopBar/TopBar";
import { useEffect, useState } from "react";

// async function loadWatchlist() {
//   const res = await fetch("/watch_list.txt");
//   const text = await res.text();
//   return text.split(",").map(Number); // convert to numbers
// }

export default function WatchList() {
  const [movieList, setMovieList] = useState([]);
  const [WatchList, setWatchList] = useState([])

  async function loadWatchList() { 
    try { 
      const watch_list = localStorage.getItem("watch_list")
      if (watch_list == null) { 
        const watch_list = new Map()
        localStorage.setItem("watch_list", JSON.stringify([...watch_list]))
        return [...watch_list]
      } else { 
        const map = new Map(JSON.parse(watch_list))
        return [...map]
      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { 
    async function init() {
      const list = await loadWatchList()
      setWatchList(list)
    }
    init()
  }, [])


  return (
    <>
      <TopBar />
      <div className="MoviesTab">
      {WatchList.map(([movieId, movieData]) => (
          <MoviePlate key={movieId} movie_id={movieId} />
      ))}

      </div>
    </>
  );
}
