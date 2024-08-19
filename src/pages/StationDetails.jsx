import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { stationService } from '../services/station/station.service.local'
import { SongPreview } from '../cmps/SongPreview'
import { SongListHeader } from '../cmps/SongListHeader'

export function StationDetails() {
  const { stationId } = useParams()
  const [station, setStation] = useState({})

  console.log('station:', station.songs)

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

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
    <section className="station-details">
      <ul className="song-list flex flex-column">
        <SongListHeader />
        <hr class="custom-divider" />
        {station.songs &&
          station.songs.map((song, idx) => {
            return (
              
                <SongPreview song={song} idx={idx} key={song.id}/>
              
            )
          })}
      </ul>
    </section>
  )
}
