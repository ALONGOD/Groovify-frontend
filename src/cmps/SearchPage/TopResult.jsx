export function TopResult({ topResult }) {
  return (
    <div className="top-result flex flex-column">
      <h2>Top Result</h2>
      <div className="card flex flex-column">
        <img src={topResult?.imgUrl} alt="top-result" />
        <h3>{topResult?.title}</h3>
        <p>{topResult?.artist}</p>
      </div>
    </div>
  )
}
