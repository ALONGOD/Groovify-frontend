import { useDispatch, useSelector } from 'react-redux'
import { setSongsInQueue, toggleModal } from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import { SearchBar } from './SearchBar'
import { SET_SONGS } from '../store/reducers/station.reducer'
import { useEffect } from 'react'

export function SongList({ songs, type, station }) {
  const dispatch = useDispatch()
  const songModal = useSelector(state => state.stationModule.modalSong)
  const stations = useSelector(state => state.stationModule.stations)

  useEffect(() => {
    dispatch({ type: SET_SONGS, songs })
  }, [])


  const likedSongsStation = stations.find(
    station => station._id === 'liked-songs'
  )
  const likedSongs = likedSongsStation ? likedSongsStation.songs : []


  async function onSetSongsInQueue() {
    // if ()
    await setSongsInQueue(songs)
  }

  console.log(songs)

  return (
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
            songModal={songModal}
            likedSongs={likedSongs}
            onSetSongsInQueue={onSetSongsInQueue}
          />
        );
      })}
    </ul>
  );
}
