import { useParams } from "react-router"

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
        <></>
    )
}