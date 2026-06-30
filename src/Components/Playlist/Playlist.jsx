import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ playlistName, playlistTracks, onRemoveTrack }) {
  return (
    <section className="playlist">
      <h2>{playlistName}</h2>

      <button className="spotify-button">SAVE TO SPOTIFY</button>

      <Tracklist tracks={playlistTracks} onRemoveTrack={onRemoveTrack} />
    </section>
  );
}

export default Playlist;