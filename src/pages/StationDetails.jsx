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
  onUpdateStation
} from '../store/actions/backend.station.js'
import { updateLikedSongs } from '../store/actions/backend.user.js'
import { eventBus, showErrorMsg, showUserMsg, SONG_ADDED } from '../services/event-bus.service.js'
import { socketService } from '../services/socket.service.js'
import { GoDotFill } from 'react-icons/go'

export function StationDetails() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { stationId } = useParams()

  const user = useSelector(state => state.userModule.user)
  const station = useSelector(state => state.stationModule.stationDisplay)
  const editOpen = useSelector(state => state.stationModule.editStationModal)

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
  }, [station])


  useEffect(() => {
    socketService.on('station-current-users', (data) => {
      console.log('data:', data);
      setConnectedUsers(data.filter(dataUser => dataUser.id !== user._id))
    })

    console.log('connectedUsers:', connectedUsers)

    const unsubscribe = eventBus.on(SONG_ADDED, () => {
      setNoSongsVisible(false)
      fetchStationFromService()
    })

    return () => {
      socketService.off('station-current-users')
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

  function joinStation() {
    console.log(user);

    if (stationId) {
      socketService.emit('join-station', { stationId })
    }
  }

  function leaveStation() {
    console.log('leave');

    if (stationId) {
      socketService.emit('leave-station', { stationId })
    }
  }

  async function fetchStationFromService() {
    try {
      if (isStationLikedSongs)
        return dispatch({
          type: SET_STATION_DISPLAY,
          station: user.likedSongsStation,
        })
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
      const updatedSongs = [...station.songs]
      const [movedSong] = updatedSongs.splice(fromIndex, 1)
      updatedSongs.splice(toIndex, 0, movedSong)
      dispatch({
        type: SET_STATION_DISPLAY,
        station: { ...station, songs: updatedSongs },
      })
      if (isStationLikedSongs)
        await updateLikedSongs({ ...station, songs: updatedSongs })
      else await onUpdateStation({ ...station, songs: updatedSongs })
    } catch (err) {
      showErrorMsg('Failed to move song')
      dispatch({ type: SET_STATION_DISPLAY, station: { ...station, songs: station?.songs } })
    }
  }

  if (!station) return <h1>Loading...</h1>

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
      {connectedUsers?.map(user => {
        return <div className='user-watching flex flex-row align-center justify-start'>
          <GoDotFill />
          <h3>{user.fullname}</h3>
        </div>
      })}
      <div className="station-details-main">
        <DetailsHeaderActions
          toggleEditStation={toggleEditStation}
          isStationLiked={isStationLiked}
          station={station}
          isStationByUser={isStationByUser}
          isStationLikedSongs={isStationLikedSongs}
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
