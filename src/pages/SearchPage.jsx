import { useSelector } from 'react-redux'
import { SongList } from '../cmps/SongList.jsx'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js'
import { TopResult } from '../cmps/SearchPage/TopResult.jsx'

export function SearchPage() {
  const { searchTerm } = useParams()
  const [searchResults, setSearchResults] = useState([])
  console.log('searchResults:', searchResults)

  useEffect(() => {
    if (!searchTerm) return
    fetchSongsFromYouTube()
  }, [searchTerm])

  async function fetchSongsFromYouTube() {
    try {
      const results = await YouTubeAPIService.searchVideos(searchTerm)
      setSearchResults(results)
    } catch (error) {
      console.error('Error fetching YouTube API:', error)
    }
  }

  return (
    <div className="search-page">
      <div className="main-details">
        {searchResults.length !== 0 && (
          <TopResult topResult={searchResults[0]} />
        )}
        <div className="songs-results">
          {searchResults?.length && (
            <>
              <h2>Songs</h2>
              <SongList songs={searchResults} type="search-results" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
