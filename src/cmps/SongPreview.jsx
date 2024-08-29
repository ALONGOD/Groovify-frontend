import { useState } from 'react'
import { IoIosPlay } from 'react-icons/io'
import { getTimeOfSent } from '../services/util.service'
import { BsThreeDots } from 'react-icons/bs'
import { Modal } from './Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'

import { FaPlay } from 'react-icons/fa'
import { LikeSongBtn } from './LikeSongBtn'

export function SongPreview({
  playSong,
  currSong,
  song,
  idx,
  songModal,
  onToggleModal,
  type,
  likedSongs,
}) {
  console.log('song:', song)
  const [onSongHover, setOnSongHover] = useState(false)
  const { addedAt, duration, imgUrl, title, artist, album } = song
  const isListTable = type === 'list-table'
  const isSongLiked = likedSongs?.some(likedSong => likedSong.id === song.id)
  const displayLikeBtn = onSongHover || isSongLiked

  return (
    <li
      className={`flex flex-row align-center ${currSong?.id === song?.id ? 'active' : ''
        }`}
      onMouseEnter={() => setOnSongHover(true)}
      onMouseLeave={() => setOnSongHover(false)}
    >
      {isListTable && (
        <h4 onClick={() => playSong(song)} className="idx">
          {onSongHover ? <IoIosPlay /> : idx + 1}
        </h4>
      )}
      <div className="main-details flex flex-row align-center">
        <div className="relative">
          <img src={imgUrl} alt="song-img" />
          {!isListTable && onSongHover && (
            <FaPlay onClick={e => playSong(song)} className="play-btn" />
          )}
        </div>
        <div className="song-details flex flex-column">
          <h4 className="title">{title}</h4>
          <h4>{artist ? artist : 'Artist'}</h4>
        </div>
      </div>
      {isListTable && (
        <>
          <h4>{album ? album : 'Album'}</h4>
          <h4>{getTimeOfSent(addedAt)}</h4>
        </>
      )}
      <div className="like-song-container flex align-center justify-start">
        {displayLikeBtn && (
          <LikeSongBtn song={song} isSongLiked={isSongLiked} />
        )}
      </div>
      <div className="duration relative flex justify-start align-center">
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
