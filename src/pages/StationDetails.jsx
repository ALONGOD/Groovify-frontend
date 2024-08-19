import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { stationService } from '../services/station/station.service.local'
import { SongPreview } from '../cmps/SongPreview'
import { SongListHeader } from '../cmps/SongListHeader'
import { FaCircle } from 'react-icons/fa'

export function StationDetails() {
  const { stationId } = useParams()
  const [station, setStation] = useState({})

  console.log('station:', station)

  const { name, createdBy, songs, imgUrl } = station

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
      <div className="station-details-header flex flex-row">
        <img src={imgUrl} alt="station-name" className='station-img' />
        <div className="flex flex-column">
          <h4>Playlist</h4>
          <h1>{name}</h1>
          <div className="created-by flex flex-row align-center">
            <img
              src={createdBy && createdBy.imgUrl}
            />
            <h4 className='fullname'>{createdBy && createdBy.fullname}</h4>
            <div className='circle-divider'><FaCircle/></div>
            {station.songs && <h4 className='station-length'> {station.songs.length} songs</h4>}
          </div>
        </div>
      </div>
      <ul className="song-list flex flex-column">
        <SongListHeader />
        <hr className="custom-divider" />
        {station.songs &&
          station.songs.map((song, idx) => {
            return <SongPreview song={song} idx={idx} key={song.id} />
          })}
      </ul>
    </section>
  )
}
