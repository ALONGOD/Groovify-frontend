import { useEffect, useState, useRef } from 'react';
import { StationPreview } from './StationPreview';
import { stationService } from '../services/station/station.service.local';
import { useDispatch, useSelector } from 'react-redux';
import { SET_STATIONS } from '../store/reducers/station.reducer';
import { SearchBar } from './SearchBar.jsx';
import { Modal } from './Modal/Modal.jsx';
import { FaBars } from 'react-icons/fa6';
import update from 'immutability-helper';

export function StationList({ isCollapsed, user }) {
  const dispatch = useDispatch();
  const stations = useSelector(state => state.stationModule.stations);
  const searchTerm = useSelector(state => state.stationModule.searchTerm);
  const sortBy = useSelector(state => state.stationModule.sortBy);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const [stationOrder, setStationOrder] = useState([]);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem('stationOrder'));
    if (storedOrder && sortBy === 'customOrder') {
      setStationOrder(storedOrder);
    } else {
      setStationOrder(stations);
    }
  }, [stations, sortBy]);

  useEffect(() => {
    fetchStations();
  }, [searchTerm, sortBy, user]);

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
      let stationsToLoad = stations;

      if (!stations || stations.length === 0) {
        stationsToLoad = await stationService.query();
        dispatch({ type: SET_STATIONS, stations: stationsToLoad });
      }

      const filterBy = {
        searchTerm: searchTerm || '',
        sortBy: sortBy || 'recents',
      };

      let filteredStations = await stationService.query(filterBy);
      const likedSongsStation = await stationService.fetchLikedSongs();

      if (user) {
        // Filter the stations to only include those that have an ID matching one of the user's likedStations IDs
        filteredStations = filteredStations.filter(station =>
          user.likedStations.some(likedStation => likedStation.id === station._id)
        );
      }

      dispatch({ type: SET_STATIONS, stations: [likedSongsStation, ...filteredStations] });
      setStationOrder([likedSongsStation, ...filteredStations]);
    } catch (err) {
      console.log('Cannot load stations', err);
      throw err;
    }
  }

  const moveStation = (dragIndex, hoverIndex) => {
    const draggedStation = stationOrder[dragIndex];
    const updatedOrder = update(stationOrder, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, draggedStation]],
    });
    setStationOrder(updatedOrder);
    localStorage.setItem('stationOrder', JSON.stringify(updatedOrder));
  };

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function formatSortByLabel(sortBy) {
    const sortOptions = {
      recents: 'Recents',
      recentlyAdded: 'Recently Added',
      alphabetical: 'Alphabetical',
      creator: 'Creator',
      customOrder: 'Custom Order',
    };

    return sortOptions[sortBy] || sortBy;
  }

  if (!stationOrder.length) return <h1>Loading...</h1>;
  return (
    <section className="station-list">
      {!isCollapsed && (
        <div className="search-bar-container">
          <SearchBar searchType={'station'} placeholder={"Search in Playlists"} />
          <div className="sort-button-container" ref={modalRef}>
            <button className="sort-button" onClick={toggleModal}>
              {formatSortByLabel(sortBy)}
              <span className="sort-icon"><FaBars /></span>
            </button>
            {isModalOpen && <Modal modalType={'sortBy'} />}
          </div>
        </div>
      )}

      <ul>
        {stationOrder.map((station, index) => (
          <StationPreview
            station={station}
            key={station._id}
            isCollapsed={isCollapsed}
            index={index}
            moveStation={moveStation}
          />
        ))}
      </ul>
    </section>
  );
}
