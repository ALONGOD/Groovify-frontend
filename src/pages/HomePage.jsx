import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PlayPauseBtn } from '../cmps/PlayPauseBtn'
import { query } from '../store/actions/backend.station'
import { StationList } from '../cmps/StationList'
import { SpotifyAPIService } from '../services/spotifyAPI/spotifyAPI.service'
import { LOADING_DONE, LOADING_START } from '../store/reducers/system.reducer'

export function Homepage() {
    const dispatch = useDispatch()

  const [stations, setStations] = useState([])
  const [gridStations, setGridStations] = useState([])
  const [madeForYouStations, setMadeForYouStations] = useState([])
  const [recommendedStations, setRecommendedStations] = useState([])
  const history = useSelector(state => state.stationModule.history) || []
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const fetchedStations = await query('')
        setStations(fetchedStations)
        setGridStations(fetchedStations.slice(0, 8))
        setMadeForYouStations(fetchedStations.slice(0, 6))
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    }
    fetchStations()

    // Fetch recommended stations
    const fetchRecommendedStations = async () => {
      try {
        dispatch({ type: LOADING_START })
        const recommended = await SpotifyAPIService.getRecommendedSongs('pop') // 'pop' can be dynamic
        setRecommendedStations(recommended.slice(0, 6))
      } catch (error) {
        console.error('Error fetching recommended stations:', error)
      } finally {
        dispatch({ type: LOADING_DONE })
      }
    }
    fetchRecommendedStations()
  }, [])

  const handleStationClick = stationId => {
    if (stationId) {
      navigate(`/station/${stationId}`)
    } else {
      console.error('Station ID is undefined')
    }
  }

  return (
    <div className="homepage-container flex flex-column">
      <section className="top-section">
        <div className="filter-buttons">
          <button className="filter-btn">All</button>
          <button className="filter-btn">Music</button>
          <button className="filter-btn">Podcasts</button>
        </div>
      </section>

      <section className="stations-section">
        <StationList stations={gridStations} type="home-station" />
      </section>
      <section className="made-for-you-section">
        <h2>Made For You</h2>
        <StationList stations={madeForYouStations} type={'search-results'} />
      </section>

      <section className="featured-stations-section">
        <h2>Featured Stations</h2>
        <StationList
          stations={recommendedStations.map(song => ({
            id: song.spotifyUrl,
            title: song.title,
            artist: song.artist,
            imgUrl: song.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      <div className="history-section">
        <h2>Recently Played</h2>
        {history.length > 0 ? (
          <div className="history-container">
            {history.map(song => (
              <div key={song.id} className="history-card">
                <div className="history-img">
                  <img src={song.imgUrl} alt={song.title} />
                  <div className="play-btn">
                    <PlayPauseBtn
                      song={song}
                      station={null}
                      type="history-song"
                    />
                  </div>
                </div>
                <h3 className="history-song-name">{song.title}</h3>
                <p className="history-artist">{song.artist}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recently played songs</p>
        )}
      </div>
    </div>
  )
}
