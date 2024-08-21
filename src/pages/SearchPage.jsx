import { useSelector } from 'react-redux';

export function SearchPage() {
  const searchResults = useSelector(state => state.stationModule.searchResults);

  return (
    <div className="search-page">
      {searchResults.map(result => (
        <div className="song-item" key={result.id}>
          <div className="song-duration">{result.duration}</div>
          <div className="song-details">
            <img src={result.thumbnail} alt={result.title} />
            <div>
              <div className="song-title">{result.title}</div>
              <div className="song-artist">{result.artist}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
