import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import HomePage from "./HomePage/HomePage"
import MoviePage from './MoviePage/MoviePage'
import WatchList from "./WatchList/WatchList"
import { SearchDefaultPage, SearchPageResults } from './SearchPage/SearchPage'
import { MovieDefaultPage } from "./MoviePage/MoviePage"
import Recommendations from './recommendations/recommendations'

export default function App() {


  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/movie" element={<MovieDefaultPage/>}>
          <Route path=":movie_id" element={<MoviePage />} />
      </Route>

      

      <Route path="/search" element={<SearchDefaultPage />}>
          <Route path=":search_query" element={<SearchPageResults />} />
      </Route>

  
      <Route path="/watch_list" element = {<WatchList/>}/>
      <Route path="/recommendations" element = {<Recommendations/>}/>
    </Routes>
    </div>

 ) 
 
}

