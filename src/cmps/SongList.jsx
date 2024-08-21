import { useSelector } from 'react-redux'
import {
  removeSongFromStation,
  toggleModal,
} from '../store/actions/station.actions'
import { SongPreview } from './StationDetails/SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'

export function SongList({ songs, type }) {
  const songModal = useSelector(state => state.stationModule.modalSong)

  function onToggleModal(event, song) {
    event.stopPropagation()
    toggleModal(song)
  }

  return (
    <ul className="song-list flex flex-column">
      {type === 'list-table' && (
        <>
          <SongListHeader />
          <hr className="custom-divider" />
        </>
      )}
      {songs.map((song, idx) => {
        return (
          <SongPreview
            key={song.id}
            song={song}
            idx={idx}
            songModal={songModal}
            onToggleModal={onToggleModal}
          />
        )
      })}
    </ul>
  )
}
