import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import { useState } from "react";

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
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addTrack(track) {
    const trackExists = playlistTracks.some((playlistTrack) => playlistTrack.id === track.id);

    if (!trackExists) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  }

  function removeTrack(track) {
    const updatedTracks = playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id);
    setPlaylistTracks(updatedTracks);
  }

  function updatePlaylistName(newName) {
    setPlaylistName(newName);
  }

  return (
    <div className="app">
      <header>
        <h1>
          Ja<span>mmm</span>ing
        </h1>
      </header>

      <main>
        <SearchBar />

        <div className="playlist-container">
          <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemoveTrack={removeTrack}
            onUpdatePlaylistName={updatePlaylistName}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
