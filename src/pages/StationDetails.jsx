import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { stationService } from '../services/station/station.service.local'
import { SongListHeader } from '../cmps/StationDetails/SongListHeader'
import { StationDetailsHeader } from '../cmps/StationDetails/StationDetailsHeader'
import { SongList } from '../cmps/SongList'
import { removeSongFromStation } from '../store/actions/station.actions'

export function StationDetails() {
  const { stationId } = useParams()
  const [station, setStation] = useState({})
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadStation(stationId)
  }, [stationId])

  async function onRemoveSongFromStation() {
    if (!station) return
    return await removeSongFromStation(stationId)
  }

  async function loadStation(stationId) {
    try {
      const stationToSave = await stationService.getById(stationId)
      setStation(stationToSave)
    } catch (err) {
      console.log('Cannot load station', err)
      throw err
    }
  }

  function handleSearch({ target }) {
    setSearchQuery(target.value)
  }

  const filteredSongs = station.songs?.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!station) return <h1>Loading...</h1>
  return (
    <section className="station-details flex flex-column">
      <StationDetailsHeader station={station} />

      <input
        type="text"
        placeholder="Search songs..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />

      <ul className="song-list flex flex-column">
        <SongListHeader />
        <hr className="custom-divider" />
        {filteredSongs && <SongList songs={filteredSongs} onRemoveSongFromStation={onRemoveSongFromStation} />}
      </ul>
    </section>
  )
}
