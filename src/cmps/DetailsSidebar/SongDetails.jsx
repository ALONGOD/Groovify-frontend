import { useEffect, useRef, useState } from 'react'
import { LikeSongBtn } from '../LikeSongBtn'
import { DetailsSidebarClose } from './DetailsSidebarClose'
import { SpotifyAPIService } from '../../services/spotifyAPI/spotifyAPI.service'
import { useSelector } from 'react-redux'
import { SongPreview } from '../SongPreview'

export function SongDetails({ currSong }) {
  const [songDetails, setSongDetails] = useState(null)
  const [artist, setArtist] = useState(null)
  const [nextSong, setNextSong] = useState(null);
  

  const queue = useSelector(state => state.stationModule.queue)
  const isShuffled = queue.isShuffled
  const currQueueSongs = isShuffled ? queue.shuffledQueue : queue.songsQueue
  console.log('nextSong:', nextSong)

  function getNextSong() {
    const currSongIdx = currQueueSongs.findIndex(
      song => song?.id === currSong?.id
    )
    return currQueueSongs[currSongIdx + 1]
  }

  useEffect(() => {
    fetchSongDetails()
    const song = getNextSong()
    setNextSong(song)
  }, [currSong])

  async function fetchSongDetails() {
    const results = await SpotifyAPIService.fetchSongDetails(currSong?.title)
    const songToEdit = results.tracks.items[0]
    fetchArtist(songToEdit.artists[0].id)
    console.log('songToEdit:', songToEdit)
    const songToSave = {
      title: songToEdit.name,
      imgUrl: songToEdit.album.images[0].url,
      artist: songToEdit.artists.map(artist => artist.name),
    }
    setSongDetails(songToSave)
  }

  async function fetchArtist(artistId) {
    try {
      const artist = await SpotifyAPIService.fetchDetailsFromArtist(
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

  return (
    <>
      <header className={`details-header`}>
        <h3>{currSong ? currSong.artist : ''}</h3>
        <div className="header-actions flex flex-row gap-3">
          <button className="more-options">…</button>
          <DetailsSidebarClose />
        </div>
      </header>
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
          <div className="next-in-queue flex flex-column ">
            <div className="flex flex-row align-center justify-between">
              <h3>Next in queue</h3>
              <h4>Open Queue</h4>
            </div>
            {nextSong && <SongPreview song={nextSong} type={'queueDetails'}/>}
          </div>
      </div>
    </>
  )
}
