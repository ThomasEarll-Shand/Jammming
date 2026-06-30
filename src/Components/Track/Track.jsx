import "./Track.css";

function Track({ track = [] , onAddTrack }) {

  function handleAddTrack() {
    onAddTrack(track);
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
    </div>
  );
}

export default Track;