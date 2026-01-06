import { useEffect, useState } from "react"
import MoviePlate from "./../MoviePlate/MoviePlate"
import TopBar from "./../TopBar/TopBar"
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import { getSearchResults } from "./../api/api"

export function SearchDefaultPage(){
    return (
        <div className="MovieDefaultPage"  >
            <TopBar/>
            <Outlet/>
        </div>
    )
}


export function SearchPageResults() {
    // Use params reads the dynamic parts of the URL
    const { search_query } = useParams();

    // State is data that changes over time, it starts as an empty array
    // When the state updats, the component re-renders  
    const [search_results, setArrayOfMovieResults] = useState([]);

    // Use effect changes whenever search_query changes
    // format: useEffect(effectFunction, dependencyArray)
    // effect runs once after render, and then re-runs whenever any dependency changes
    // Here we also have the notation 
    // () => { } which is another way or writing function () { } 
    // then inside the function we have an async function, which we call
    useEffect(() => {
        async function load() {
            try {
                const result = await getSearchResults(search_query);
                setArrayOfMovieResults(result.uuid); // or result.uuid
            } catch (error) {
                console.error("Error:", error);
            }
        }
        load();
    }, [search_query]);

    return (
        <div className="MoviesTab">
            {search_results.map((movie) => (
                <MoviePlate key={movie} movie_id={movie} />
            ))}
        </div>
    );
}
