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
import { stationService } from '../services/station/station.service.local.js'
import { SearchBar } from '../cmps/SearchBar'
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi'
import { DetailsHeaderActions } from '../cmps/StationDetails/DetailsHeaderActions.jsx'
import { getStationById } from '../store/actions/backend.station.js'

export function StationDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { stationId } = useParams()
  const user = useSelector(state => state.userModule.user)
  const station = useSelector(state => state.stationModule.stationDisplay)
  // console.log('station:', station)
  const [searchResults, setSearchResults] = useState([])

  const editOpen = useSelector(state => state.stationModule.editStationModal)
  const [isStationLiked, setIsStationLiked] = useState(false)

  let isStationLikedSongs 

  const [gradient, setGradient] = useState(null)

  useEffect(() => {
    isStationLikedSongs = user?.likedSongsStation?.id === stationId
    fetchStationFromService()
  }, [stationId])

  useEffect(() => {
    // if (user) isStationLikedSongs = user?.likedSongsStation.id === stationId
    setIsStationLiked(
      user?.likedStations?.some(likedStation => likedStation.id === stationId)
    )
  }, [user])

  async function fetchStationFromService() {
    try {
      if (isStationLikedSongs) return dispatch({ type: SET_STATION_DISPLAY, station: user.likedSongsStation })
      const fetchedStation = await getStationById(stationId)
      if (fetchedStation) {
        dispatch({ type: SET_STATION_DISPLAY, station: fetchedStation })
        setSearchResults([])
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
    dispatch({ type: SET_EDIT_MODAL, isOpen: true })
  }

  if (!station) return <h1>Loading...</h1>

  return (
    <section className="station-details flex flex-column">
      <div className="gradient" style={gradient}></div>
      <StationDetailsHeader
        station={station}
        toggleEditStation={toggleEditStation}
        setGradient={setGradient}
      />
      <div className="station-details-main">
        <DetailsHeaderActions
          toggleEditStation={toggleEditStation}
          isStationLiked={isStationLiked}
          station={station}
        />

        {station?.songs?.length === 0 && searchResults.length === 0 && (
          <div className="no-songs">
            <h2>Let's find something for your playlist</h2>
            <SearchBar
              searchType={'youtube-inline'}
              placeholder={'Search for songs or episodes'}
              onSearch={handleSearch} // Search handler
            />
          </div>
        )}

        {searchResults?.length > 0 && (
          <SongList songs={searchResults} type="search-results" />
        )}

        {station?.songs?.length > 0 && (
          <SongList songs={station.songs} type="list-table" station={station} />
        )}

        {editOpen && <Modal modalType="editStation" />}
      </div>
    </section>
  )
}
