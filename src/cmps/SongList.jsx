import { useDispatch, useSelector } from 'react-redux'
import { setSongsInQueue, toggleModal } from '../store/actions/station.actions'
import { SongPreview } from './SongPreview'
import { SongListHeader } from './StationDetails/SongListHeader'
import {
  SET_PLAYER_CURRENT_SONG,
  SET_PLAYER_CURRENT_STATION,
  SET_PLAYER_IS_PLAYING,
} from '../store/reducers/station.reducer'
import { SearchBar } from './SearchBar'

export function SongList({ songs, type, station }) {
  const dispatch = useDispatch()
  const songModal = useSelector(state => state.stationModule.modalSong)
  const player = useSelector(state => state.stationModule.player)
  console.log('player:', player)
  const currSong = useSelector(state => state.stationModule.player.currSong)
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
    setSongsInQueue(songs)

    dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: song })
    dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: true })
    console.log(station);
    if (station) {
      
      dispatch({
        type: SET_PLAYER_CURRENT_STATION,
        currStation: { id: station.id, name: station.name },
      })
    }
  }

  console.log(songs)

  return (
    <>
      {songs.length === 0 && type === 'list-table' ? (
        <div className="no-songs">
          <h2>Let's find something for your playlist</h2>
          <SearchBar
            searchType={'youtube'}
            placeholder={'Search for songs or episodes'}
          />
        </div>
      ) : (
        <ul className={`song-list ${type}`}>
          {type === 'list-table' && (
            <>
              <SongListHeader />
            </>
          )}
          {songs.map((song, idx) => {
            // console.log(song);

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
