import { useState } from "react";
import "./SearchBar.css";

function SearchBar( {onSearch} ) {
  const [term, setTerm] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(term);
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter A Song, Album or Artist"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
        />
        <button>SEARCH</button>
      </form>
    </div>
  );
}

export default SearchBar;