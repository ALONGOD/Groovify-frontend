import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader'
import { SongList } from '../cmps/SongList'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../cmps/Modal/Modal'
import {
  SET_EDIT_MODAL,
  SET_STATION_DISPLAY,
} from '../store/reducers/station.reducer'
import { SearchBar } from '../cmps/SearchBar'
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi'
import { DetailsHeaderActions } from '../cmps/StationDetails/DetailsHeaderActions.jsx'
import {
  getStationById,
  onUpdateStation,
} from '../store/actions/backend.station.js'
import { updateLikedSongs } from '../store/actions/backend.user.js'
import {
  eventBus,
  showErrorMsg,
  SONG_ADDED,
} from '../services/event-bus.service.js'
import { UsersWatching } from '../cmps/StationDetails/UsersWatching.jsx'
import { userService } from '../services/user/user.service.remote.js'
import { socketService } from '../services/socket.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { LOADING_DONE, LOADING_START } from '../store/reducers/system.reducer.js'

export function StationDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { stationId } = useParams()

  const user = useSelector(state => state.userModule.user)
  const station = useSelector(state => state.stationModule.stationDisplay)
  const editOpen = useSelector(state => state.stationModule.editStationModal)
  const isMobile = useSelector(state => state.systemModule.isMobile)

  const [noSongsVisible, setNoSongsVisible] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [isStationLiked, setIsStationLiked] = useState(false)
  const [connectedUsers, setConnectedUsers] = useState([])

  const isStationByUser = user?._id === station?.createdBy?.id
  let isStationLikedSongs = user?.likedSongsStation?.id === stationId

  const [gradient, setGradient] = useState(null)

  useEffect(() => {
    joinStation()

    return () => {
      leaveStation()
    }
  }, [station?._id])

  useEffect(() => {
    socketService.on('updated-station', data => socketUpdateStation(data))
    socketService.on('station-current-users', data => setUsersWatching(data))

    const unsubscribe = eventBus.on(SONG_ADDED, () => {
      setNoSongsVisible(false)
      fetchStationFromService()
    })

    return () => {
      socketService.off('station-current-users')
      socketService.off('updated-station')
      leaveStation()
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    fetchStationFromService()
  }, [stationId])

  useEffect(() => {
    setIsStationLiked(
      user?.likedStations?.some(likedStation => likedStation.id === stationId)
    )
  }, [user])

  async function socketUpdateStation(updatedStation) {
    console.log('socket update:', updatedStation)
    dispatch({ type: SET_STATION_DISPLAY, station: updatedStation })
  }

  async function setUsersWatching(users) {
    setConnectedUsers(
      users.filter(dataUser => {
        return dataUser.id !== user._id && dataUser.id
      })
    )
  }

  async function joinStation() {
    if (!user) {
      const user = await userService.getLoggedinUser()
      console.log('user:', user)
      dispatch({ type: SET_USER, user })
    }
    if (stationId) {
      socketService.emit('join-station', { stationId })
    }
  }

  function leaveStation() {
    if (stationId) {
      socketService.emit('leave-station', { stationId })
    }
  }

  async function fetchStationFromService() {
    try {
      dispatch({ type: LOADING_START })
      if (isStationLikedSongs) {
        return dispatch({
          type: SET_STATION_DISPLAY,
          station: user.likedSongsStation,
        })
      }
      const fetchedStation = await getStationById(stationId)
      if (fetchedStation) {
        dispatch({ type: SET_STATION_DISPLAY, station: fetchedStation })
        setSearchResults([])
        setNoSongsVisible(fetchedStation.songs.length === 0)
      } else {
        console.error('Station not found')
      }
    } catch (err) {
      navigate(-1)
      console.error('Failed to fetch station:', err)
    } finally {
      dispatch({ type: LOADING_DONE })
    }
  }

  async function handleSearch(query) {
    try {
      const results = await YouTubeAPIService.searchVideos(query)
      setSearchResults(results)
    } catch (error) {
      console.error('Error fetching YouTube API:', error)
    }
  }

  function toggleEditStation() {
    if (!isStationByUser) return
    dispatch({ type: SET_EDIT_MODAL, isOpen: true })
  }

  async function moveSong(fromIndex, toIndex) {
    try {
      if (user._id !== station.createdBy.id) return showErrorMsg('Not allowed')
      const updatedSongs = [...station.songs]
      const [movedSong] = updatedSongs.splice(fromIndex, 1)
      updatedSongs.splice(toIndex, 0, movedSong)
      dispatch({
        type: SET_STATION_DISPLAY,
        station: { ...station, songs: updatedSongs },
      })
      if (isStationLikedSongs)
        await updateLikedSongs({ ...station, songs: updatedSongs })
      else {
        await onUpdateStation({ ...station, songs: updatedSongs })
        socketService.emit('updated-station', {...station, songs: updatedSongs})
      }
    } catch (err) {
      showErrorMsg('Failed to move song')
      dispatch({
        type: SET_STATION_DISPLAY,
        station: { ...station, songs: station?.songs },
      })
      socketService.emit('updated-station', {...station, songs: station?.songs})
    }
  }

  if (!station) return 

  return (
    <section className="station-details flex flex-column">
      <div className="gradient" style={gradient}></div>

      <StationDetailsHeader
        station={station}
        toggleEditStation={toggleEditStation}
        setGradient={setGradient}
        isStationByUser={isStationByUser}
        isStationLikedSongs={isStationLikedSongs}
      />
      {connectedUsers && <UsersWatching users={connectedUsers} />}
      <div className="station-details-main">
        <DetailsHeaderActions
          toggleEditStation={toggleEditStation}
          isStationLiked={isStationLiked}
          station={station}
          isStationByUser={isStationByUser}
          isStationLikedSongs={isStationLikedSongs}
          user={user}
          isMobile={isMobile}
        />

        {station?.songs?.length === 0 && noSongsVisible && (
          <div className="no-songs">
            <h2>Let's find something for your playlist</h2>
            <SearchBar
              searchType={'youtube-inline'}
              placeholder={'Search for songs or episodes'}
              onSearch={handleSearch}
            />
          </div>
        )}

        {searchResults?.length > 0 && (
          <SongList songs={searchResults} type="search-results" />
        )}

        {station?.songs?.length > 0 && (
          <SongList
            songs={station.songs}
            type="list-table"
            station={station}
            moveSong={moveSong}
          />
        )}

        {editOpen && <Modal modalType="editStation" />}
      </div>
    </section>
  )
}
