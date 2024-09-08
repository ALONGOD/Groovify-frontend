import { stationService } from '../../services/station/station.service.remote'
import { userService } from '../../services/user/user.service.remote'
import {
  EDIT_STATION_DISPLAY,
} from '../reducers/station.reducer'
import {
  ADD_STATION_TO_LIKED,
  REMOVE_STATION_FROM_LIKED,
  UPDATE_LIKED_STATION,
} from '../reducers/user.reducer'
import { store } from '../store'
import {
  removeStationFromLiked,
  saveStationToLiked,
  updateStation,
} from './backend.user'

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

  const { _id: id, name, creator, imgUrl } = savedStation

  return savedStation
}

export async function addNewStation() {
  try {
    const newStation = getEmptyStation()
    const stationSaved = await stationService.save(newStation)
    console.log('stationSaved:', stationSaved)
    const { _id, name, createdBy, imgUrl } = stationSaved
    await saveStationToLiked({ _id, name, createdBy, imgUrl })
    return stationSaved
  } catch (err) {
    console.log('Cannot add station', err)
    throw err
  }
}

export async function removeStation(stationId) {
  try {
    await stationService.remove(stationId)
    removeStationFromLiked(stationId)
  } catch (err) {
    console.log('Cannot remove station', err)
    throw err
  }
}

export async function onUpdateStation(station) {
  try {
    const { _id: id, name, createdBy, imgUrl } = station
    await updateStation(station)
    await stationService.save(station)
  } catch (err) {
    console.log('Cannot update station', err)
    throw err
  }
}

export async function addSongToStation(stationId, song) {
  console.log('stationId:', stationId)
  try {
    const stationDisplay = store.getState().stationModule.stationDisplay
    const station = await stationService.getById(stationId)
    station.songs.push(song)
    const updatedStation = await stationService.save(station)
    if (station._id === stationDisplay._id) {
      store.dispatch({ type: EDIT_STATION_DISPLAY, station: updatedStation })
    }
  } catch (err) {
    console.log('Cannot add song to station', err)
    throw err
  }
}

export async function removeSongFromStation(stationId) {
  try {
    const songId = store.getState().stationModule.modalSong?.id
    const station = await getStationById(stationId)
    const songIdx = station.songs.findIndex(song => song.id === songId)
    if (songIdx < 0) throw 'Song not found in station'
    station.songs.splice(songIdx, 1)
    await saveStation(station)
    store.dispatch({ type: UPDATE_STATION, updatedStation: station })
    return station
  } catch (err) {
    console.error('Cannot remove song from station', err)
    throw err
  }
}

export async function setLoggedInUser() {}

function getEmptyStation() {
  const user = store.getState().userModule.user
  return {
    name: 'New playlist',
    description: '',
    imgUrl: 'https://via.placeholder.com/150',
    tags: [],
    createdBy: {
      id: user?._id,
      username: user?.username,
      imgUrl: user?.imgUrl,
    },
    likedByUsers: [],
    songs: [],
  }
}
