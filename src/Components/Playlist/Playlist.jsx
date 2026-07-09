import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ playlistName, playlistTracks, onRemoveTrack, onUpdatePlaylistName, onSavePlaylist }) {

  function handleNameChange(event) {
    onUpdatePlaylistName(event.target.value);
  }
  
  return (
    <section className="playlist">
      <h2>
        <input
          type="text"
          value={playlistName}
          onChange={handleNameChange}
        />
      </h2>

      <button onClick={onSavePlaylist} className="spotify-button">SAVE TO SPOTIFY</button>

      <Tracklist tracks={playlistTracks} onRemoveTrack={onRemoveTrack} />
    </section>
  );
}

export default Playlist;