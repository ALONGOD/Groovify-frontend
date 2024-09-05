import { stationService } from "../../services/station/station.service.remote"
import { ADD_STATION } from "../reducers/station.reducer"
import { store } from "../store"

export async function query(search) {
 try {
    const stations = await stationService.query(search)
    return stations
 } catch (err) {
  console.log('Cannot fetch stations', err)
  throw err
 } 
}

export async function getStationById(stationId) {
    const station = await stationService.getById(stationId)
    return station
}

export async function saveStation(station) {
    const savedStation = await stationService.save(station)
    return savedStation
}

export async function addNewStation() {
    try {
      const newStation = stationService.getEmptyStation()
      const savedStation = await stationService.save(newStation)
      console.log('savedStation:', savedStation)
      store.dispatch({ type: ADD_STATION, station: savedStation })
      return savedStation
    } catch (err) {
      console.log('Cannot add station', err)
      throw err
    }
  }