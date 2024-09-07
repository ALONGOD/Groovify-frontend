export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        removeStationFromLiked(stationId)
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

