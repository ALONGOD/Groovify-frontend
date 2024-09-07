import { BsFillPinAngleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { useDrag, useDrop } from 'react-dnd'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseBtn } from './PlayPauseBtn'
import {
  SET_PLAYER_CURRENT_SONG,
  SET_PLAYER_CURRENT_STATION,
  SET_PLAYER_IS_PLAYING,
} from '../store/reducers/station.reducer'
import { setSongsInQueue } from '../store/actions/station.actions'
import { SET_DETAILS_SIDEBAR } from '../store/reducers/system.reducer'

export function StationPreview({ station, isCollapsed, index, moveStation }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)

  const [onHover, setOnHover] = useState(false)
  const player = useSelector(state => state.stationModule.player)
  const { currStation, isPlaying, currSong } = player

  const queue = useSelector(state => state.stationModule.queue)
  const { isShuffled, songsQueue, shuffledQueue } = queue

  
  const { _id, id, imgUrl, name, songs } = station
  station.id = _id ? _id : id
  
  const isStationPlaying = currStation?.id === station?.id

  async function playOrPauseStation(ev) {
    ev.stopPropagation()
    
    const songs = station.songs
    let songToPlay

    if (currStation?.id !== station?._id) {
      const newQueue = await setSongsInQueue(songs)

      dispatch({ type: SET_DETAILS_SIDEBAR, state: 'songDetails' })
      dispatch({
        type: SET_PLAYER_CURRENT_STATION,
        currStation: { id: station._id, name: station.name },
      })
      if (isShuffled) songToPlay = newQueue.shuffledQueue[0]
      else songToPlay = newQueue.songsQueue[0]
      dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: songToPlay })
      dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: true })
    } else {
      dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: !isPlaying })
    }
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'STATION',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'STATION',
    hover: draggedItem => {
      if (draggedItem.index !== index) {
        moveStation(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  })

  drag(drop(ref))

  return (
    <li
      ref={ref}
      className={`station-preview flex flex-row align-center ${onHover ? 'hover' : ''}`}
      onClick={() => navigate(`/station/${station.id}`)}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="relative">
        <img src={imgUrl} alt="station img" />
        {onHover && (
          <PlayPauseBtn
            type="station-preview"
            station={station}
            onTogglePlay={playOrPauseStation}
          />
        )}
      </div>
      {!isCollapsed && (
        <div className="flex flex-column">
          <h3 className={isStationPlaying ? 'active' : ''}>{name}</h3>
          <div className="station-details flex flex-row align-center">
            { station.id === 'liked-songs' && <BsFillPinAngleFill className='pin' /> }
            <span>Playlist</span>
            <span className="divider">&#9679;</span>
            <span>{songs?.length} songs</span>
          </div>
        </div>
      )}
    </li>
  )
}
