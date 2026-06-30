import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ playlistName, playlistTracks }) {
  return (
    <section className="playlist">
      <h2>{playlistName}</h2>

      <button className="spotify-button">SAVE TO SPOTIFY</button>

      <Tracklist tracks={playlistTracks} />
    </section>
  );
}

export default Playlist;