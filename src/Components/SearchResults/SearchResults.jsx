import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ searchResults, onAddTrack }) {
  return (
    <section className="results">
      <h2>Results</h2>

      <Tracklist tracks={searchResults} onAddTrack={onAddTrack} />
    </section>
  );
}

export default SearchResults;