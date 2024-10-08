import { stationService } from '../../services/station/station.service.remote'
import { userService } from '../../services/user/user.service.remote'
import {
  EDIT_STATION_DISPLAY,
} from '../reducers/station.reducer'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
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
  // store.dispatch({ type: LOADING_START})
  const station = await stationService.getById(stationId)
  // store.dispatch({ type: LOADING_DONE})
  return station
}

export async function saveStation(station) {
  console.log('station:', station)
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
    console.log('station:', station)
    const stationToSave = await stationService.save(station)
    await updateStation(stationToSave)

    return stationToSave
  } catch (err) {
    console.log('Cannot update station', err)
    throw err
  }
}

export async function addSongToStation(stationId, song) {
  try {
    const stationDisplay = store.getState().stationModule.stationDisplay
    const station = await stationService.getById(stationId)

    song.addedAt = Date.now()
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
    const stationDisplay = store.getState().stationModule.stationDisplay

    const station = await getStationById(stationId)
    const songIdx = station.songs.findIndex(song => song.id === songId)

    if (songIdx < 0) throw 'Song not found in station'

    station.songs.splice(songIdx, 1)
    await saveStation(station)
    if (stationId === stationDisplay._id) store.dispatch({ type: EDIT_STATION_DISPLAY, station })
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
    imgUrl: 'https://res.cloudinary.com/dpoa9lual/image/upload/v1724570942/Spotify_playlist_photo_yjeurq.png',
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
