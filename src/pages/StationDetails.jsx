import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader'
import { SongList } from '../cmps/SongList'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../cmps/Modal/Modal'
import { SET_EDIT_MODAL } from '../store/reducers/station.reducer'

export function StationDetails() {
  const dispatch = useDispatch()
  const { stationId } = useParams()
  const stations = useSelector(state => state.stationModule.stations)
  const [station, setStation] = useState({})
  const editOpen = useSelector(state => state.stationModule.editStationModal)
  console.log('editOpen:', editOpen)
  
  console.log(station);

  useEffect(() => {
    setStation(stations.find(station => station._id === stationId))
    
  }, [stationId, stations])

  function toggleEditStation() {
    console.log(editOpen);
    
    dispatch({ type: SET_EDIT_MODAL, isOpen: true })
  }

  if (!station) return <h1>Loading...</h1>
  return (
    <section className="station-details flex flex-column">
      <StationDetailsHeader station={station} setStation={setStation} toggleEditStation={toggleEditStation}/>
        {station.songs && <SongList songs={station.songs} type='list-table'/>}
        {editOpen && <Modal modalType='editStation'/>}
    </section>
  )
}
