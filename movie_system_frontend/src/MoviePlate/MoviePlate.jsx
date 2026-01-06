import data from "./../assets/movie_info.json" with { type: "json" };
import MoviePage from "./../MoviePage/MoviePage"
import "./MoviePlate.css"
import { useState } from "react"
import { getMovieTitleFromUUID } from "./../api/api"
import { useEffect } from "react";
export default function MoviePlateDemo({movie_id}){
    var k = 20
    const [movie_title, setMovieTitle] = useState("")
    const [isInWatchList, setInWatchList] = useState(false) 


    useEffect( () => { 
        let alive = true; 
        async function load(currentId) { 
            try { 
                const result = await getMovieTitleFromUUID(movie_id)
                if (alive && currentId === movie_id) {
                    var movie_title = result.Title

                    if (movie_title.length > k){
                        movie_title = movie_title.slice(0, k)
                        movie_title = movie_title + "..."
                    }

                    setMovieTitle(movie_title);
                }
            } catch (error) { 
                console.error("Error: ", error)
            }
        }
         if (movie_id) {
            load(movie_id);
        }
        return () => { 
            alive = false 
        };
    }, [movie_id])

    


    const movie_poster = `/_posters/${movie_id}.jpg`;
    
    const link_route = `/movie/${movie_id}`

    return ( 
        <div className="MoviePlate">
            <img src={movie_poster} alt={movie_title} />
            <li><a href={link_route}>{movie_title}
            </a></li>
        </div>
    )
}





