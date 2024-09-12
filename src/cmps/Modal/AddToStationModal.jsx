import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { addSongToStation } from '../../store/actions/backend.station'
import { notifySongAdded } from '../../services/event-bus.service.js'

export function AddToStationModal({ stations }) {
  const songModal = useSelector(state => state.stationModule.modalSong)
  const [newPlaylist, setNewPlaylist] = useState({ name: '' })

  function handleChange({ target }) {
    const { value } = target
    setNewPlaylist({ ...newPlaylist, name: value })
  }

  function onAddSongToStation(stationId) {
    addSongToStation(stationId, songModal)
    notifySongAdded(songModal) // Notify that a song has been added
  }

  return (
    <>
      <div className="searchbar">
        <FaMagnifyingGlass />
        <input
          type="text"
          name="name"
          id=""
          onClick={e => e.stopPropagation()}
          value={newPlaylist.name}
          onChange={handleChange}
        />
      </div>
      <div className="row flex flex-row">
        <AiOutlinePlus />
        <h3>Add new playlist</h3>
      </div>
      {stations.map(station => {
        return (
          <h3 className="row" key={station._id} onClick={() => onAddSongToStation(station.id)}>
            {station.name}
          </h3>
        )
      })}
    </>
  )
}
