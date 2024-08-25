import { useEffect } from 'react';
import { StationPreview } from './StationPreview';
import { stationService } from '../services/station/station.service.local';
import { useDispatch, useSelector } from 'react-redux';
import { SET_STATIONS, SET_SEARCH_TERM } from '../store/reducers/station.reducer';
import { SearchBar } from './SearchBar.jsx';

export function StationList({ isCollapsed }) {
  const dispatch = useDispatch();
  const stations = useSelector(state => state.stationModule.stations);
  const searchTerm = useSelector(state => state.stationModule.searchTerm);

  useEffect(() => {
    console.log('searchTerm changed:', searchTerm); // Log when useEffect is triggered
    fetchStations();
  }, [searchTerm]); // Re-fetch stations whenever searchTerm changes

  async function fetchStations() {
    try {
      const filterBy = searchTerm ? { searchTerm } : {};
      const stations = await stationService.query(filterBy);
      const likedSongsStation = await stationService.fetchLikedSongs();
      dispatch({ type: SET_STATIONS, stations: [likedSongsStation, ...stations] });
    } catch (err) {
      console.log('Cannot load stations', err);
      throw err;
    }
  }

  if (!stations) return <h1>Loading...</h1>;
  return (
    <section className="station-list">
      {!isCollapsed && (
        <div className="search-bar-container">
          <div><SearchBar searchType={'station'} placeholder={"Search in Playlists"} /></div>
        </div>
      )}

      <ul>
        {stations.map(station => (
          <StationPreview station={station} key={station._id} isCollapsed={isCollapsed} />
        ))}
      </ul>
    </section>
  );
}
