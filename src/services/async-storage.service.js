export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  // addSongToStation,
  // removeSongFromStation,
  save
}

function query(entityType, delay = 500) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || []
  return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
  return query(entityType).then(entities => {
    const entity = entities.find(entity => entity._id === entityId)
    if (!entity)
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    return entity
  })
}

function post(entityType, newEntity) {
  if (!newEntity._id) {
    newEntity._id = _makeId()
  }
  return query(entityType).then(entities => {
    entities.push(newEntity)
    save(entityType, entities)
    return newEntity
  })
}

function put(entityType, updatedEntity) {
  return query(entityType).then(entities => {
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    const entityToUpdate = { ...entities[idx], ...updatedEntity }
    entities.splice(idx, 1, entityToUpdate)
    save(entityType, entities)
    return entityToUpdate
  })
}

// async function addSongToStation(songToAdd, stationId) {
//   const stations = await query('stationDB')
//   const idx = stations.findIndex(station => station._id === stationId)
//   const hasId = stations[idx].songs.some(song => song.id === songToAdd.id)
//   if (hasId) throw 'Song already exists in station'
//   stations[idx].songs.push(songToAdd)
//   save('stationDB', stations)
//   return stations[idx]
// }

// async function removeSongFromStation(songId, stationId) {
//   const stations = await query('stationDB')
//   const idx = stations.findIndex(station => station._id === stationId)
//   const songIdx = stations[idx].songs.findIndex(song => song.id === songId)
//   if (songIdx < 0) throw 'Song not found in station'
//   stations[idx].songs.splice(songIdx, 1)
//   save('stationDB', stations)
//   return stations[idx]
// }

function remove(entityType, entityId) {
  return query(entityType).then(entities => {
    const idx = entities.findIndex(entity => entity._id === entityId)
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    entities.splice(idx, 1)
    save(entityType, entities)
  })
}

// Private functions

function save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
