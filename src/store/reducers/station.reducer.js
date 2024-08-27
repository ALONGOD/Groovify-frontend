// STATION
export const SET_STATIONS = 'SET_STATIONS'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_SONG_TO_STATION = 'ADD_SONG_TO_STATION'

// MODAL
export const SET_MODAL = 'SET_MODAL'
export const SET_EDIT_MODAL = 'SET_EDIT_MODAL'
// QUEUE
export const SET_QUEUE_SONGS = 'SET_QUEUE_SONGS'
export const SET_QUEUE_MODE = 'SET_QUEUE_MODE'
export const SET_QUEUE_SHUFFLED = 'SET_QUEUE_SHUFFLED'

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SORT_BY = 'SET_SORT_BY';

const initialState = {
  stations: [],
  searchTerm: '',
  currSong: null,
  modalSong: {},
  editStationModal: false,
  sortBy: 'recents',
  queue: { isShuffled: false, songsQueue: [], shuffledQueue: [] }
}

export function stationReducer(state = initialState, action) {
  var newState = state
  var stations

  switch (action.type) {
    // STATIONS
    case SET_STATIONS:
      newState = { ...state, stations: action.stations }
      break
    case ADD_STATION:
      newState = { ...state, stations: [...state.stations, action.station] }
      break
    case UPDATE_STATION:
      stations = state.stations.map(station => {
        return station._id === action.updatedStation._id ? action.updatedStation : station
      }
      )
      newState = { ...state, stations }
      break
    case REMOVE_STATION:
      stations = state.stations.filter(
        station => station._id !== action.stationId
      )
      newState = { ...state, stations }
      break

    case SET_SEARCH_TERM:  // Add this case
      newState = { ...state, searchTerm: action.searchTerm }
      break

    case SET_SORT_BY: // Handle sorting criteria
      newState = { ...state, sortBy: action.sortBy };
      break;



    case SET_CURRENT_SONG:
      newState = { ...state, currSong: action.songToPlay }
      break
    // MODAL
    case SET_MODAL:
      newState = { ...state, modalSong: action.song }
      break
    case SET_EDIT_MODAL:
      newState = { ...state, editStationModal: action.isOpen }
      break

    // QUEUE
    case SET_QUEUE_SONGS:
      console.log(action.songs);
      newState = { ...state, queue: { ...state.queue, songsQueue: action.songs } }
      break
    case SET_QUEUE_MODE:
      newState = { ...state, queue: { ...state.queue, isShuffled: action.mode } }
      break
    case SET_QUEUE_SHUFFLED:
      newState = { ...state, queue: { ...state.queue, shuffledQueue: action.shuffledQueue } };
      break
    default:
      return newState
  }
  return newState
}

function unitTestReducer() {
  var state = initialState
  const station1 = {
    _id: 'b101',
    vendor: 'Station ' + parseInt(Math.random() * 10),
    msgs: [],
  }
  const station2 = {
    _id: 'b102',
    vendor: 'Station ' + parseInt(Math.random() * 10),
    msgs: [],
  }

  state = stationReducer(state, { type: SET_STATIONS, stations: [station1] })
  console.log('After SET_STATIONS:', state)

  state = stationReducer(state, { type: ADD_STATION, station: station2 })
  console.log('After ADD_STATION:', state)

  state = stationReducer(state, {
    type: UPDATE_STATION,
    station: { ...station2, vendor: 'Good' },
  })
  console.log('After UPDATE_STATION:', state)

  state = stationReducer(state, {
    type: REMOVE_STATION,
    stationId: station2._id,
  })
  console.log('After REMOVE_STATION:', state)

  const msg = { id: 'm' + parseInt(Math.random() * 100), txt: 'Some msg' }
  state = stationReducer(state, {
    // type: ADD_STATION_MSG,
    stationId: station1._id,
    msg,
  })
  // console.log('After ADD_STATION_MSG:', state)

  state = stationReducer(state, {
    type: REMOVE_STATION,
    stationId: station1._id,
  })
  console.log('After REMOVE_STATION:', state)
}
