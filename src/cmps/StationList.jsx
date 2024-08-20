import { useEffect, useState } from 'react'
import { userService } from '../services/user'
import { StationPreview } from './StationPreview'
import { stationService } from '../services/station/station.service.local'

export function StationList() {
  const [stations, setStations] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const stations = await stationService.query()
      setStations(stations)
    } catch (err) {
      console.log('Cannot load stations', err)
      throw err
    }
  }

  console.log(stations)

  if (!stations) return <h1>Loading...</h1>
  return (
    <section className="station-list">
      <ul>
        {stations.map(station => (
          <StationPreview station={station} key={station._id} />
        ))}
      </ul>
    </section>
  )
}
