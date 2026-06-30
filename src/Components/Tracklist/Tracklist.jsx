import "./Tracklist.css";
import Track from "../Track/Track";

function Tracklist({ tracks = [], onAddTrack, onRemoveTrack }) {
  return (
    <div className="track-list">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAddTrack={onAddTrack}
          onRemoveTrack={onRemoveTrack}
        />
      ))}
    </div>
  );
}

export default Tracklist;
