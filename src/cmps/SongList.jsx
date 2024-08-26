import { useDispatch, useSelector } from 'react-redux'
import {
  setSongsInQueue,
  toggleModal,
} from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import { SET_CURRENT_SONG } from '../store/reducers/station.reducer'
import { SearchBar } from './SearchBar'
import { useEffect, useState } from 'react'

export function SongList({ songs, type }) {
  const dispatch = useDispatch()
  const songModal = useSelector(state => state.stationModule.modalSong)
  const currSong = useSelector(state => state.stationModule.currSong)
  const stations = useSelector(state => state.stationModule.stations)

  const likedSongsStation = stations.find(
    station => station._id === 'liked-songs'
  )
  const likedSongs = likedSongsStation ? likedSongsStation.songs : []

  
  function onToggleModal(event, song) {
    event.stopPropagation()
    toggleModal(song)
  }
  
  function playSong(song) {
    console.log(song);
    setSongsInQueue(songs)
    dispatch({ type: SET_CURRENT_SONG, songToPlay: song })
  }

  return (
    <>
      {songs.length === 0 && type === 'list-table' ? (
        <div className="no-songs">
          <h2>Let's find something for your playlist</h2>
          <SearchBar searchType={'youtube'} placeholder={"Search for songs or episodes"} />
        </div>
      ) : (
        <ul className={`song-list ${type}`}>
          {type === 'list-table' && (
            <>
              <SongListHeader />
              <hr className="custom-divider" />
            </>
          )}
          {songs.map((song, idx) => {
            return (
              <SongPreview
                currSong={currSong}
                playSong={playSong}
                key={`${song.id}-${idx}`}
                song={song}
                type={type}
                idx={idx}
                songModal={songModal}
                onToggleModal={onToggleModal}
                likedSongs={likedSongs}
              />
            )
          })}
        </ul>
      )}
    </>
  )
}
