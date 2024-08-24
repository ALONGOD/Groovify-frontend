import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'
import {
  stations as demoStations,
  user as demoUser,
} from '../../../demo_data/station.js'
import { getEmptyStation } from './index.js'
import { useSelector } from 'react-redux'; // Import useSelector
const STORAGE_KEY = 'stationDB'

export const stationService = {
  query,
  getById,
  save,
  remove,
  addStationMsg,
  initializeDemoData,
  fetchLikedSongs,
  addNewStation
}

window.cs = stationService

export async function initializeDemoData() {
  const stations = demoStations
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stations))
  console.log('Demo stations initialized in local storage.')
  return stations
}
// console.log(query())
// console.log(query())

async function query(filterBy = {}) {
  console.log('filterBy:', filterBy)
  let stations = await storageService.query(STORAGE_KEY)

  if (!stations || !stations.length) {
    stations = initializeDemoData() // Assuming this function returns demo data
  }

  if (filterBy.searchTerm) {
    const regex = new RegExp(filterBy.searchTerm, 'i')
    stations = stations.filter(station => regex.test(station.name))
  }

  return stations
}

async function fetchLikedSongs() {
  const likedSongsStation = JSON.parse(localStorage.getItem('loggedinUser')).likedSongsStation
  console.log('likedSongsStation:', likedSongsStation)
  return likedSongsStation
}

function getById(stationId) {
  if (stationId === 'liked-songs') return fetchLikedSongs()
  return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
  await storageService.remove(STORAGE_KEY, stationId)
}

async function addNewStation(dispatchAddStation) {
  const loggedinUser = userService.getLoggedinUser();

  const newStation = {
    _id: makeId(), // Generate a new unique ID
    name: 'New Playlist', // Default name
    imgUrl: 'https://via.placeholder.com/150', // Default placeholder image
    tags: [], // Default tags
    createdBy: loggedinUser ? {
      id: loggedinUser.id,
      fullname: loggedinUser.fullname,
      imgUrl: loggedinUser.imgUrl,
    } : null, // Set to null if no user is logged in
    likedByUsers: [],
    songs: [],
  };

  try {
    // Directly post the new station to storage
    await storageService.post(STORAGE_KEY, newStation);
    if (dispatchAddStation) {
      dispatchAddStation(newStation);
    }
    return newStation;
  } catch (err) {
    console.error('Cannot add station', err);
    throw err;
  }
}

async function save(station) {
  var savedStation;
  if (station._id) {
    // Update existing station
    const stationToSave = {
      _id: station._id,
      name: station.name,
      imgUrl: station.imgUrl,
      tags: station.tags,
      createdBy: station.createdBy,
      likedByUsers: station.likedByUsers,
      songs: station.songs,
    };
    savedStation = await storageService.put(STORAGE_KEY, stationToSave);
  } else {
    // Create a new station
    const stationToSave = {
      name: station.name,
      imgUrl: station.imgUrl,
      tags: station.tags,
      createdBy: {
        id: userService.getLoggedinUser().id,
        fullname: userService.getLoggedinUser().fullname,
        imgUrl: userService.getLoggedinUser().imgUrl,
      },
      likedByUsers: [],
      songs: station.songs || [],
    };
    savedStation = await storageService.post(STORAGE_KEY, stationToSave);
  }
  return savedStation;
}

async function addStationMsg(stationId, txt) {
  const station = await getById(stationId)
  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  station.msgs.push(msg)
  await storageService.put(STORAGE_KEY, station)

  return msg
}
