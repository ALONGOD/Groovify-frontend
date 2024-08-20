import { useEffect } from 'react'
import { StationPreview } from './StationPreview'
import { stationService } from '../services/station/station.service.local'
import { useDispatch, useSelector } from 'react-redux'
import { SET_STATIONS } from '../store/reducers/station.reducer'

export function StationList() {
  const dispatch = useDispatch()
  const stations = useSelector(state => state.stationModule.stations)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const stations = await stationService.query()
      dispatch({type: SET_STATIONS, stations})
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
