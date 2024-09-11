import { useDispatch, useSelector } from 'react-redux'
import { setSongsInQueue, toggleModal } from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import { useEffect, useState } from 'react'
import update from 'immutability-helper'
import { SET_SONGS } from '../store/reducers/station.reducer'

export function SongList({ songs, type, station }) {
  const dispatch = useDispatch()
  const [songOrder, setSongOrder] = useState(songs) // Local state for song order
  const songModal = useSelector(state => state.stationModule.modalSong)
  const user = useSelector(state => state.userModule.user)
  const likedSongs = user?.likedSongsStation?.songs

  useEffect(() => {
    dispatch({ type: SET_SONGS, songs })
  }, [])

  useEffect(() => {
    setSongOrder(songs)
    dispatch({ type: SET_SONGS, songs })
  }, [songs])

  async function onSetSongsInQueue() {
    await setSongsInQueue(songs)
  }

  const moveSong = (dragIndex, hoverIndex) => {
    const draggedSong = songOrder[dragIndex]
    const updatedOrder = update(songOrder, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, draggedSong]],
    })
    setSongOrder(updatedOrder)
    dispatch({ type: SET_SONGS, songs: updatedOrder })
    // Here you can also save the updated order to the backend or local storage
  }

  return (
    <ul className={`song-list ${type}`}>
      {type === 'list-table' && <SongListHeader />}
      {songOrder.map((song, idx) => {
        return (
          <SongPreview
            station={station}
            key={`${song.id}-${idx}`}
            song={song}
            type={type}
            idx={idx}
            moveSong={moveSong} // Pass moveSong function to SongPreview
            songModal={songModal}
            likedSongs={likedSongs}
            onSetSongsInQueue={onSetSongsInQueue}
          />
        )
      })}
    </ul>
  )
}
