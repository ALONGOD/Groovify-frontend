import { useRef, useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { getTimeOfSent } from '../services/util.service'
import { BsThreeDots } from 'react-icons/bs'
import { Modal } from './Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'

import { FaPlay } from 'react-icons/fa'
import { LikeSongBtn } from './LikeSongBtn'
import { EqualizerBar } from './EqualizerBar'
import { setSongsInQueue } from '../store/actions/station.actions'
import { SET_PLAYER_CURRENT_SONG, SET_PLAYER_CURRENT_STATION, SET_PLAYER_IS_PLAYING } from '../store/reducers/station.reducer'

export function SongPreview({songs, song, idx, station, songModal, onToggleModal, type, likedSongs, }) {
  const dispatch = useDispatch()
  const [onSongHover, setOnSongHover] = useState(false)
  const { addedAt, duration, imgUrl, title, artist, album } = song
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const player = useSelector(state => state.stationModule.player)
  const { currSong, isPlaying } = player

  const isListTable = type === 'list-table'
  const isSongLiked = likedSongs?.some(likedSong => likedSong.id === song.id)
  const displayLikeBtn = onSongHover || isSongLiked

  const isCurrSong = currSong?.id === song?.id

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  function playSong(song) {
    if (songs) setSongsInQueue(songs)

    dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: song })
    dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: !isPlaying })
    console.log(station);
    if (station) {

      dispatch({
        type: SET_PLAYER_CURRENT_STATION,
        currStation: { id: station._id, name: station.name },
      })
    }
  }

  // function toggleModal() {
  //   isModalOpen ? closeModal() : openModal()
  // }

  function PlayOrPause() {
    return (isPlaying && isCurrSong) ? <IoIosPause /> : <IoIosPlay />
  }

  return (
    <li
      className={` ${currSong?.id === song?.id ? 'active' : ''}`}
      onMouseEnter={() => setOnSongHover(true)}
      onMouseLeave={() => setOnSongHover(false)}
      onDoubleClick={() => playSong(song)}
    >
      {isListTable && (
        <h4 onClick={() => playSong(song)} className="idx">
          {!onSongHover && (isPlaying && isCurrSong ? <EqualizerBar /> : idx + 1)}
          {onSongHover && <PlayOrPause />}
        </h4>
      )}
      <div className="main-details flex flex-row align-center">
        <div className="relative img-svg">
          <img src={imgUrl} alt="song-img" />
          {!isListTable && onSongHover && (
            <IoIosPlay onClick={() => playSong(song)} className="play-btn" />
          )}
        </div>
        <div className="song-details flex flex-column">
          <h4 className="title">{title}</h4>
          <h4 className="artist">{artist ? artist : 'Artist'}</h4>
        </div>
      </div>
      {isListTable && (
        <>
          <h4>{album ? album : 'Album'}</h4>
          <h4>{getTimeOfSent(addedAt)}</h4>
        </>
      )}
        {displayLikeBtn && (
          <LikeSongBtn song={song} isSongLiked={isSongLiked} />
        )}
      <div className="duration img-svg relative flex justify-start align-center">
        <h4>{duration ? duration : '3:30'}</h4>
        {onSongHover && (
          <BsThreeDots
            className="dots"
            onClick={ev => onToggleModal(ev, song)}
          />
        )}
        {songModal?.id === song?.id && <Modal openModal={openModal} closeModal={closeModal} modalType={'songOptions'} />}
      </div>
    </li>
  )
}
