import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ searchResults }) {
  return (
    <section className="results">
      <h2>Results</h2>

      <Tracklist tracks={searchResults} />
    </section>
  );
}

export default SearchResults;