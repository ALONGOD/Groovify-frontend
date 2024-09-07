import { userService } from "../../services/user/user.service.remote"
import { SET_USER } from "../reducers/user.reducer"
import { store } from "../store"

export async function saveStationToLiked(stationToSave) {
    try {
        const { _id:id, name, createdBy, imgUrl } = stationToSave
        const user = store.getState().userModule.user
        const isStationIn = user.likedStations.some(station => station.id === stationToSave.id)
        if (isStationIn) {
            console.log('Station already in liked')
            return
        }
        user.likedStations.push({ id, name, creator: {id: createdBy.id, fullname: createdBy.fullname}, imgUrl })
        console.log('user:',user);
        
        const userToSave = await userService.update(user)
        
        store.dispatch({ type: SET_USER, user: userToSave })
    } catch (err) {
        console.log('Cannot save station to liked', err)
        throw err
    }
}

export async function removeStationFromLiked(stationId) {
    try {
        const user = store.getState().userModule.user
        const stationIdx = user.likedStations.findIndex(station => station.id === stationId)
        if (stationIdx === -1) {
            console.log('Station not in liked')
            return
        }
        user.likedStations.splice(stationIdx, 1)
        const userToSave = await userService.update(user)
        store.dispatch({ type: SET_USER, user: userToSave })
    } catch (err) {
        console.log('Cannot remove station from liked', err)
        throw err
    }

}