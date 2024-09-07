import { stationService } from "../../services/station/station.service.remote"
import { userService } from "../../services/user/user.service.remote"
import { ADD_STATION, REMOVE_STATION, UPDATE_STATION } from "../reducers/station.reducer"
import { ADD_STATION_TO_LIKED, REMOVE_STATION_FROM_LIKED, UPDATE_LIKED_STATION } from "../reducers/user.reducer"
import { store } from "../store"
import { removeStationFromLiked, saveStationToLiked, updateStation } from "./backend.user"

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
    console.log('station:', station)
    const savedStation = await stationService.save(station)
    console.log('savedStation:', savedStation)

    const { _id: id, name, creator, imgUrl } = savedStation

    return savedStation
}

export async function addNewStation() {
    try {
        const newStation = getEmptyStation()
        const stationSaved = await stationService.save(newStation)
        console.log('stationSaved:', stationSaved)
        const { _id, name, createdBy, imgUrl } = stationSaved
        await saveStationToLiked({_id, name, createdBy, imgUrl })
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



export async function setLoggedInUser() {

}

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
            imgUrl: user?.imgUrl
        },
        likedByUsers: [],
        songs: []
    }
}