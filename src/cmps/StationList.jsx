import { useEffect, useState, useRef } from 'react';
import { StationPreview } from './StationPreview';
import { stationService } from '../services/station/station.service.local';
import { useDispatch, useSelector } from 'react-redux';
import { SET_STATIONS } from '../store/reducers/station.reducer';
import { SearchBar } from './SearchBar.jsx';
import { Modal } from './Modal/Modal.jsx';
import { FaBars } from 'react-icons/fa6';

export function StationList({ isCollapsed }) {
  const dispatch = useDispatch();
  const stations = useSelector(state => state.stationModule.stations);
  const searchTerm = useSelector(state => state.stationModule.searchTerm);
  const sortBy = useSelector(state => state.stationModule.sortBy); // Get the current sortBy value
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const modalRef = useRef(null); // Create a ref to track the modal

  useEffect(() => {
    console.log('searchTerm changed:', searchTerm); // Log when useEffect is triggered
    fetchStations();
  }, [searchTerm, sortBy]); // Re-fetch stations whenever searchTerm changes

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  async function fetchStations() {
    try {
      const filterBy = {
        searchTerm: searchTerm || '', // If searchTerm is not provided, default to an empty string
        sortBy: sortBy || 'recents' // If sortBy is not provided, default to 'recents'
      };
      const stations = await stationService.query(filterBy);
      const likedSongsStation = await stationService.fetchLikedSongs();
      dispatch({ type: SET_STATIONS, stations: [likedSongsStation, ...stations] });
    } catch (err) {
      console.log('Cannot load stations', err);
      throw err;
    }
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  if (!stations) return <h1>Loading...</h1>;
  return (
    <section className="station-list">
      {!isCollapsed && (
        <div className="search-bar-container">
          <SearchBar searchType={'station'} placeholder={"Search in Playlists"} />
          <div className="sort-button-container" ref={modalRef}>
            <button className="sort-button" onClick={toggleModal}>
              {sortBy}
              <span className="sort-icon"><FaBars /></span> {/* Use the FaBars icon */}
            </button>
            {isModalOpen && <Modal modalType={'sortBy'} />}
          </div>
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
