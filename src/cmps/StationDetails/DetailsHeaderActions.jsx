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
    try {
      if (!station) {
        console.error('Station not found.')
        return
      }
      if (station.likedByUsers && station.likedByUsers.includes(user._id)) {
        console.log('Station is already liked by the user.')
        return
      }

      const updatedUser = { ...user }
      updatedUser.likedStations.push({
        id: station._id,
        name: station.name,
        creator: station.createdBy.fullname,
        img: station.imgUrl,
      })

      await userService.saveLoggedinUser(updatedUser)

      dispatch({ type: SET_USER, user: updatedUser })

      const updatedStation = { ...station }
      if (!updatedStation.likedByUsers) {
        updatedStation.likedByUsers = []
      }
      updatedStation.likedByUsers.push(user._id)

      await stationService.save(updatedStation)

      dispatch(updateStation(updatedStation))
    } catch (err) {
      console.error('Failed to add station to likedStations:', err)
    }
  }
  
  const handleRemoveClick = async () => {
    try {
      if (!station) {
        console.error('Station not found.')
        return
      }

      const updatedUser = { ...user }
      updatedUser.likedStations = updatedUser.likedStations.filter(
        likedStation => likedStation.id !== station._id
      )

      await userService.saveLoggedinUser(updatedUser)
      store.dispatch({ type: SET_USER, user: updatedUser })

      const updatedStation = { ...station }
      updatedStation.likedByUsers = updatedStation.likedByUsers.filter(
        userId => userId !== user._id
      )

      await stationService.save(updatedStation)
      dispatch(updateStation(updatedStation))
    } catch (err) {
      console.error('Failed to remove station from likedStations:', err)
    }
  }

  return (
    <div className="station-header-actions flex flex-row justify-between align-center">
      <div className="flex flex-row gap-8 align-center">
        <IoPlayCircle className="play-circle" />
        {isNewStation ? (
          <CiCirclePlus className="plus-circle" onClick={handlePlusClick} />
        ) : (
          <FaCheckCircle className="check-circle" onClick={handleRemoveClick} /> // Conditionally rendering the checkmark
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
