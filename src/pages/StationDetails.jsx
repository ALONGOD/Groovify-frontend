import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { stationService } from '../services/station/station.service.local'
import { SongPreview } from '../cmps/StationDetails/SongPreview'
import { SongListHeader } from '../cmps/StationDetails/SongListHeader'

import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader'
import { useSelector } from 'react-redux'
import { toggleModal } from '../store/actions/station.actions'

export function StationDetails() {
  const { stationId } = useParams()
  const [station, setStation] = useState({})
  const modal = useSelector(state => state.stationModule.modal)

  console.log(modal);
  

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  function onToggleModal(event, songId) {
    event.stopPropagation();
    toggleModal(songId)
  }

  async function loadStation(stationId) {
    try {
      const stationToSave = await stationService.getById(stationId)
      setStation(stationToSave)
    } catch (err) {
      console.log('Cannot load station', err)
      throw err
    }
  }

  if (!station) return <h1>Loading...</h1>
  return (
    <section className="station-details flex flex-column">
      <StationDetailsHeader station={station} />
      <ul className="song-list flex flex-column">
        <SongListHeader />
        <hr className="custom-divider" />
        {station.songs &&
          station.songs.map((song, idx) => {
            
            
            return <SongPreview key={song.id} song={song} idx={idx} modalOpen={modal?.songId} onToggleModal={onToggleModal} />
          })}
      </ul>
    </section>
  )
}
