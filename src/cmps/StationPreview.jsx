import { BsFillPinAngleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { useDrag, useDrop } from 'react-dnd'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PlayPauseBtn } from './PlayPauseBtn'
import {
  SET_PLAYER_CURRENT_SONG,
  SET_PLAYER_CURRENT_STATION,
  SET_PLAYER_IS_PLAYING,
} from '../store/reducers/station.reducer'
import { setSongsInQueue } from '../store/actions/station.actions'
import { SET_DETAILS_SIDEBAR } from '../store/reducers/system.reducer'
import { getStationById } from '../store/actions/backend.station'

export function StationPreview({
  station,
  isCollapsed,
  index,
  moveStation,
  type,
  user,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const player = useSelector(state => state.stationModule.player)
  const { currStation, isPlaying, currSong } = player

  const { isShuffled } = useSelector(state => state.stationModule.queue)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const { _id, id, imgUrl, name, songs } = station
  station.id = _id ? _id : id

  const isStationPlaying = currStation?.id === station?.id

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'station',
    item: { id: station.id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'station',
    hover: (item, monitor) => {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        setIsDraggingOver(false)
        return
      }
      setIsDraggingOver(true)
    },
    drop: item => {
      const dragIndex = item.index
      const hoverIndex = index
      console.log('hoverIndex:', hoverIndex)

      moveStation(dragIndex, hoverIndex)
      setIsDraggingOver(false)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  useEffect(() => {
    if (!isOver) {
      setIsDraggingOver(false); 
    }
  }, [isOver]);

  async function playOrPauseStation(ev) {
    ev.stopPropagation()
    const stationToPlay = await getStationById(station.id)

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

  return (
    <li
      ref={node => drag(drop(node))}
      className={`station-preview flex flex-row align-center ${
        isDraggingOver ? 'dragging' : ''
      } ${type === 'search-results' ? 'search-results' : ''}`}
      onClick={() => navigate(`/station/${station.id}`)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="relative">
        <img src={imgUrl} alt="station img" />
        <PlayPauseBtn
          type={type}
          station={station}
          onTogglePlay={playOrPauseStation}
        />
      </div>
      {!isCollapsed && (
        <div className="flex flex-column">
          <h3 className={isStationPlaying ? 'active' : ''}>{name}</h3>
          <div className="station-details flex flex-row align-center">
            {station.id === 'liked-songs' && (
              <BsFillPinAngleFill className="pin" />
            )}
            <span>Playlist</span>
            <span className="divider">&#9679;</span>
            <span>
              {type === 'userDetails'
                ? `By ${user.username}`
                : `${station?.creator?.fullname ? station?.creator?.fullname : station?.songs?.length + ' songs'}`}{' '}
            </span>
          </div>
        </div>
      )}
    </li>
  )
}
