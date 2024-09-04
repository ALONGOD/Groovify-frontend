import { storageService } from '../async-storage.service';
import { makeId } from '../util.service';
import { userService } from '../user';
import {
  stations as demoStations,
  user as demoUser,
} from '../../../demo_data/station.js';

const STORAGE_KEY = 'stationDB';
const ORDER_KEY = 'stationOrder';

export const stationService = {
  query,
  getById,
  save,
  remove,
  addStationMsg,
  initializeDemoData,
  fetchLikedSongs,
  addNewStation,
  saveCustomOrder,
};

window.cs = stationService;

export async function initializeDemoData() {
  const stations = demoStations;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stations));
  console.log('Demo stations initialized in local storage.');
  return stations;
}

async function query(filterBy = {}) {
  let stations = await storageService.query(STORAGE_KEY);

  if (!stations || !stations.length) {
    stations = initializeDemoData();
  }

  if (filterBy.searchTerm) {
    const regex = new RegExp(filterBy.searchTerm, 'i');
    stations = stations.filter(station => regex.test(station.name));
  }

  switch (filterBy.sortBy) {
    case 'recents':
      stations.sort((a, b) => b.addedAt - a.addedAt); // Assuming addedAt is the time of addition
      break;
    case 'recentlyAdded':
      stations.sort((a, b) => b.songs[0]?.addedAt - a.songs[0]?.addedAt);
      break;
    case 'alphabetical':
      stations.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'creator':
      stations.sort((a, b) => a.createdBy.fullname.localeCompare(b.createdBy.fullname));
      break;
    case 'customOrder':
      const customOrder = JSON.parse(localStorage.getItem(ORDER_KEY));
      if (customOrder) {
        // Sort the stations array according to the custom order stored in local storage
        stations.sort((a, b) => {
          const indexA = customOrder.findIndex(station => station._id === a._id);
          const indexB = customOrder.findIndex(station => station._id === b._id);
          return indexA - indexB;
        });
      }
      break;
    default:
      break;
  }

  return stations;
}

async function fetchLikedSongs() {
  const user = JSON.parse(localStorage.getItem('loggedinUser'));
  if (!user) {
    localStorage.setItem('loggedinUser', JSON.stringify(demoUser));
    return demoUser.likedSongsStation;
  }
  return user.likedSongsStation;
}

function getById(stationId) {
  if (stationId === 'liked-songs') return fetchLikedSongs();
  return storageService.get(STORAGE_KEY, stationId);
}

async function remove(stationId) {
  await storageService.remove(STORAGE_KEY, stationId);
}

async function addNewStation(dispatchAddStation) {
  const loggedinUser = userService.getLoggedinUser();

  const newStation = {
    _id: makeId(), // Generate a new unique ID
    name: 'New Playlist', // Default name
    imgUrl: 'https://res.cloudinary.com/dpoa9lual/image/upload/v1724570942/Spotify_playlist_photo_yjeurq.png', // Default placeholder image
    tags: [], // Default tags
    createdBy: loggedinUser
      ? {
        id: loggedinUser.id,
        fullname: loggedinUser.fullname,
        imgUrl: loggedinUser.img,
      }
      : null, // Set to null if no user is logged in
    likedByUsers: [loggedinUser.id],
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
  const station = await getById(stationId);
  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  station.msgs.push(msg);
  await storageService.put(STORAGE_KEY, station);

  return msg;
}

function saveCustomOrder(stations) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(stations));
}
