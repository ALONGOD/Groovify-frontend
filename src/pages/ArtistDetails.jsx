import { useParams } from 'react-router'
import { SpotifyAPIService } from '../services/spotifyAPI/spotifyAPI.service'
import { useEffect, useState } from 'react'
import { VerifiedBtn } from '../cmps/svgs/VerifiedBtn'
import { PlayPauseBtn } from '../cmps/PlayPauseBtn'
import { SongList } from '../cmps/SongList'
import {
  formatDuration,
  formatNumberWithCommas,
} from '../services/util.service'

export function ArtistDetails() {
  const { artistId } = useParams()
  const [artist, setArtist] = useState({
    details: null,
    albums: null,
    topTracks: null,
    relatedArtists: null,
  })
  const headerBgImg = artist?.details ? artist.details.images[0].url : null
  console.log('artist:', artist.details)

  useEffect(() => {
    fetchDetailsFromArtist()
  }, [artistId])

  async function fetchDetailsFromArtist() {
    const details = await SpotifyAPIService.fetchDetailsFromArtist(artistId, 'artist')
    const albums = await SpotifyAPIService.fetchDetailsFromArtist(artistId, 'albums')
    const relatedArtists = await SpotifyAPIService.fetchDetailsFromArtist(artistId, 'relatedArtists')

    const topTracksBeforeEdit = await SpotifyAPIService.fetchDetailsFromArtist(artistId, 'topTracks')
    const topTracks = topTracksBeforeEdit.tracks.map(song => {
      const { id, name: title, artists, album, duration_ms } = song
      return {
        id,
        title,
        artist: artists.join(', '),
        album: album.name,
        url: '',
        imgUrl: album?.images[2]?.url,
        addedAt: Date.now(),
        duration: formatDuration(duration_ms),
      }
    })
    // console.log('topTracks:', topTracks)

    setArtist({ details, albums, topTracks, relatedArtists })
  }

  return (
    <section className="artist-details">
      <header
        className="flex flex-column"
        style={{ backgroundImage: `url(${headerBgImg})` }}
      >
        <h4>
          <VerifiedBtn /> Verified Artist
        </h4>
        <h1>{artist?.details?.name}</h1>
        <p>
          {formatNumberWithCommas(artist?.details?.followers.total)} followers
        </p>
      </header>
      <main className="flex flex-column">
        <PlayPauseBtn type="top-result" />
        <div className="popular-songs">
          {/* <SongList songs={artist?.topTracks?.items} /> */}
        </div>
      </main>
    </section>
  )
}
