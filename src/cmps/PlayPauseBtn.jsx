import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import {
  SET_PLAYER_CURRENT_SONG,
  SET_PLAYER_CURRENT_STATION,
  SET_PLAYER_IS_PLAYING,
} from '../store/reducers/station.reducer'
import { setSongsInQueue } from '../store/actions/station.actions'

export function PlayPauseBtn({ song, station, type }) {
  const dispatch = useDispatch()

  const songs = useSelector(state => state.stationModule.songs)
  const player = useSelector(state => state.stationModule.player)
  const { isPlaying, currSong, currStation } = player
  const isSongPlaying = currSong?.id === song?.id && isPlaying

  // console.log(currStation);

  function playOrPauseSong() {
    if (songs) setSongsInQueue(songs)
    if (station)
      dispatch({
        type: SET_PLAYER_CURRENT_STATION,
        currStation: { id: station._id, name: station.name },
      })
    if (currSong?.id !== song?.id) {
      dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: song })
    }
    dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: !isPlaying })
  }

  // console.log(isPlaying);

  if (type === 'top-result') {
    console.log('sup nig')

    return (
      <div className={`play-pause-container ${type}`} onClick={playOrPauseSong}>
        {isSongPlaying ? <IoIosPause /> : <IoIosPlay />}
      </div>
    )
  }
  return (
    <>
      {isSongPlaying ? (
        <IoIosPause onClick={playOrPauseSong} />
      ) : (
        <IoIosPlay onClick={playOrPauseSong} />
      )}
    </>
  )
}
