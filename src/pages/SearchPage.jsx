import { useSelector } from 'react-redux'
import { SongList } from '../cmps/SongList.jsx'

export function SearchPage() {
  const searchResults = useSelector(state => state.stationModule.searchResults)
  console.log('searchResults:', searchResults)

  return (
    <div className="search-page">
      <div className="songs-resutls">
        {searchResults.length && (
          <>
            <h1>Songs</h1>
            <SongList songs={searchResults} type="search-results" />
          </>
        )}
      </div>
    </div>
  )
}
