import "./Track.css";

function Track({ track = [] , onAddTrack, onRemoveTrack }) {

  function handleAddTrack() {
    onAddTrack(track);
  }

  function handleRemoveTrack() {
    onRemoveTrack(track);
  }

  return (
    <div className="track">
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>

      <button className="track-button" onClick={handleAddTrack}>
        +
      </button>
      <button className="track-button" onClick={handleRemoveTrack}>
        -
      </button>
    </div>
  );
}

export default Track;