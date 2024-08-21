import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { stationService } from '../services/station/station.service.local'
import { SongListHeader } from '../cmps/StationDetails/SongListHeader'
import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader'
import { SongList } from '../cmps/SongList'
import { useDispatch, useSelector } from 'react-redux'
import { SET_STATION_DETAILS } from '../store/reducers/station.reducer'

export function StationDetails() {
  const dispatch = useDispatch()
  const { stationId } = useParams()
  const station = useSelector(state => state.stationModule.stationDetails)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  async function loadStation(stationId) {
    try {
      const stationToSave = await stationService.getById(stationId)
      dispatch({ type: SET_STATION_DETAILS, station: stationToSave })
    } catch (err) {
      console.log('Cannot load station', err)
      throw err
    }
  }

  function handleSearch({ target }) {
    setSearchQuery(target.value)
  }

  if (!station) return <h1>Loading...</h1>
  return (
    <section className="station-details flex flex-column">
      <StationDetailsHeader station={station} searchQuery={searchQuery} handleSearch={handleSearch}/>


      <ul className="song-list flex flex-column">
        <SongListHeader />
        <hr className="custom-divider" />
        {station.songs && <SongList songs={station.songs} />}
      </ul>
    </section>
  )
}
