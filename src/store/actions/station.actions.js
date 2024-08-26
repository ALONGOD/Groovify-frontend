import { stationService } from '../../services/station/station.service.local.js'
import { store } from '../store'
import {
  ADD_STATION,
  REMOVE_STATION,
  SET_STATIONS,
  UPDATE_STATION,
  ADD_STATION_MSG,
  SET_MODAL,
  SET_SEARCH_TERM,
  SET_SORT_BY,
  SET_QUEUE_SONGS,
} from '../reducers/station.reducer'
import { storageService } from '../../services/async-storage.service.js'
import { SET_USER } from '../reducers/user.reducer.js'

export function setSongsInQueue(songs) {
  const queueMode = store.getState().stationModule.queue.mode
  const songsToAdd = songs

  if (queueMode === 'sync') {
    store.dispatch({ type: SET_QUEUE_SONGS, songs: songsToAdd })
  } else if (queueMode === 'shuffle') {
    const shuffledQueue = shuffleQueue(songsToAdd)
    store.dispatch({ type: SET_QUEUE_SONGS, songs: shuffledQueue })
  }
}

function shuffleQueue(queue) {
  const shuffledQueue = [...queue]; // Create a copy of the queue to avoid mutating the original
  for (let i = shuffledQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Get random index
    [shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]]; // Swap elements
  }
  return shuffledQueue;
}

export async function addToLikedSongs(songToAdd) {
  const user = await storageService.query('loggedinUser')
  const { likedSongsStation } = user

  const hasId = isSongInStation(likedSongsStation, songToAdd)
  if (hasId) throw 'Song already exists in station'
  likedSongsStation.songs.unshift(songToAdd)
  storageService.save('loggedinUser', user)

  store.dispatch({ type: SET_USER, user })
  store.dispatch({ type: UPDATE_STATION, updatedStation: likedSongsStation })
}

export async function removeFromLikedSongs(songId) {
  const user = await storageService.query('loggedinUser')
  const { likedSongsStation } = user

  const songIdx = likedSongsStation.songs.findIndex(song => song.id === songId)
  if (songIdx < 0) throw 'Song not found in station'
  likedSongsStation.songs.splice(songIdx, 1)
  await storageService.save('loggedinUser', user)

  store.dispatch({ type: SET_USER, user })
  console.log('likedSongsStation:', likedSongsStation)
  store.dispatch({ type: UPDATE_STATION, updatedStation: likedSongsStation })
}

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
  const stations = await storageService.query('stationDB')
  const idx = stations.findIndex(station => station._id === stationId)
  const songIdx = stations[idx].songs.findIndex(song => song.id === songId)
  if (songIdx < 0) throw 'Song not found in station'
  stations[idx].songs.splice(songIdx, 1)
  await storageService.save('stationDB', stations)
  console.log(stations[idx])

  store.dispatch({ type: UPDATE_STATION, updatedStation: stations[idx] })
  return stations[idx]
}

// export async function removeSongFromStation(stationId) {
//   const songId = store.getState().stationModule.modalSong?.id
//   const updatedStation = await storageService.removeSongFromStation(
//     songId,
//     stationId
//   )
//   store.dispatch({ type: UPDATE_STATION, updatedStation })
//   return updatedStation
// }

export async function addToStation(stationId, songToAdd) {
  const stations = await storageService.query('stationDB')
  const idx = stations.findIndex(station => station._id === stationId)
  const hasId = isSongInStation(stations[idx], songToAdd)
  if (hasId) throw 'Song already exists in station'
  stations[idx].songs.push(songToAdd)
  await storageService.save('stationDB', stations)
  store.dispatch({ type: UPDATE_STATION, updatedStation: stations[idx] })
}
// export async function addToStation(stationId, song) {
//   const updatedStation = await storageService.addSongToStation(song, stationId)
//   store.dispatch({ type: UPDATE_STATION, updatedStation})
// }

function isSongInStation(station, song) {
  return station.songs.some(stationSong => stationSong.id === song.id)
}

export function toggleModal(song) {
  const prevSongId = store.getState().stationModule.modalSong
  const newState = song?.id === prevSongId?.id ? '' : song

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

export function setSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    searchTerm,
  }
}

export async function setSortBy(sortBy) {
  try {
    // First, dispatch the sort by action
    const sortByAction = {
      type: SET_SORT_BY,
      sortBy,
    }

    // Then fetch the stations with the new sorting criteria
    const stations = await stationService.query({ sortBy })
    const stationsAction = {
      type: SET_STATIONS,
      stations,
    }

    // Return the actions in the correct order
    return [sortByAction, stationsAction]
  } catch (err) {
    console.log('Cannot load stations', err)
    throw err
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
