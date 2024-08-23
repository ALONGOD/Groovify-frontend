import { useState } from 'react'
import { IoIosPlay } from 'react-icons/io'
import { getTimeOfSent } from '../../services/util.service'
import { BsThreeDots } from 'react-icons/bs'
import { Modal } from '../Modal/Modal'
import { useDispatch } from 'react-redux'
import { SET_CURRENT_SONG } from '../../store/reducers/station.reducer'

export function SongPreview({ song, idx, songModal, onToggleModal, type }) {
  const dispatch = useDispatch()
  const [onSongHover, setOnSongHover] = useState(false)

  const { addedAt, duration, imgUrl, title, artist, album } = song

  // const isSearchResults = type === 'search-results'
  const isListTable = type === 'list-table'

  function playSong() {
    console.log(song);
    
    dispatch({ type: SET_CURRENT_SONG, songToPlay: song })
  }

  return (
    <li
      className="flex flex-row align-center"
      onMouseEnter={() => setOnSongHover(true)}
      onMouseLeave={() => setOnSongHover(false)}
    >
      {isListTable && (
        <h4 onClick={playSong} className="idx">{onSongHover ? <IoIosPlay /> : idx + 1}</h4>
      )}
      <div className="main-details flex flex-row align-center">
        <img src={imgUrl} alt="song-img" />
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
