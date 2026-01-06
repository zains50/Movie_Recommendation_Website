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

export async function get_movie_information_from_uuid(uuid) { 
    var backend = `${BASE_URL}/movie_information/${uuid}` 
    try { 
        const response = await axios.get(backend)
        return response["data"]
    } catch (error) { 
        console.error(error)
        throw error 
    }
} 

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


export async function get_movie_recommendations() { 
    const watchListEntries = await loadWatchList();

    const keysString = watchListEntries
        .map(([key]) => key)
        .join(",");

    var backend = `${BASE_URL}/recommend/${keysString}` 
    try { 
        const response = await axios.get(backend)
        return response["data"]
    } catch (error) { 
        console.error(error)
        throw error 
    }

}

