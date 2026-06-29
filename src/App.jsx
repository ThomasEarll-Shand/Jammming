import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";

const searchResults = [
  {
    id: 1,
    name: "Song 1",
    artist: "Artist 1",
    album: "Album 1"
  },
  {
    id: 2,
    name: "Song 2",
    artist: "Artist 2",
    album: "Album 2"
  },
  {
    id: 3,
    name: "Song 3",
    artist: "Artist 3",
    album: "Album 3"
  }
];

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
          <SearchResults searchResults={searchResults} />
          <Playlist />
        </div>
      </main>
    </div>
  );
}

export default App;