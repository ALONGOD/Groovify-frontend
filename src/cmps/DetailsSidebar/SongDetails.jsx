import { useEffect, useRef, useState } from 'react'
import { LikeSongBtn } from '../LikeSongBtn'
import { DetailsSidebarClose } from './DetailsSidebarClose'
import { spotifyAPIService } from '../../services/spotifyAPI/spotifyAPI.service'
import { useDispatch, useSelector } from 'react-redux'
import { SongPreview } from '../SongPreview'
import { SET_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer'
import Skeleton from 'react-loading-skeleton'
import ContentLoader, { Instagram } from 'react-content-loader'

export function SongDetails({ currSong, setIsLoading, isLoading }) {
  const dispatch = useDispatch()
  const [songDetails, setSongDetails] = useState(null)
  const [artist, setArtist] = useState(null)
  const [nextSong, setNextSong] = useState(null)

  const queue = useSelector((state) => state.stationModule.queue)
  const isShuffled = queue.isShuffled
  const currQueueSongs = isShuffled ? queue.shuffledQueue : queue.songsQueue
  console.log('nextSong:', nextSong)

  function getNextSong() {
    const currSongIdx = currQueueSongs.findIndex(
      (song) => song?.id === currSong?.id
    )
    return currQueueSongs[currSongIdx + 1]
  }

  useEffect(() => {
    fetchDetails()
    const song = getNextSong()
    setNextSong(song)
  }, [currSong])

  async function fetchDetails() {
    setIsLoading(true)
    const results = await spotifyAPIService.searchDetails(currSong?.title, 'track')
    const songToEdit = results.tracks.items[0]
    console.log('songToEdit:', songToEdit)
    const songToSave = {
      title: songToEdit.name,
      imgUrl: songToEdit.album.images[0].url,
      artist: songToEdit.artists.map((artist) => artist.name),
    }
    setSongDetails(songToSave)
    await fetchArtist(songToEdit.artists[0].id)
    setIsLoading(false)
  }

  async function fetchArtist(artistId) {
    try {
      const artist = await spotifyAPIService.fetchDetailsFromArtist(
        artistId,
        'artist'
      )
      console.log('artist:', artist)
      const artistToSave = {
        name: artist.name,
        imgUrl: artist.images[0].url,
        followers: artist.followers.total,
        genres: artist.genres,
        popularity: artist.followers.total.toLocaleString(),
      }
      setArtist(artistToSave)
    } catch (error) {
      console.error('Error fetching artist details from Spotify:', error)
      return []
    }
  }

  function onOpenQueue() {
    dispatch({ type: SET_DETAILS_SIDEBAR, state: 'queueDetails' })
  }

  return (
    <>
      <header className={`details-header`}>
        <h3>{currSong ? currSong.artist : ''}</h3>
        <div className="header-actions flex flex-row gap-3">
          <button className="more-options">…</button>
          <DetailsSidebarClose />
        </div>
      </header>
      {isLoading ? (
        <div className="loader-container">
          <ContentLoader
            speed={1}
            width="100%"
            height="100%"
            viewBox="0 0 400 800"
            backgroundColor="#a9a9a9"
            foregroundColor="#c0c0c0"
          >
            <rect x="5%" y="5%" rx="10" ry="10" width="90%" height="40%" />
            <rect x="5%" y="49%" rx="10" ry="10" width="30%" height="2.5%" />
            <rect x="5%" y="53%" rx="10" ry="10" width="50%" height="2.5%" />

            <rect x="5%" y="58%" rx="10" ry="10" width="90%" height="40%" />
          </ContentLoader>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="details-image">
              <img src={songDetails?.imgUrl} alt="Song Image" />
            </div>
            <div className="details-song-info">
              <div className="song-and-band">
                <h2>{currSong?.title}</h2>
                <h4>{currSong?.artist}</h4>
              </div>
              <LikeSongBtn song={currSong} />
            </div>
            <div className="artist-details relative">
              <div className="relative">
                <h3>About the artist</h3>
                <img src={artist?.imgUrl} alt="artist image" />
              </div>
              <div className="details">
                <h3>{artist?.name}</h3>
                <p>{artist?.popularity} Followers</p>
              </div>
            </div>
            {nextSong && (
              <div className="next-in-queue flex flex-column ">
                <div className="flex flex-row align-center justify-between">
                  <h3>Next in queue</h3>
                  <h4 onClick={onOpenQueue}>Open Queue</h4>
                </div>
                <SongPreview song={nextSong} type={'queueDetails'} />
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
