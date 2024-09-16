// MODAL
export const SET_MODAL = 'SET_MODAL'
export const SET_EDIT_MODAL = 'SET_EDIT_MODAL'
// QUEUE
export const SET_QUEUE_SONGS = 'SET_QUEUE_SONGS'
export const SET_QUEUE_MODE = 'SET_QUEUE_MODE'
export const SET_QUEUE_SHUFFLED = 'SET_QUEUE_SHUFFLED'
export const ADD_SONG_TO_QUEUE = 'ADD_SONG_TO_QUEUE'

export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_SORT_BY = 'SET_SORT_BY'

export const SET_PLAYER = 'SET_PLAYER'
export const SET_PLAYER_CURRENT_SONG = 'SET_PLAYER_CURR_SONG'
export const SET_PLAYER_IS_PLAYING = 'SET_PLAYER_IS_PLAYING'
export const SET_PLAYER_CURRENT_STATION = 'SET_PLAYER_CURRENT_STATION'
export const SET_SONGS = 'SET_SONGS'

export const ADD_TO_HISTORY = 'ADD_TO_HISTORY'
export const EDIT_STATION_DISPLAY = 'EDIT_STATION_DISPLAY'
export const SET_STATION_DISPLAY = 'SET_STATION_DISPLAY'
export const SET_PARTY_PLAY = 'SET_PARTY_PLAY'
export const SET_PARTY_PAUSE = 'SET_PARTY_PAUSE'
export const TOGGLE_PARTY_PLAY = 'TOGGLE_PARTY_PLAY'
export const SET_PARTY_STATION_ID = 'SET_PARTY_STATION_ID'

const initialState = {
  songs: [],
  searchTerm: '',
  stationDisplay: null,
  player: {
    currSong: null,
    isPlaying: true,
    currStation: null,
    partyListen: { state: false, stationId: null },
  },
  modalSong: {},
  editStationModal: false,
  sortBy: 'recents',
  queue: { isShuffled: false, songsQueue: [], shuffledQueue: [] },
  history: [],
}

export function stationReducer(state = initialState, action) {
  var newState = state

  const { partyListen } = state.player

  switch (action.type) {
    // STATIONS
    case SET_STATION_DISPLAY:
      newState = { ...state, stationDisplay: action.station }
      break
    case EDIT_STATION_DISPLAY:
      console.log('updatedStation', action.station)

      newState = { ...state, stationDisplay: action.station }
      break
    case SET_SEARCH_TERM: // Add this case
      newState = { ...state, searchTerm: action.searchTerm }
      break

    case SET_SORT_BY: // Handle sorting criteria
      newState = { ...state, sortBy: action.sortBy }
      break

    case SET_MODAL:
      newState = { ...state, modalSong: action.song }
      break
    case SET_EDIT_MODAL:
      newState = { ...state, editStationModal: action.isOpen }
      break

    // QUEUE
    case SET_QUEUE_SONGS:
      console.log(action.songs)
      newState = {
        ...state,
        queue: { ...state.queue, songsQueue: action.songs },
      }
      break
    case SET_QUEUE_MODE:
      newState = {
        ...state,
        queue: { ...state.queue, isShuffled: action.mode },
      }
      break
    case SET_QUEUE_SHUFFLED:
      newState = {
        ...state,
        queue: { ...state.queue, shuffledQueue: action.songs },
      }
      break
    case ADD_SONG_TO_QUEUE:
      const { songsQueue, shuffledQueue, isShuffled } = state.queue
      const currSongIdx = songsQueue.findIndex(
        song => song.id === state.player?.currSong?.id
      )
      const currSongIdxShuffle = shuffledQueue.findIndex(
        song => song.id === state.player?.currSong?.id
      )

      const newSongsQueue = [...songsQueue]
      newSongsQueue.splice(currSongIdx + 1, 0, action.song)

      const newShuffledQueue = [...shuffledQueue]
      newShuffledQueue.splice(currSongIdxShuffle + 1, 0, action.song)

      newState = {
        ...state,
        queue: {
          songsQueue: newSongsQueue,
          shuffledQueue: newShuffledQueue,
          isShuffled,
        },
      }
      break

    // PLAYER

    case SET_PLAYER_CURRENT_SONG:
      newState = {
        ...state,
        player: { ...state.player, currSong: action.currSong },
      }
      break
    case SET_PLAYER_IS_PLAYING:
      newState = {
        ...state,
        player: { ...state.player, isPlaying: action.isPlaying },
      }
      break
    case SET_PLAYER_CURRENT_STATION:
      newState = {
        ...state,
        player: { ...state.player, currStation: action.currStation },
      }
      break
    case SET_SONGS:
      console.log(action.songs)
      newState = { ...state, songs: action.songs }
      break

    case ADD_TO_HISTORY:
      const updatedHistory = state.history.filter(
        historySong => historySong.id !== action.song.id
      )
      newState = {
        ...state,
        history: [action.song, ...updatedHistory],
      }
      console.log('Updated History:', newState.history)
      break
    case SET_PLAYER:
      newState = { ...state, player: action.player }
      break
    case TOGGLE_PARTY_PLAY:
      newState = {
        ...state,
        player: {
          ...state.player,
          partyListen: {
            state: !partyListen.state,
            stationId: partyListen.stationId,
          },
        },
      }
      break
    case SET_PARTY_PLAY:
      newState = {
        ...state,
        player: {
          ...state.player,
          partyListen: {
            state: true,
            stationId: partyListen.stationId,
          },
        },
      }
      break
    case SET_PARTY_PAUSE:
      newState = {
        ...state,
        partyListen: {
          state: false,
          stationId: partyListen.stationId,
        },
      }
      break
    case SET_PARTY_STATION_ID:
      console.log('action.stationId:', action.stationId)
      newState = { ...state, player: { ...state.player, partyListen: { ...partyListen, stationId: action.stationId},
        },
      }
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
