import { store } from '../../store/store'
import { httpService } from '../http.service'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getStationsByUser,
    addStationMsg
}

async function query(search) {
    if (search) return httpService.get(`station/search/${search}`)
    else return httpService.get('station')
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId ) {
    return httpService.delete(`station/${stationId}`)
}

async function save(station) {
    var savedStation
    if (station._id) {
        savedStation = await httpService.put(`station/${station._id}`, station)
    } else {
        savedStation = await httpService.post('station', station)
    }
    return savedStation
}

function getStationsByUser(userId) {
    return httpService.get(`station/user/${userId}`)
  }

async function addStationMsg(stationId, txt) {
    const savedMsg = await httpService.post(`station/${stationId}/msg`, { txt })
    return savedMsg
}

