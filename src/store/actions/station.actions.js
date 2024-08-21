import { stationService } from '../../services/station/station.service.local.js'
import { store } from '../store'
import {
  ADD_STATION,
  REMOVE_STATION,
  SET_STATIONS,
  UPDATE_STATION,
  ADD_STATION_MSG,
  SET_MODAL,
  ADD_SONG_TO_STATION,
  SET_SEARCH_RESULTS,
} from '../reducers/station.reducer'
import { storageService } from '../../services/async-storage.service.js'

export async function loadStations(filterBy) {
  try {
    const stations = await stationService.query(filterBy)
    store.dispatch(getCmdSetStations(stations))
  } catch (err) {
    console.log('Cannot load stations', err)
    throw err
  }
}

export async function removeSongFromStation(stationId) {
  const songId = store.getState().stationModule.modalSong?.id
  const updatedStation = await storageService.removeSongFromStation(songId, stationId)
  store.dispatch({ type: UPDATE_STATION, updatedStation})
}

export async function addToStation(song, stationId) {
  const updatedStation = await storageService.addSongToStation(song, stationId)
  store.dispatch({ type: UPDATE_STATION, updatedStation})
}

export function toggleModal(song) {
  console.log(song);
  
  const prevSongId = store.getState().stationModule.modalSong
  const newState = song?.id === prevSongId?.id ? '' : song
  console.log('newState:', newState)

  store.dispatch({ type: SET_MODAL, song: newState })
}

export async function removeStation(stationId) {
  try {
    await stationService.remove(stationId)
    store.dispatch(getCmdRemoveStation(stationId))
  } catch (err) {
    console.log('Cannot remove station', err)
    throw err
  }
}

export function setSearchResults(results) {
    store.dispatch({
        type: SET_SEARCH_RESULTS,
        results
    });
}

export async function addStation(station) {
  try {
    const savedStation = await stationService.save(station)
    store.dispatch(getCmdAddStation(savedStation))
    return savedStation
  } catch (err) {
    console.log('Cannot add station', err)
    throw err
  }
}

export async function updateStation(station) {
  try {
    const savedStation = await stationService.save(station)
    store.dispatch(getCmdUpdateStation(savedStation))
    return savedStation
  } catch (err) {
    console.log('Cannot save station', err)
    throw err
  }
}

export async function addStationMsg(stationId, txt) {
  try {
    const msg = await stationService.addStationMsg(stationId, txt)
    store.dispatch(getCmdAddStationMsg(msg))
    return msg
  } catch (err) {
    console.log('Cannot add station msg', err)
    throw err
  }
}

function getCmdSetStations(stations) {
  return {
    type: SET_STATIONS,
    stations,
  }
}

function getCmdRemoveStation(stationId) {
  return {
    type: REMOVE_STATION,
    stationId,
  }
}
function getCmdAddStation(station) {
  return {
    type: ADD_STATION,
    station,
  }
}
function getCmdUpdateStation(station) {
  return {
    type: UPDATE_STATION,
    station,
  }
}
function getCmdAddStationMsg(msg) {
  return {
    type: ADD_STATION_MSG,
    msg,
  }
}

// unitTestActions()
async function unitTestActions() {
  await loadStations()
  await addStation(stationService.getEmptyStation())
  await updateStation({
    _id: 'm1oC7',
    title: 'Station-Good',
  })
  await removeStation('m1oC7')
  // TODO unit test addStationMsg
}
