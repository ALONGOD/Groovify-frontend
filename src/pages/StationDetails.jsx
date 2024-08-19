import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { stationService } from '../services/station/station.service.local'

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
      <ul className="flex flex-column">
        {station.songs &&
          station.songs.map((song, idx) => {
            return (
              <li className="flex flex-row align-center" key={song.id}>
                <h4>{idx + 1}</h4>
                <img src={song.imgUrl} alt="song-img" />
                <div className="song-details flex flex-column">
                  <h4>{song.title}</h4>
                  <h4>{song.album ? song.album : 'Unknown'}</h4>
                </div>
                <h4>{song.addedAt}</h4>
                <h4>{song.duration}</h4>
              </li>
            )
          })}
      </ul>
    </section>
  )
}
