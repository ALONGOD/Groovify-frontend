import { useEffect, useState, useRef } from 'react'
import { StationPreview } from './StationPreview'
import { stationService } from '../services/station/station.service.local'
import { useDispatch, useSelector } from 'react-redux'
import { SearchBar } from './SearchBar.jsx'
import { Modal } from './Modal/Modal.jsx'
import { FaBars } from 'react-icons/fa6'
import update from 'immutability-helper'
import { SET_USER } from '../store/reducers/user.reducer.js'

export function StationList({ isCollapsed, stations, type, moveStation, setImgHover }) {
  const searchTerm = useSelector(state => state.stationModule.searchTerm)
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


  return (
    <section className="station-list">
      <ul className={type === 'search-results' ? 'flex flex-row' : ''}>
        {stations?.map((station, index) => (
          <StationPreview
            station={station}
            stations={stations}
            key={station.id}
            isCollapsed={isCollapsed}
            index={index}
            moveStation={moveStation}
            type={type}
            setImgHover={setImgHover}
          />
        ))}
      </ul>
    </section >
  )
}
