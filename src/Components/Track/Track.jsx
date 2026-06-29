import "./Track.css";

function Track({ track }) {
  return (
    <div className="track">
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>

      <button className="track-button">+</button>
    </div>
  );
}

export default Track;