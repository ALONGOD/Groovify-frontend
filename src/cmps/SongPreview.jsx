import { useRef, useState } from 'react'
import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { getTimeOfSent } from '../services/util.service'
import { BsThreeDots } from 'react-icons/bs'
import { Modal } from './Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'

import { LikeSongBtn } from './LikeSongBtn'
import { EqualizerBar } from './EqualizerBar'
import { PlayPauseBtn } from './PlayPauseBtn'

export function SongPreview({ song, idx, station, songModal, onToggleModal, type, likedSongs }) {

  const [onSongHover, setOnSongHover] = useState(false)
  const { addedAt, duration, imgUrl, title, artist, album } = song
  const player = useSelector(state => state.stationModule.player)
  const { currSong, isPlaying } = player

  const isListTable = type === 'list-table'
  const isSongLiked = likedSongs?.some(likedSong => likedSong.id === song.id)
  const displayLikeBtn = onSongHover || isSongLiked

  const isCurrSong = currSong?.id === song?.id

  return (
    <li
      className={` ${currSong?.id === song?.id ? 'active' : ''}`}
      onMouseEnter={() => setOnSongHover(true)}
      onMouseLeave={() => setOnSongHover(false)}
      onDoubleClick={() => playSong(song)}
    >
      {isListTable && (
        <h4  className="idx">
          {!onSongHover && (isPlaying && isCurrSong ? <EqualizerBar /> : idx + 1)}
          {onSongHover && <PlayPauseBtn song={song} station={station}/>}
        </h4>
      )}
      <div className="main-details flex flex-row align-center">
        <div className="relative img-svg">
          <img src={imgUrl} alt="song-img" />
          {!isListTable && onSongHover && (
            <PlayPauseBtn song={song} station={station} onClick={() => playSong(song)} className="play-btn" />
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
        {songModal?.id === song?.id && <Modal modalType={'songOptions'} />}
      </div>
    </li>
  )
}
