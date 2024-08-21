import { useSelector } from 'react-redux'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaCaretRight, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
import { GoPlus, GoPlusCircle } from 'react-icons/go'
import { ModalSongOptions } from './ModalSongOptions'
import { AddToStationModal } from './AddToStationModal'

export function Modal({ modalType }) {
  const stations = useSelector(state => state.stationModule.stations)

  return (
    <>
      <div className={`modal ${modalType === 'playlists' ? 'playlist-modal' : ''} absolute`}>
        <div className="modal-content">
          <DynamicModal modalType={modalType} stations={stations} />
        </div>
      </div>
    </>
  )
}

function DynamicModal({ modalType, stations }) {
  switch (modalType) {
    case 'songOptions':
      return <ModalSongOptions />
    case 'playlists':
      return <AddToStationModal stations={stations}/>

  }
  
}
