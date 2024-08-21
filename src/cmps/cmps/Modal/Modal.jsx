import { useSelector } from 'react-redux'
import { ModalSongOptions } from './ModalSongOptions'
import { AddToStationModal } from './AddToStationModal'

export function Modal({ modalType, onRemoveSongFromStation }) {
  const stations = useSelector(state => state.stationModule.stations)

  return (
    <>
      <div className={`modal ${modalType === 'playlists' ? 'playlist-modal' : ''} absolute`}>
        <div className="modal-content">
          <DynamicModal modalType={modalType} stations={stations} onRemoveSongFromStation={onRemoveSongFromStation}/>
        </div>
      </div>
    </>
  )
}

function DynamicModal({ modalType, stations, onRemoveSongFromStation }) {
  switch (modalType) {
    case 'songOptions':
      return <ModalSongOptions onRemoveSongFromStation={onRemoveSongFromStation}/>
    case 'playlists':
      return <AddToStationModal stations={stations}/>

  }
  
}
