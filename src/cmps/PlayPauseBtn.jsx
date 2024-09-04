import { IoIosPause, IoIosPlay } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import {
  SET_PLAYER_CURRENT_SONG,
  SET_PLAYER_CURRENT_STATION,
  SET_PLAYER_IS_PLAYING,
} from '../store/reducers/station.reducer'
import { setSongsInQueue } from '../store/actions/station.actions'

export function PlayPauseBtn({ song, station, type, onTogglePlay, onSetSongsInQueue }) {
  const dispatch = useDispatch()

  const songs = useSelector(state => state.stationModule.songs)
  const player = useSelector(state => state.stationModule.player)
  const { isPlaying, currSong, currStation } = player
  const isSongPlaying = setIsPlaying()


  function setIsPlaying() {
    if (type === 'station-preview') return (currStation?.id === station?._id) && isPlaying
    else return currSong?.id === song?.id && isPlaying
  }


  function playOrPauseSong(ev) {
    if (onTogglePlay) return onTogglePlay(ev) 
    if (onSetSongsInQueue) onSetSongsInQueue()
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
        <IoIosPause className='play-pause-btn' onClick={playOrPauseSong} />
      ) : (
        <IoIosPlay className='play-pause-btn' onClick={playOrPauseSong} />
      )}
    </>
  )
}
