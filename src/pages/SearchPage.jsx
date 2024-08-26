import { useSelector } from 'react-redux'
import { SongList } from '../cmps/SongList.jsx'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js'

export function SearchPage() {
  const { searchTerm } = useParams()
  const [searchResults, setSearchResults] = useState([])
  console.log('searchResults:', searchResults)

  useEffect(() => {
    fetchSongsFromYouTube()
  }, [searchTerm])

  async function fetchSongsFromYouTube() {
    try {
      const results = await YouTubeAPIService.searchVideos(searchTerm)
      results.map((song, idx) => {
        song.nextSongId = results[idx + 1]?.id
        song.prevSongId = results[idx - 1]?.id
        return song
      })
      setSearchResults(results)
    } catch (error) {
      console.error('Error fetching YouTube API:', error)
    }
  }

  return (
    <div className="search-page">
      <div className="songs-resutls">
        {searchResults?.length && (
          <>
            <h1>Songs</h1>
            <SongList songs={searchResults} type="search-results" />
          </>
        )}
      </div>
    </div>
  )
}
