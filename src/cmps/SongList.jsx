import { useDispatch, useSelector } from 'react-redux'
import { setSongsInQueue, toggleModal } from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import { SearchBar } from './SearchBar'
import { SET_SONGS } from '../store/reducers/station.reducer'
import { useEffect } from 'react'

export function SongList({ songs, type, station }) {
  console.log('songs:', songs)
  const dispatch = useDispatch()
  const songModal = useSelector(state => state.stationModule.modalSong)
  const user = useSelector(state => state.userModule.user)
  const likedSongs = user?.likedSongsStation?.songs

  useEffect(() => {
    dispatch({ type: SET_SONGS, songs })
  }, [])

  async function onSetSongsInQueue() {
    await setSongsInQueue(songs)
  }

  // console.log(songs)

  return (
    <ul className={`song-list ${type}`}>
      {type === 'list-table' && (
        <>
          <SongListHeader />
        </>
      )}
      {songs?.map((song, idx) => {
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