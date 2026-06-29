import "./Tracklist.css";
import Track from "../Track/Track";

function Tracklist({ tracks = [] }) {
  return (
    <div className="track-list">
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default Tracklist;
