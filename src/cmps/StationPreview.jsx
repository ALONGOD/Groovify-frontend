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
import { addSongToStation, getStationById } from '../store/actions/backend.station'
import { addToLikedSongs } from '../store/actions/backend.user'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

export function StationPreview({
  station,
  isCollapsed,
  index,
  moveStation,
  type,
  stations,
  setImgHover,
  stationIdParams
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.userModule.user)
  const player = useSelector(state => state.stationModule.player)
  const { currStation, isPlaying, currSong } = player

  const { isShuffled } = useSelector(state => state.stationModule.queue)

  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const isDragActive = useSelector(state => state.systemModule.isDragActive)

  if (station && (station._id || station.id)) {
    station.id = station._id ? station._id : station.id
    station.creator = station.creator ? station.creator : station.createdBy
  } else {
    console.error('Station is undefined or lacks a valid ID')
    return
  }

  var isStationLikedSongs = user?.likedSongsStation?.id === station?.id
  const isStationPlaying = currStation?.id === station?.id
  const isStationByUser = (station?.creator?.id === user?._id) || (station?.id === user?.likedSongsStation?.id)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'station',
    item: { id: station.id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['station','song'],
    hover: (item, monitor) => {

    },
    drop: (item, monitor) => {

      if (monitor.getItemType() === 'station') {
        const dragIndex = stations?.findIndex(s => s.id === item.id)
        const hoverIndex = stations?.findIndex(s => s.id === station?.id)
        
        moveStation(dragIndex, hoverIndex)
      } else if (monitor.getItemType() === 'song') {
        onAddSongWithDnD(item.song)
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))


  if (!station) return null

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

  function setHomeAverageColor(imgUrl) {
    if (setImgHover) setImgHover(imgUrl)
  }

  function onAddSongWithDnD(song) {
    try {
      isStationLikedSongs ? addToLikedSongs(song) : addSongToStation(station.id, song)
      showSuccessMsg(`Added to ${station.name}!`)
    } catch (err) {
      showErrorMsg('Couldn\'t add song')
    }
  }
  

  if (!station) return null
  return (
    <li
      ref={node => drag(drop(node))}
      className={`station-preview flex flex-row align-center 
        ${isOver ? 'dragging-over' : ''}
        ${type === 'search-results' ? 'search-results' : ''}
        ${isDragActive ? (isStationByUser ? 'droppable' : 'undroppable') : ''}
        ${isDragging ? 'dragging-item' : ''}
        ${stationIdParams === station.id ? 'watching-station' : ''}`}
      onClick={() => navigate(`/station/${station.id}`)}
      onMouseEnter={() => setHomeAverageColor(station?.imgUrl)}
    >
      <div className="relative">
        <img src={station?.imgUrl} alt="station img" />
        <PlayPauseBtn
          type={type}
          station={station}
          onTogglePlay={playOrPauseStation}
        />
      </div>
      {!isCollapsed && (
        <div className="flex flex-column">
          <h3 className={isStationPlaying ? 'active' : ''}>{station?.name}</h3>
          <div className="station-details flex flex-row align-center">
            {isStationLikedSongs && (
              <BsFillPinAngleFill className="pin" />
            )}
            {type !== 'home-station' && (
              <>
                <span>Playlist</span>
                <span className="divider">&#9679;</span>
                <span>
                  {type === 'userDetails' && station?.creator?.fullname}
                  {station?.length
                    ? `${station.length} songs`
                    : `${isStationLikedSongs
                      ? station.songs.length + ' songs'
                      : station?.creator?.fullname
                    }`}
                </span>
              </>
            )}
          </div>
        </div>
      )}
      {type === 'home-station' && (
        <div className="play-btn">
          <PlayPauseBtn
            station={station}
            type="top-result"
            onTogglePlay={playOrPauseStation}
          />
        </div>
      )}
    </li>
  )
}
