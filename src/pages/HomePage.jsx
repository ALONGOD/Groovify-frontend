import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PlayPauseBtn } from '../cmps/PlayPauseBtn'
import { query } from '../store/actions/backend.station'
import { StationList } from '../cmps/StationList'
import { SpotifyAPIService } from '../services/spotifyAPI/spotifyAPI.service'
import { LOADING_DONE, LOADING_START } from '../store/reducers/system.reducer'
import { FastAverageColor } from 'fast-average-color'
import { adjustBrightnessAndSaturation } from '../services/util.service'

export function Homepage() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.userModule.user)

  const [stations, setStations] = useState([])
  const [gridStations, setGridStations] = useState([])
  const [madeForYouStations, setMadeForYouStations] = useState([])
  console.log('madeForYouStations:', madeForYouStations)
  const [category, setCategory] = useState(null);
  
  const [featuredStations, setFeaturedStations] = useState([])
  const [popStations, setPopStations] = useState([])
  const [rockStations, setRockStations] = useState([])
  const [latinStations, setLatinStations] = useState([])
  const [jazzStations, setJazzStations] = useState([])
  const [hipHopStations, setHipHopStations] = useState([])
  const [rnbStations, setRnbStations] = useState([])
  const [indieStations, setIndieStations] = useState([])
  const [kpopStations, setKpopStations] = useState([])
  const [chillStations, setChillStations] = useState([])
  const [workoutStations, setWorkoutStations] = useState([])

  const [imgHover, setImgHover] = useState(null);
  console.log('imgHover:', imgHover)
  
  const [gradient, setGradient] = useState(null);
  console.log('gradient:', gradient)
  const fac = new FastAverageColor

  const history = useSelector(state => state.stationModule.history) || []
  const navigate = useNavigate()

  const categories = ['all', 'music', 'podcasts']

  useEffect(() => {
      fac
        .getColorAsync(imgHover)
        .then(color => {
          const color1 = adjustBrightnessAndSaturation(color.hex, 0.6, 1.8)
          const color2 = '#121212'
          setGradient({
            backgroundImage: `linear-gradient(to bottom, ${color1} 10%, ${color2} 100%)`,
          })
        })
        .catch(err => console.error('Error getting color from image:', err))
    
  }, [imgHover])

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const fetchedStations = await query('')
        setStations(fetchedStations)
        setGridStations(fetchedStations.slice(0, 8))
        setFeaturedStations(fetchedStations.slice(0, 6))
      } catch (error) {
        console.error('Error fetching stations:', error)
      }
    }
    fetchStations()

    const fetchGenreStations = async () => {
      try {
        dispatch({ type: LOADING_START })

        const [pop, rock, latin, jazz, hipHop, rnb, indie, kpop, chill, workout] = await Promise.all([
          SpotifyAPIService.fetchFeaturedPlaylists('pop', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('latin', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('rock', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('jazz', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('hip-hop', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('r&b', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('indie', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('k-pop', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('chill', 'US'),
          SpotifyAPIService.fetchFeaturedPlaylists('workout', 'US')
        ])

        setPopStations(pop)
        setRockStations(rock)
        setLatinStations(latin)
        setJazzStations(jazz)
        setHipHopStations(hipHop)
        setRnbStations(rnb)
        setIndieStations(indie)
        setKpopStations(kpop)
        setChillStations(chill)
        setWorkoutStations(workout)
        // setMadeForYouStations([popStations[0], kpopStations[0], jazzStations[0], rnbStations[0], chilStations[0], indieStations[0]])
      } catch (error) {
        console.error('Error fetching genre-based playlists:', error)
      } finally {
        dispatch({ type: LOADING_DONE })
      }
    }
    fetchGenreStations()
  }, [])
  useEffect(() => {
    if (
      popStations.length > 0 &&
      kpopStations.length > 0 &&
      jazzStations.length > 0 &&
      rnbStations.length > 0 &&
      chillStations.length > 0 &&
      indieStations.length > 0
    ) {
      setMadeForYouStations([
        popStations[4],
        kpopStations[1],
        jazzStations[2],
        rnbStations[3],
        chillStations[4],
        indieStations[5],
      ])
    }
  }, [popStations, kpopStations, jazzStations, rnbStations, chillStations, indieStations])

  const handleStationClick = stationId => {
    if (stationId) {
      navigate(`/station/${stationId}`)
    } else {
      console.error('Station ID is undefined')
    }
  }

  return (
    <div className="homepage-container flex flex-column" >
      <div className="gradient" style={gradient}></div>
      <section className="top-section">
        <div className="filter-buttons">
          {categories.map((cat, idx) => (<button key={idx} onClick={() => setCategory(cat)} className={`filter-btn ${category === cat ? 'active' : ''}`}>{cat}</button>))}
        </div>
      </section>

      <section className="stations-grid-section">
        <StationList stations={gridStations} type="home-station" 
        setImgHover={setImgHover}
        />
      </section>

      <section className="stations-section">
        <h2>Made For {user ? user?.fullname : 'You'}</h2>
        <StationList
          stations={madeForYouStations.map(station => ({
            id: station.spotifyUrl,
            name: station.name,
            artist: station.artist,
            imgUrl: station.imgUrl,
          }))}
          type="search-results"
          
        />
      </section>
      <section className="stations-section">
        <h2>Featured Stations</h2>
        <StationList
          stations={featuredStations}
          type="search-results"
        />
      </section>

      <section className="stations-section">
        <h2>Pop Playlists</h2>
        <StationList
          stations={popStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* Rock genre section */}
      <section className="stations-section">
        <h2>Rock Playlists</h2>
        <StationList
          stations={rockStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* Latin genre section */}
      <section className="stations-section">
        <h2>Latin Playlists</h2>
        <StationList
          stations={latinStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* Jazz genre section */}
      <section className="stations-section">
        <h2>Jazz Playlists</h2>
        <StationList
          stations={jazzStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* Hip-Hop genre section */}
      <section className="stations-section">
        <h2>Hip-Hop Playlists</h2>
        <StationList
          stations={hipHopStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>
      <section className="stations-section">
        <h2>R&B Playlists</h2>
        <StationList
          stations={rnbStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* Indie genre section */}
      <section className="stations-section">
        <h2>Indie Playlists</h2>
        <StationList
          stations={indieStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* K-Pop genre section */}
      <section className="stations-section">
        <h2>K-Pop Playlists</h2>
        <StationList
          stations={kpopStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* Chill genre section */}
      <section className="stations-section">
        <h2>Chill Playlists</h2>
        <StationList
          stations={chillStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* Workout genre section */}
      <section className="stations-section">
        <h2>Workout Playlists</h2>
        <StationList
          stations={workoutStations.slice(0, 6).map(playlist => ({
            id: playlist.spotifyUrl,
            title: playlist.title,
            artist: playlist.artist,
            imgUrl: playlist.imgUrl,
          }))}
          type="search-results"
        />
      </section>

      {/* <div className="history-section">
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
      </div> */}
    </div>
  )
}
