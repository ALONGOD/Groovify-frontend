import { PlayPauseBtn } from "../PlayPauseBtn";

export function TopResult({ topResult }) {
  return (
    <div className="top-result flex flex-column">
      <h2>Top Result</h2>
      <div className="card relative flex flex-column">
        <img src={topResult?.imgUrl} alt="top-result" />
        <div className="details">
          <h3>{topResult?.title}</h3>
          <div className="flex flex-row align-center">
            <p className="song-label">Song •</p>
            <p>{topResult?.artist}</p>
          </div>
        </div>
        <PlayPauseBtn song={topResult} type="top-result"/>
      </div>
    </div>
  )
}
