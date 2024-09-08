import { useSelector } from 'react-redux'
import { ModalSongOptions } from './ModalSongOptions'
import { AddToStationModal } from './AddToStationModal'
import { AddStationModal } from './AddStationModal'
import { SortByModal } from './SortByModal'
import { EditStationModal } from './EditStationModal'
import { ThreeDotsModal } from './ThreeDotsModal.jsx'
import { query } from '../../store/actions/backend.station.js'
import { useEffect, useState } from 'react'

export function Modal({ modalType }) {
  const likedStations = useSelector((state) => state.userModule.user)?.likedStations
  
  return (
    <>
      {modalType === 'editStation' && <div className="modal-backdrop"></div>}
      <div className={`modal ${modalType} absolute`}>
        <div className="modal-content">
          <DynamicModal modalType={modalType} stations={likedStations} />
        </div>
      </div>
    </>
  )
}

function DynamicModal({ modalType, stations, toggleEditStation }) {
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
    case 'threeDots':
      return <ThreeDotsModal />
  }
}
