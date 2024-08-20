import { stationService } from '../../services/station/station.service.local.js'
import { store } from '../store'
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, UPDATE_STATION, ADD_STATION_MSG, SET_MODAL } from '../reducers/station.reducer'

export async function loadStations(filterBy) {
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch(getCmdSetStations(stations))
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export function toggleModal(songId) {
    console.log(songId);
    const prevSongId = store.getState().stationModule.modal.songId
    const newState = songId === prevSongId ? '' : songId
    
    store.dispatch({ type: SET_MODAL, songId: newState })
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

// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}
// function getCmdSetStation(station) {
//     return {
//         type: SET_STATION,
//         station
//     }
// }
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}
function getCmdAddStationMsg(msg) {
    return {
        type: ADD_STATION_MSG,
        msg
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
