import { useSelector } from 'react-redux'
import { SongList } from '../cmps/SongList.jsx'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js'

export function SearchPage() {
  const { searchTerm } = useParams()
  const [searchResults, setSearchResults] = useState([])
  console.log('searchResults:', searchResults)

  const topResult = searchResults[0]

  useEffect(() => {
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
        <div className="top-result flex flex-column">
            <h2>Top Result</h2>
          <div className="card flex flex-column">

            <img src={topResult?.imgUrl} alt="top-result" />
            <h3>{topResult?.title}</h3>
            <p>{topResult?.artist}</p>
          </div>
        </div>
        <div className="songs-resutls">
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
