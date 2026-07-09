import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import { useState } from "react";
import Spotify from "./Util/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
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

  async function search(term) {
    const results = await Spotify.search(term);
    setSearchResults(results);
  }

  async function savePlaylist() {
  const trackUris = playlistTracks.map((track) => track.uri);

  try {
    await Spotify.savePlaylist(playlistName, trackUris);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  } catch (error) {
    console.error("Save playlist failed:", error);
  }
}

  return (
    <div className="app">
      <header>
        <h1>
          Ja<span>mmm</span>ing
        </h1>
      </header>

      <main>
        <SearchBar onSearch={search} />

        <div className="playlist-container">
          <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemoveTrack={removeTrack}
            onUpdatePlaylistName={updatePlaylistName}
            onSavePlaylist={savePlaylist}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
