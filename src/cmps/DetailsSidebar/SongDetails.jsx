import { useEffect, useState } from 'react'
import { LikeSongBtn } from '../LikeSongBtn'
import { DetailsSidebarClose } from './DetailsSidebarClose'
import { SpotifyAPIService } from '../../services/spotifyAPI/spotifyAPI.service'

export function SongDetails({ currSong }) {
  const [songDetails, setSongDetails] = useState(null)
  const [artist, setArtist] = useState(null)

  console.log('songDetails:', songDetails)
  console.log('artist:', artist)

  useEffect(() => {
    fetchSongDetails()
  }, [])

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
        popularity: artist.popularity,
      }
      setArtist(artistToSave)
    } catch (error) {
      console.error('Error fetching artist details from Spotify:', error)
      return []
    }
  }

  return (
    <>
      <header className="details-header">
        <h3>{currSong ? currSong.artist : ''}</h3>
        <div className="header-actions flex flex-row gap-3">
          <button className="more-options">…</button>
          <DetailsSidebarClose />
        </div>
      </header>
      <div className="details-image">
        <img src={songDetails?.imgUrl} alt="Album Art" />
      </div>
      <div className="details-song-info">
        <div className="song-and-band">
          <h2>{currSong.title}</h2>
          <h4>
            {currSong ? currSong.artist : 'Metro Boomin, A$AP Rocky, Takeoff'}
          </h4>
        </div>
        <LikeSongBtn song={currSong} />
      </div>
    </>
  )
}
