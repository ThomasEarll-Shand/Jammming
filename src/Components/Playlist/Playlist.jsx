import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist() {
  return (
    <section className="playlist">
      <h2>New Playlist</h2>

      <button className="spotify-btn">
        SAVE TO SPOTIFY
      </button>

      <Tracklist />
    </section>
  );
}

export default Playlist;