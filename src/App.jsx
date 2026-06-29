import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";

function App() {
  return (
    <div className="app">
      <header>
        <h1>
          Jam<span>m</span>ming
        </h1>
      </header>

      <main>
        <SearchBar />

        <div className="playlist-container">
          <SearchResults />
          <Playlist />
        </div>
      </main>
    </div>
  );
}

export default App;