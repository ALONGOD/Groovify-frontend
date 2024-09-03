import { useDispatch, useSelector } from 'react-redux'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import { SearchBar } from './SearchBar'
import { SET_SONGS } from '../store/reducers/station.reducer'
import { useEffect, useState } from 'react'

export function SongList({ songs, type, station }) {
  const dispatch = useDispatch()
  const stations = useSelector(state => state.stationModule.stations)

  const [modalSong, setModalSong] = useState(null)

  useEffect(() => {
    dispatch({ type: SET_SONGS, songs })
  }, [])

  const likedSongsStation = stations.find(
    station => station._id === 'liked-songs'
  )
  const likedSongs = likedSongsStation ? likedSongsStation.songs : []

  function onToggleModal(event, song) {
    event.stopPropagation()
    setModalSong(prevModalSong => (prevModalSong === song ? null : song))
  }

  return (
    <>
      {songs.length === 0 && type === 'list-table' ? (
        <div className="no-songs">
          <h2>Let's find something for your playlist</h2>
          <SearchBar
            searchType={'youtube'}
            placeholder={'Search for songs or episodes'}
          />
        </div>
      ) : (
        <ul className={`song-list ${type}`}>
          {type === 'list-table' && (
            <>
              <SongListHeader />
            </>
          )}
          {songs.map((song, idx) => {
            return (
              <SongPreview
                station={station}
                key={`${song.id}-${idx}`}
                song={song}
                type={type}
                idx={idx}
                songModal={modalSong}
                onToggleModal={onToggleModal}
                likedSongs={likedSongs}
              />
            )
          })}
        </ul>
      )}
    </>
  )
}
