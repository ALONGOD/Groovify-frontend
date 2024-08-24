import { useDispatch, useSelector } from 'react-redux'
import {
  toggleModal,
} from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import { SET_CURRENT_SONG } from '../store/reducers/station.reducer'

export function SongList({ songs, type }) {
  
  const dispatch = useDispatch()
  const songModal = useSelector(state => state.stationModule.modalSong)
  const currSong = useSelector(state => state.stationModule.currSong)

  function onToggleModal(event, song) {
    event.stopPropagation()
    toggleModal(song)
  }

  function playSong(song) {
    console.log(song);
    dispatch({ type: SET_CURRENT_SONG, songToPlay: song })
  }

  return (
    <ul className={`song-list ${type}`}>
      {type === 'list-table' && (
        <>
          <SongListHeader />
          <hr className="custom-divider" />
        </>
      )}
      {songs.map((song, idx) => {
        return (
          <SongPreview
            currSong={currSong}
            playSong={playSong}
            key={`${song.id}-${idx}`}
            song={song}
            type={type}
            idx={idx}
            songModal={songModal}
            onToggleModal={onToggleModal}

          />
        )
      })}
    </ul>
  )
}
