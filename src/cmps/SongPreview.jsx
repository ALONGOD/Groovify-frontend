import { useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Modal } from './Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { LikeSongBtn } from './LikeSongBtn'
import { EqualizerBar } from './EqualizerBar'
import { PlayPauseBtn } from './PlayPauseBtn'
import {
  SET_PLAYER_CURRENT_SONG,
  SET_PLAYER_CURRENT_STATION,
  SET_PLAYER_IS_PLAYING,
} from '../store/reducers/station.reducer'
import { setSongsInQueue, toggleModal } from '../store/actions/station.actions'
import { getTimeOfSent } from '../services/util.service'
import { useDrag, useDrop } from 'react-dnd'

export function SongPreview({
  song,
  idx,
  station,
  songModal,
  type,
  likedSongs,
  onSetSongsInQueue,
  moveSong = {} // Add moveSong prop for drag and drop functionality
}) {
  const dispatch = useDispatch()
  const [onSongHover, setOnSongHover] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) // Local state for modal visibility
  const ref = useRef(null)

  const { addedAt, duration, imgUrl, title, artist, album } = song
  const player = useSelector(state => state.stationModule.player)
  const { currSong, isPlaying } = player

  const isListTable = type === 'list-table'
  const isSongLiked = likedSongs?.some(likedSong => likedSong.id === song.id)
  const displayLikeBtn = onSongHover || isSongLiked

  const isCurrSong = currSong?.id === song?.id

  const [{ isDragging }, drag] = useDrag({
    type: 'SONG',
    item: { index: idx },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'SONG',
    hover: draggedItem => {
      if (draggedItem.index !== idx) {
        moveSong(draggedItem.index, idx)
        draggedItem.index = idx
      }
    },
  })

  drag(drop(ref))

  async function playSong(song) {
    if (onSetSongsInQueue) await onSetSongsInQueue()
    if (station)
      dispatch({
        type: SET_PLAYER_CURRENT_STATION,
        currStation: { id: station._id, name: station.name },
      })
    if (currSong?.id !== song?.id) {
      dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: song })
    }
    dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: true })
  }

  function onToggleModal(event, song) {
    event.stopPropagation()
    toggleModal(song)
  }

  // Toggle the local modal state and dispatch the global modal action
  function onLocalToggleModal(event, song) {
    event.stopPropagation()
    onToggleModal(event, song)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <li
      ref={ref} // Attach the ref to the list item for drag and drop
      className={`song-preview flex align-center ${isCurrSong ? 'active' : ''}`}
      onMouseEnter={() => setOnSongHover(true)}
      onMouseLeave={() => setOnSongHover(false)}
      onDoubleClick={() => playSong(song)}
      style={{ opacity: isDragging ? 0.5 : 1 }} // Adjust opacity while dragging
    >
      {isListTable && (
        <h4 className="idx relative">
          {!onSongHover && (isPlaying && isCurrSong ? <EqualizerBar /> : idx + 1)}
          {onSongHover && (
            <PlayPauseBtn
              song={song}
              station={station}
              onSetSongsInQueue={() => setSongsInQueue([song])}
            />
          )}
        </h4>
      )}
      <div className="main-details flex flex-row align-center">
        <div className="relative img-svg">
          <img src={song.imgUrl} alt="song-img" />
          {!isListTable && onSongHover && (
            <PlayPauseBtn
              song={song}
              station={station}
              onSetSongsInQueue={() => setSongsInQueue([song])}
              className="play-btn"
            />
          )}
        </div>
        <div className="song-info">
          <h4 className="title">{song.title}</h4>
          <h4 className="artist">{song.artist || 'Artist'}</h4>
        </div>
      </div>
      {isListTable && (
        <>
          <h4>{song.album || 'Album'}</h4>
          <h4>{getTimeOfSent(song.addedAt)}</h4>
        </>
      )}
      {displayLikeBtn && <LikeSongBtn song={song} isSongLiked={isSongLiked} />}
      <div className="duration img-svg relative flex justify-start align-center">
        <h4>{song.duration || '3:30'}</h4>
        {onSongHover && (
          <BsThreeDots className="dots" onClick={onToggleModal} />
        )}
        {isModalOpen && <Modal modalType="songOptions" />}
      </div>
    </li>
  )
}
