import { useSelector } from 'react-redux'
import { ModalSongOptions } from './ModalSongOptions'
import { AddToStationModal } from './AddToStationModal'
import { AddStationModal } from './AddStationModal'
import { SortByModal } from './SortByModal'
import { EditStationModal } from './EditStationModal'

export function Modal({ modalType }) {
  const stations = useSelector(state => state.stationModule.stations)

  return (
    <>
    {modalType === 'editStation' && <div className="modal-backdrop"></div>}
      <div className={`modal ${modalType} absolute`}>
        <div className="modal-content">
          <DynamicModal modalType={modalType} stations={stations}/>
        </div>
      </div>
    </>
  )
}

function DynamicModal({ modalType, stations, toggleEditStation}) {
  switch (modalType) {
    case 'songOptions':
      return <ModalSongOptions />
    case 'playlists':
      return <AddToStationModal stations={stations} />
    case 'library':
      return <AddStationModal />
    case 'sortBy':
      return <SortByModal />
      case 'editStation':
      return <EditStationModal />
  }
}
