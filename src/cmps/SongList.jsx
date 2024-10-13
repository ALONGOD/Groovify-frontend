import { useDispatch, useSelector } from 'react-redux'
import { setSongsInQueue, toggleModal } from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import { SearchBar } from './SearchBar'
import {
  SET_SONGS,
  SET_STATION_DISPLAY,
} from '../store/reducers/station.reducer'
import { useEffect, useState } from 'react'
import { onUpdateStation } from '../store/actions/backend.station'
import { SET_IS_MOBILE } from '../store/reducers/system.reducer'

export function SongList({ songs, type, station, moveSong }) {
  const songModal = useSelector(state => state.stationModule.modalSong)
  const user = useSelector(state => state.userModule.user)
  const likedSongs = user?.likedSongsStation?.songs
  const isMobile = useSelector(state => state.systemModule.isMobile)

  async function onSetSongsInQueue() {
    await setSongsInQueue(songs)
  }
  

  return (
    <ul className={`song-list ${type}`}>
      {type === 'list-table' && (
        <>
          <SongListHeader />
        </>
      )}
      {songs?.map((song, index) => {
        return (
          <SongPreview
            station={station}
            key={`${song.id}-${index}`}
            song={song}
            type={type}
            idx={index}
            songModal={songModal}
            likedSongs={likedSongs}
            onSetSongsInQueue={onSetSongsInQueue}
            moveSong={moveSong}
            isMobile={isMobile}
          />
        )
      })}
    </ul>
  )
}
