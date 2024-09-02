import { BsFillPinAngleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { useDrag, useDrop } from 'react-dnd'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseBtn } from './PlayPauseBtn'
import { SET_PLAYER_CURRENT_SONG, SET_PLAYER_CURRENT_STATION, SET_PLAYER_IS_PLAYING } from '../store/reducers/station.reducer'

export function StationPreview({ station, isCollapsed, index, moveStation }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)
  const player = useSelector(state => state.stationModule.player)
  const { currStation, isPlaying, currSong } = player
  const isStationPlaying = currStation?.id === station?._id
  const [onHover, setOnHover] = useState(false)

  const { _id, imgUrl, name, songs } = station

  function playOrPauseStation() {
    const songs = station.songs
    if (currStation.id !== station._id) {
      dispatch({ type: SET_PLAYER_CURRENT_STATION, currStation: {id: station._id, name: station.name} })
      dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: songs[0] })
      dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: true })
    } else {
        console.log('sup');
        
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
      className="station-preview flex flex-row"
      onClick={() => navigate(`/station/${_id}`)}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="relative">
        <img src={imgUrl} alt="station img" />
        {onHover && (
          <PlayPauseBtn
            type="station-preview"
            onTogglePlay={playOrPauseStation}
          />
        )}
      </div>
      {!isCollapsed && (
        <div className="flex flex-column">
          <h3 className={isStationPlaying ? 'active' : ''}>{name}</h3>
          <div className="station-details flex flex-row">
            <span>Playlist</span>
            <span className="divider">&#9679;</span>
            <span>{songs?.length} songs</span>
          </div>
        </div>
      )}
    </li>
  )
}
