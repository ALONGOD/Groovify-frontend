import { useEffect } from 'react'
import { StationPreview } from './StationPreview'
import { stationService } from '../services/station/station.service.local'
import { useDispatch, useSelector } from 'react-redux'
import { SET_STATIONS } from '../store/reducers/station.reducer'

export function StationList({isCollapsed}) {
  const dispatch = useDispatch()
  const stations = useSelector(state => state.stationModule.stations)


  useEffect(() => {
    fetchStations()
  }, [])
  
  async function fetchStations() {
    try {
      const stations = await stationService.query()
      const likedSongsStation = await stationService.fetchLikedSongs()
      dispatch({ type: SET_STATIONS, stations: [likedSongsStation, ...stations] })
    } catch (err) {
      console.log('Cannot load stations', err)
      throw err
    }
  }


  if (!stations) return <h1>Loading...</h1>
  return (
    <section className="station-list">
      <ul>
        
        {stations.map(station => (
          <StationPreview station={station} key={station._id} isCollapsed={isCollapsed}/>
        ))}
      </ul>
    </section>
  )
}
