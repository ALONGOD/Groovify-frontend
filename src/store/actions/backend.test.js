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
