export const SET_STATIONS = 'SET_STATIONS'
export const REMOVE_STATION = 'REMOVE_STATION'
export const ADD_STATION = 'ADD_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'
export const ADD_STATION_MSG = 'ADD_STATION_MSG'
export const SET_MODAL = 'SET_MODAL'
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const ADD_SONG_TO_STATION = 'ADD_SONG_TO_STATION'
export const SET_STATION_DETAILS = 'SET_STATION_DETAILS'


const initialState = {
  stations: [],
  currSong: null,
  player: { status: 'paused', volume: 0.5, progress: 0 },
  modalSong: {},
  searchResults: [],
  stationDetails: {},
}

export function stationReducer(state = initialState, action) {
  var newState = state
  var stations

  switch (action.type) {
    case SET_STATIONS:
      newState = { ...state, stations: action.stations }
      break

    case REMOVE_STATION:
      stations = state.stations.filter(
        station => station._id !== action.stationId
      )
      newState = { ...state, stations }
      break
    case SET_SEARCH_RESULTS:
      newState = { ...state, searchResults: action.results }
      break
    case ADD_STATION:
      newState = { ...state, stations: [...state.stations, action.station] };
      break;
    case UPDATE_STATION:
      stations = state.stations.map(station =>
        station._id === action.updatedStation._id ? action.updatedStation : station
      )
      newState = { ...state, stations }
      break
    case SET_STATION_DETAILS:
      newState = { ...state, stationDetails: action.station }
      break
    case SET_MODAL:
      newState = { ...state, modalSong: action.song }
    default:
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
    type: ADD_STATION_MSG,
    stationId: station1._id,
    msg,
  })
  console.log('After ADD_STATION_MSG:', state)

  state = stationReducer(state, {
    type: REMOVE_STATION,
    stationId: station1._id,
  })
  console.log('After REMOVE_STATION:', state)
}
