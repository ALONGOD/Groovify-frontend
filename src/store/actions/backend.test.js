export async function query(search) {
 try {
    const stations = await stationService.query(search)
    return stations
 } catch (err) {
  console.log('Cannot fetch stations', err)
  throw err
 } 
}

