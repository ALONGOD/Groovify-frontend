import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { BsThreeDots } from 'react-icons/bs'
import { CiCirclePlus } from 'react-icons/ci'
import { FaListUl } from 'react-icons/fa'
import { IoPlayCircle } from 'react-icons/io5'
import { ThreeDotsModal } from '../Modal/ThreeDotsModal'
import { CheckmarkCircle } from '../svgs/CheckmarkCircle.jsx'
import {
  removeStationFromLiked,
  saveStationToLiked,
} from '../../store/actions/backend.user.js'

export function DetailsHeaderActions({
  toggleEditStation,
  isStationLiked,
  station,
  isStationByUser,
  isStationLikedSongs,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)


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
    await saveStationToLiked(station)
  }

  function handleRemoveClick() {
    removeStationFromLiked(station?._id)
  }

  return (
    <div className="station-header-actions flex flex-row justify-between align-center">
      <div className="btns-container flex flex-row gap-8 align-center">
        <IoPlayCircle className="play-circle" />
        {(!isStationByUser && !isStationLikedSongs) &&
          (!isStationLiked ? (
            <CiCirclePlus className="plus-circle" onClick={handlePlusClick} />
          ) : (
            <CheckmarkCircle
              classes="check-circle"
              onClick={handleRemoveClick}
            />
          ))}
        <div ref={modalRef} className="relative">
          {isStationByUser && (
            <BsThreeDots className="three-dots" onClick={toggleModal} />
          )}
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
