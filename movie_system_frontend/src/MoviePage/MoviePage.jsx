import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react"
import { useEffect } from "react";

import { get_movie_information_from_uuid } from '../api/api';
import MovieData from "./../assets/movie_info.json"
import TopBar from "./../TopBar/TopBar"

import "./MoviePage.css"

export function MovieDefaultPage(){
    return (
        <div className="MovieDefaultPage"  >
            <TopBar/>
            <Outlet/>
        </div>
    )
}

// async function loadWatchlist(movie_id) {
//   const res = await fetch("/watch_list.txt");
//   const text = await res.text();
//   return text.split(",").map(Number); // convert to numbers
// }



export default function MoviePage() {
  const { movie_id } = useParams();
  const poster_link = `/_posters/${movie_id}.jpg`
  const [movieData, setMovieData] = useState({})
  const [WatchList, setWatchList] = useState(new Map())
  const inWatchList = WatchList.has(movie_id)
  
  async function loadWatchList() { 
    try { 
      const watch_list = localStorage.getItem("watch_list")
      if (watch_list == null) { 
        const watch_list = new Map()
        localStorage.setItem("watch_list", JSON.stringify([...watch_list]))
        return watch_list
      } else { 
        return new Map(JSON.parse(watch_list))
      }

    } catch (error) {
      console.error(error)
    }
  }

  // to handle a new click 
  // create a new map
  // modify the map
  // pass it to setwatchlist
  function handleClick() {
    setWatchList(prevWatchList => { 
      const newWatchList = new Map(prevWatchList)
      if (!newWatchList.has(movie_id)) {
        newWatchList.set(movie_id , true)
      } else { 
        newWatchList.delete(movie_id)
      }
      return newWatchList
    })
  }

  useEffect(() => {
    loadWatchList().then(setWatchList)
  }, [])

  useEffect(() => {
  localStorage.setItem(
    "watch_list",
    JSON.stringify([...WatchList])
  )
  }, [WatchList])


  useEffect( () => { 
    async function load(movie_id) { 
      try { 
        const result = await get_movie_information_from_uuid(movie_id)
        setMovieData(result)
      } catch (error) {
        console.error(error)
      }
    }
    if (movie_id) { 
      load(movie_id)
    }
  } , [movie_id])

  return (
    <div className="MoviePage">
      <div className="MoviePosterImageContainer">
      <img src={poster_link} alt={poster_link} />
      <button onClick={handleClick} className={inWatchList ? "button_one" : "button_zero"}> {inWatchList ? "Remove from watch list" : "Add to watchlist"} </button>
      </div>

      <div className="MovieInfoContainer">
        <header>Movie: {movieData["movie_title"]} ({movieData["year"]})</header>
        
        <section>Plot: {movieData["plot"]}</section>
        <section>Genres : {movieData["genres"]}</section>
        <section>IMDB Rating : {movieData["imdb_rating"]}</section>
        <section>Ratings: {movieData["num_ratings"]}</section>

      </div>
    </div>
  );
}

