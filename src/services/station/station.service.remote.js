import { httpService } from '../http.service'

export const stationService = {
    query,
    getById,
    save,
    remove,
    getEmptyStation,
    addStationMsg
}

async function query(search) {
    return httpService.get(`station/search/${search}`)
}

function getById(stationId) {
    return httpService.get(`station/${stationId}`)
}

async function remove(stationId) {
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

async function addStationMsg(stationId, txt) {
    const savedMsg = await httpService.post(`station/${stationId}/msg`, { txt })
    return savedMsg
}

function getEmptyStation() {
    return {
        name: 'New playlist',
        description: '',
        imgUrl: '',
        tags: [],
        createdBy: {
            id: 'guest',
            name: 'Guest',
            imgUrl: 'https://res.https://res.cloudinary.com/dpoa9lual/image/upload/v1725429828/Guest-user_gmlmfj.png.com/dqcsk8rsc/image/upload/v1631896824'
        },
        likedByUsers: [],
        songs: []
    }
}