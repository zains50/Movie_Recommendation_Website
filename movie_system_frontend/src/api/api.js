import axios from "axios"

const BASE_URL = "http://localhost:8000"
// 99023790-0811-4435-b225-5c25b966af15

export async function getSearchResults(search_query) { 
    var backend = `${BASE_URL}/search/${search_query}`
    try  {
        const response = await axios.get(backend);
        return response["data"];
    } catch (error) { 
        console.error(error);
        throw error;
    }
}

export async function getMovieTitleFromUUID(uuid) { 
    var backend = `${BASE_URL}/movie_title/${uuid}`
    try  {
        const response = await axios.get(backend);
        return response["data"];
    } catch (error) { 
        console.error(error);
        throw error;
    }
}

export async function get_top_movie_uuids_by_box_office(topk) { 
    var backend = `${BASE_URL}/get_all_movie_order_by/box_office/topk=${topk}` 
    try { 
        const response = await axios.get(backend)
        return response["data"]
    } catch (error) { 
        console.error(error)
        throw error 
    }
}

// getMovieTitleFromUUID("99023790-0811-4435-b225-5c25b966af15")
//         .then(result => { 
//             console.log(result)
//         })
//         .catch(erorr => { 
//             console.error("Error: ", error)
//     })


get_top_movie_uuids_by_box_office(10)
        .then(result => { 
            console.log(result)
        })
        .catch(erorr => { 
            console.error("Error: ", error)
    })