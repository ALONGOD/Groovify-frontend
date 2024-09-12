import { useDispatch, useSelector } from 'react-redux'
import { setSongsInQueue, toggleModal } from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import { SearchBar } from './SearchBar'
import { SET_SONGS, SET_STATION_DISPLAY } from '../store/reducers/station.reducer'
import { useEffect, useState } from 'react'
import { onUpdateStation } from '../store/actions/backend.station'


export function SongList({ songs, type, station }) {
  const dispatch = useDispatch()
  const songModal = useSelector(state => state.stationModule.modalSong)
  const user = useSelector(state => state.userModule.user)
  const likedSongs = user?.likedSongsStation?.songs
  const [draggedIdx, setDraggedIdx] = useState(null);

  useEffect(() => {
    // setSongsToShow(songs)
  }, [songs])
  
  



  function moveSong(fromIndex, toIndex) {
    const updatedSongs = [...songs]
    const [movedSong] = updatedSongs.splice(fromIndex, 1)
    updatedSongs.splice(toIndex, 0, movedSong)
    dispatch({ type: SET_STATION_DISPLAY, station: { ...station, songs: updatedSongs } })
    onUpdateStation({ ...station, songs: updatedSongs })
  }

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
      {songs?.map((song, index) => {
        return (
          <SongPreview
          
            station={station}
            key={`${song.id}-${index}`}
            song={song}
            type={type}
            idx={index}
            songModal={songModal}
            likedSongs={likedSongs}
            onSetSongsInQueue={onSetSongsInQueue}
            moveSong={moveSong}
            draggedIdx={draggedIdx}
            setDraggedIdx={setDraggedIdx}
          />
        );
      })}
    </ul>
  );
}