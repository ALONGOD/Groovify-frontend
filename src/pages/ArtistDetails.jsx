import { useParams } from 'react-router'
import { spotifyAPIService } from '../services/spotifyAPI/spotifyAPI.service'
import { useEffect, useState } from 'react'
import { VerifiedBtn } from '../cmps/svgs/VerifiedBtn'
import { PlayPauseBtn } from '../cmps/PlayPauseBtn'
import { SongList } from '../cmps/SongList'
import {
  formatDuration,
  formatNumberWithCommas,
} from '../services/util.service'
import { StationList } from '../cmps/StationList'
import { ArtistList } from '../cmps/ArtistList'
import { useDispatch } from 'react-redux'
import { LOADING_DONE, LOADING_START } from '../store/reducers/system.reducer'

export function ArtistDetails() {
  const dispatch = useDispatch()
  const { artistId } = useParams()
  const [artist, setArtist] = useState({
    details: null,
    albums: null,
    topTracks: null,
    relatedArtists: null,
  })
  const headerBgImg = artist?.details ? artist.details.images[0].url : null
  console.log('artist:', artist.details)
  console.log(artist?.albums);
  

  useEffect(() => {
    fetchDetailsFromArtist()
  }, [artistId])

  async function fetchDetailsFromArtist() {
    dispatch({ type: LOADING_START})
    const details = await spotifyAPIService.fetchDetailsFromArtist(artistId, 'artist')
    const albumsBeforeEdit = await spotifyAPIService.fetchDetailsFromArtist(artistId, 'albums')
    const albums = albumsBeforeEdit.items.map(album => {
      const { id, name, artists, images } = album
      console.log('album:', album)
      return {
        id,
        name,
        creator: {
          name: artists.map(artist => artist.name).join(', '),
          id: artists[0].id,
        },
        length: album.total_tracks,
        imgUrl: images[0].url,
      }
    })
    const relatedArtists = await spotifyAPIService.fetchDetailsFromArtist(artistId, 'relatedArtists')
    
    const topTracksBeforeEdit = await spotifyAPIService.fetchDetailsFromArtist(artistId, 'topTracks')
    const topTracks = topTracksBeforeEdit.tracks.map(song => {
      console.log('song:', song)
      const { id, name: title, artists, album, duration_ms } = song
      return {
        id,
        title,
        artist: artists.map(artist => artist.name).join(', '),
        album: album.name,
        url: '',
        imgUrl: album?.images[2]?.url,
        addedAt: Date.now(),
        duration: formatDuration(duration_ms),
      }
    })
    // console.log('topTracks:', topTracks)
    
    setArtist({ details, albums, topTracks, relatedArtists })
    dispatch({ type: LOADING_DONE})
  }

  console.log('artist?.topTracks?.items:', artist?.topTracks)
  return (
    <section className="artist-details" >
      <header
        className="flex flex-column"
        style={{ backgroundImage: `url(${headerBgImg})` }}
      >
        <div className='verified flex align-center'>
          <VerifiedBtn />
           <h4>Verified Artist</h4>
        </div>
        <h1>{artist?.details?.name}</h1>
        <p>
          {formatNumberWithCommas(artist?.details?.followers.total)} followers
        </p>
      </header>
      <main className="flex flex-column">
        <div className="popular-songs">
          <h2>Popular</h2>
          <SongList songs={artist?.topTracks?.slice(0, 5)} type='artist-page'/>
        </div>
        <div className="discography">
          <h2>Discography</h2>
          <div className="albums">
            <StationList stations={artist?.albums?.slice(0, 8)} type='artistDetails'/>
          </div>
        </div>
        <div className="related-artists">
          <h2>Fans also like</h2>
          <ArtistList artists={artist?.relatedArtists?.artists?.slice(0, 8)} />
        </div>
      </main>
    </section>
  )
}
