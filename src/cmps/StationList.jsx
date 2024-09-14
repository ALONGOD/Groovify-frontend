import { useEffect, useState, useRef } from 'react'
import { StationPreview } from './StationPreview'
import { stationService } from '../services/station/station.service.local'
import { useDispatch, useSelector } from 'react-redux'
import { SearchBar } from './SearchBar.jsx'
import { Modal } from './Modal/Modal.jsx'
import { FaBars } from 'react-icons/fa6'
import update from 'immutability-helper'
import { SET_USER } from '../store/reducers/user.reducer.js'

export function StationList({ isCollapsed, stations, type, moveStation }) {
  const searchTerm = useSelector(state => state.stationModule.searchTerm)
  const user = useSelector(state => state.userModule.user)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)


  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef])


  if (!stations?.length) return <h1>Loading...</h1>
  return (
    <section className="station-list">
      {type !== 'search-results' && !isCollapsed && (
        <div className="search-bar-container">
          <SearchBar
            searchType={'station'}
            placeholder={'Search in Playlists'}
          />
        </div>
      )}

      <ul>
        {stations.map((station, index) => (
          <StationPreview
            station={station}
            key={station.id}
            isCollapsed={isCollapsed}
            index={index}
            moveStation={moveStation}
            type={type}
            user={user}
          />
        ))}
      </ul>
    </section>
  )
}
