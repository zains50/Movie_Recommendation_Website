import "./MoviesTab.css";
import { useEffect, useState } from "react"
import MoviePlate from "./../MoviePlate/MoviePlate"

import { get_top_movie_uuids_by_box_office } from "./../api/api"




export default function MovieTab({}){
    var top_movie_uuids

    const [array_of_top_movie_uuids, setArrayOfTopMovieUuids] = useState([])

    useEffect(() => {
        async function load() {
            try {
                const result = await get_top_movie_uuids_by_box_office(100);
                setArrayOfTopMovieUuids(result.uuid);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        load();
    }, []);

    return (
        <div className="MoviesTab">   
        {array_of_top_movie_uuids.map((movie) => (
            <MoviePlate movie_id={movie}></MoviePlate>
        ))}
        </div>
    )
}