import { socketService } from '../../services/socket.service'
import { userService } from '../../services/user/user.service.remote'

export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'

export const ADD_STATION_TO_LIKED = 'ADD_STATION_TO_LIKED'
export const REMOVE_STATION_FROM_LIKED = 'REMOVE_STATION_FROM_LIKED'
export const UPDATE_LIKED_STATION = 'UPDATE_LIKED_STATION'

const initialState = {
    count: 10,
    user: userService.getLoggedinUser(),
    users: [],
    watchedUser : null
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            console.log(action.user);
            
            socketService.login({id:action.user._id, fullname: action.user.fullname})
            newState = { ...state, user: action.user }
            break
        case ADD_STATION_TO_LIKED: 
            newState = { ...state, user: { ...state.user, likedStations: [...state.user.likedStations, action.station] }}
            break
        case REMOVE_STATION_FROM_LIKED:
            newState = { ...state, user: { ...state.user, likedStations: state.user.likedStations.filter(station => station.id !== action.stationId) }}
            break
        case UPDATE_LIKED_STATION: 
            newState = { ...state, user: { ...state.user, likedStations: state.user.likedStations.map(station => station.id === action.station.id ? action.station : station) }}
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
