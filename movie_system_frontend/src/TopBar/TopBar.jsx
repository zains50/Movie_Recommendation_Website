import "./TopBar.css"

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { 
      const query = e.target.value
      if (query) {
        navigate(`/search/${encodeURIComponent(query)}`)
      }
    } 
  }

  
  return (
    // acts as the main container for the bar, provides navigation links
    <nav className="navbar">
     
      <div className="logo">Movie Recommender</div>
        <div className="search-box"> 
            <input
                type="search"
                id="search-form"
                className="search-input" 
                placeholder="Search items..."
                onKeyDown={handleKeyDown}
                
            />
        </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/Watch_List">Watch List</a></li>
        <li><a href="/recommendations">Recommendations</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}
