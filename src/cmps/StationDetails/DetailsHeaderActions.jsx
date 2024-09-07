import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStation } from '../../store/actions/station.actions.js'
import { stationService } from '../../services/station/station.service.local.js'
import { userService } from '../../services/user/user.service.local.js'
import { BsThreeDots } from 'react-icons/bs'
import { CiCirclePlus } from 'react-icons/ci'
import { FaListUl } from 'react-icons/fa'
import { IoPlayCircle } from 'react-icons/io5'
import { ThreeDotsModal } from '../Modal/ThreeDotsModal'
import { SET_USER } from '../../store/reducers/user.reducer' // Make sure this import is correct
import { store } from '../../store/store' // Import the store if it's not already included
import { FaCheckCircle } from 'react-icons/fa' // Importing the checkmark icon
import { CheckmarkCircle } from '../svgs/CheckmarkCircle.jsx'

export function DetailsHeaderActions({
  toggleEditStation,
  isNewStation,
  station: propStation,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)
  const dispatch = useDispatch()
  const station =
    useSelector(state => state.stationModule.station) || propStation
  const user = useSelector(state => state.userModule.user)

  // Toggle modal visibility
  function toggleModal() {
    setIsModalOpen(prev => !prev)
  }

  function closeModal() {
    setIsModalOpen(!isModalOpen)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef])

  async function handlePlusClick() {
    saveStationToLiked(station)
  }
  
  function handleRemoveClick() {
    removeStationFromLiked(station._id)
  }

  return (
    <div className="station-header-actions flex flex-row justify-between align-center">
      <div className="btns-container flex flex-row gap-8 align-center">
        <IoPlayCircle className="play-circle" />
        {isNewStation ? (
          <CiCirclePlus className="plus-circle" onClick={handlePlusClick} />
        ) : (
          <CheckmarkCircle classes="check-circle" onClick={handleRemoveClick}/>
        )}
        <div ref={modalRef} className="relative">
          <BsThreeDots className="three-dots" onClick={toggleModal} />
          {isModalOpen && (
            <ThreeDotsModal
              closeModal={closeModal}
              toggleEditStation={toggleEditStation}
            />
          )}
        </div>
      </div>

      <div className="list-style-change flex flex-row gap-2 align-center">
        <FaListUl />
        <h4>List</h4>
      </div>
    </div>
  )
}
