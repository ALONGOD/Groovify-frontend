import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader';
import { SongList } from '../cmps/SongList';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../cmps/Modal/Modal';
import {
  SET_EDIT_MODAL,
  UPDATE_STATION,
} from '../store/reducers/station.reducer';
import { stationService } from '../services/station/station.service.local.js';
import { SearchBar } from '../cmps/SearchBar';
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi';
import { DetailsHeaderActions } from '../cmps/StationDetails/DetailsHeaderActions.jsx';

export function StationDetails() {
  const dispatch = useDispatch();
  const { stationId } = useParams();
  const stations = useSelector(state => state.stationModule.stations);
  const [station, setStation] = useState(null);
  const [isNewStation, setIsNewStation] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const editOpen = useSelector(state => state.stationModule.editStationModal);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const foundStation = stations.find(station => station._id === stationId);
    if (foundStation) {
      setStation(foundStation);
      setIsNewStation(false);
    } else {
      fetchStationFromService();
    }
  }, [stationId, stations]);

  async function fetchStationFromService() {
    try {
      const fetchedStation = await stationService.getById(stationId);
      if (fetchedStation) {
        setStation(fetchedStation);
        setIsNewStation(true);
      } else {
        console.error('Station not found');
      }
    } catch (err) {
      console.error('Failed to fetch station:', err);
    }
  }

  async function handleSearch(query) {
    try {
      const results = await YouTubeAPIService.searchVideos(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching YouTube API:', error);
    }
  }

  function toggleEditStation() {
    dispatch({ type: SET_EDIT_MODAL, isOpen: true });
  }

  if (!station) return <h1>Loading...</h1>;

  return (
    <section className="station-details flex flex-column">
      <div className="gradient" style={gradient}></div>

      <StationDetailsHeader
        station={station}
        setStation={setStation}
        toggleEditStation={toggleEditStation}
        isNewStation={isNewStation}
        setGradient={setGradient}
      />
      <div className="station-details-main">
        <DetailsHeaderActions
          toggleEditStation={toggleEditStation}
          isNewStation={isNewStation}
          station={station}
        />

        {station.songs.length === 0 && (
          <div className="no-songs">
            <h2>Let's find something for your playlist</h2>
            <SearchBar
              searchType={'youtube-inline'}
              placeholder={'Search for songs or episodes'}
              onSearch={handleSearch} // Search handler
            />
          </div>
        )}

        {searchResults.length > 0 && (
          <SongList songs={searchResults} type="search-results" />
        )}

        {station.songs.length > 0 && (
          <SongList songs={station.songs} type="list-table" station={station} />
        )}

        {editOpen && <Modal modalType="editStation" />}
      </div>
    </section>
  );
}