import "./Track.css";

function Track() {
  return (
    <div className="track">
      <div>
        <h3>Song</h3>
        <p>Artist | Album</p>
      </div>

      <button className="track-btn">+</button>
    </div>
  );
}

export default Track;