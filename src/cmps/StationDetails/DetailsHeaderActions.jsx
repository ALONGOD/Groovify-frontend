import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { BsPauseBtn, BsThreeDots } from 'react-icons/bs'
import { CiCirclePlus } from 'react-icons/ci'
import { FaListUl } from 'react-icons/fa'
import { IoPauseCircleOutline, IoPlayCircle } from 'react-icons/io5'
import { ThreeDotsModal } from '../Modal/ThreeDotsModal'
import { CheckmarkCircle } from '../svgs/CheckmarkCircle.jsx'
import { EqualizerBar } from './../EqualizerBar'
import {
  removeStationFromLiked,
  saveStationToLiked,
} from '../../store/actions/backend.user.js'
import { BiPauseCircle } from 'react-icons/bi'
import { IoIosPause } from 'react-icons/io'
import { SET_PARTY_PLAY, TOGGLE_PARTY_PLAY } from '../../store/reducers/station.reducer.js'

export function DetailsHeaderActions({
  toggleEditStation,
  isStationLiked,
  station,
  isStationByUser,
  isStationLikedSongs,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)
  const player = useSelector(state => state.stationModule.player)
  const isPlaying = player.isPlaying

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

  function togglePartyPlay() {
    dispatch({ type: TOGGLE_PARTY_PLAY})
  }

  return (
    <div className="station-header-actions flex flex-row justify-between align-center">
      <div className="btns-container flex flex-row gap-8 align-center">
        <IoPlayCircle className="play-circle" />
        {!isStationByUser &&
          !isStationLikedSongs &&
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
        <button onClick={togglePartyPlay} className={isPlaying ? 'exit-party' : 'play-together'}>
          {isPlaying ? 'Exit Party' : 'Play Together'}
        </button>
      </div>
      {isPlaying && (
        <div className="flex flex-row ">
          <EqualizerBar />
          <h3 className="party-active">Party in session...</h3>
        </div>
      )}
    </div>
  )
}
