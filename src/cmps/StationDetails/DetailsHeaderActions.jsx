import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import {
  SET_PARTY_PLAY,
  SET_PARTY_STATION_ID,
  SET_PLAYER_CURRENT_SONG,
  SET_PLAYER_CURRENT_STATION,
  SET_PLAYER_IS_PLAYING,
  TOGGLE_PARTY_PLAY,
} from '../../store/reducers/station.reducer.js'
import { socketService } from '../../services/socket.service.js'
import { FaPause } from 'react-icons/fa6'
import { PlayPauseBtn } from './../PlayPauseBtn';
import { getStationById } from '../../store/actions/backend.station.js'
import { setSongsInQueue } from '../../store/actions/station.actions.js'
import { SET_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer.js'

export function DetailsHeaderActions({
  toggleEditStation,
  isStationLiked,
  station,
  isStationByUser,
  isStationLikedSongs,
  user,
  isMobile
}) {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)
  const player = useSelector(state => state.stationModule.player)
  const currStation = player.currStation
  const isShuffled = useSelector(state => state.stationModule.queue.isShuffled)
  const isPlaying = player.isPlaying
  const partyListen = player.partyListen
  console.log('partyListen:', partyListen.stationId)
  console.log('currStation:', currStation);
  

  station.id = station._id ? station._id : station.id

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

  async function playOrPauseStation(ev) {
    ev.stopPropagation()
    const stationToPlay = await getStationById(station._id)

    const songs = stationToPlay?.songs
    let songToPlay

    if (currStation?.id !== station?.id) {
      const newQueue = await setSongsInQueue(songs)

      dispatch({ type: SET_DETAILS_SIDEBAR, state: 'songDetails' })
      dispatch({
        type: SET_PLAYER_CURRENT_STATION,
        currStation: { id: station.id, name: station.name },
      })
      if (isShuffled) songToPlay = newQueue.shuffledQueue[0]
      else songToPlay = newQueue.songsQueue[0]
      dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: songToPlay })
      dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: true })
    } else {
      dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: !isPlaying })
    }
  }

  async function handlePlusClick() {
    await saveStationToLiked(station)
  }

  function handleRemoveClick() {
    removeStationFromLiked(station?._id)
  }

  function togglePartyPlay() {
    dispatch({ type: TOGGLE_PARTY_PLAY })
    dispatch({ type: SET_PARTY_STATION_ID, stationId: station?._id })
  }
  
  const isThisPartyStation = (partyListen.stationId === station.id) 
  const isPartyStationPlaying = isThisPartyStation && isPlaying

  return (
    <div className="station-header-actions flex flex-row justify-between align-center">
      <div className="btns-container flex flex-row gap-8 align-center">
        <PlayPauseBtn type={'userDetails'} station={station} onTogglePlay={playOrPauseStation}/>
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
        <button
          onClick={togglePartyPlay}
          className={(isThisPartyStation && partyListen.state) ? 'exit-party' : 'play-together'}
        >
          {(isThisPartyStation && partyListen.state) ? 'Exit Party' : 'Play Together'}
        </button>
      </div>
      {(partyListen.state && !isMobile && isThisPartyStation) && (
        <div className="flex flex-row ">
          {isPlaying ? <EqualizerBar /> : <FaPause className='pause'/>}
          <h3 className="party-active">{(isThisPartyStation && isPlaying) ? 'Party in session...' : 'Party paused'}</h3>
        </div>
      )}
    </div>
  )
}
