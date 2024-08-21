import { useSelector } from 'react-redux';
import { SongList } from '../cmps/SongList.jsx';

export function SearchPage() {
  const searchResults = useSelector(state => state.stationModule.searchResults);
  console.log('searchResults:', searchResults);

  return (
    <div className="search-page">
      {/* Pass the search results to the SongList component */}
      <SongList songs={searchResults} />
    </div>
  );
}
