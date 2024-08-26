import { useEffect, useRef, useState } from 'react'
import { AiOutlineSound } from 'react-icons/ai'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { RiRepeat2Line } from 'react-icons/ri'
import { TiArrowShuffle } from 'react-icons/ti'
import { useSelector, useDispatch } from 'react-redux'
import YouTube from 'react-youtube'
import { TOGGLE_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer'
import { MusicPlayerActions } from './MusicPlayerActions'
import { SET_CURRENT_SONG, SET_QUEUE_MODE } from '../../store/reducers/station.reducer'
import { setSongsInQueue } from '../../store/actions/station.actions'
import { formatTime } from '../../services/util.service'

export function MusicPlayer({ currSong }) {
  const dispatch = useDispatch()

  const queue = useSelector(storeState => storeState.stationModule.queue)

  const playerRef = useRef(null)
  const intervalRef = useRef(null)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isPlaying, setIsPlaying] = useState(true)

  const isDetailsOpen = useSelector(
    storeState => storeState.systemModule.isDetailsOpen
  )
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(isDetailsOpen)
  }, [isDetailsOpen])

  const opts = {
    height: '200',
    width: '200',
    playerVars: {
      autoplay: 1,
    },
  }
  // playNextOrPrev('next')
  // dispatch({type: SET_CURRENT_SONG, songToPlay: queue.songs[currSongIdx + 1]})

  // function playPrevSong() {
  //     if (!queue?.songs[currSongIdx - 1]) return
  //     dispatch({
  //       type: SET_CURRENT_SONG,
  //       songToPlay: queue.songs[currSongIdx - 1],
  //     })
    
  // }

  function playNextOrPrev(value) {
    // console.log(queue.songs)
    const currSongIdx = queue.songs.findIndex(song => song.id === currSong.id)
   
      if (!queue?.songs[currSongIdx + value] ) {
        if (queue.mode === 'sync') return
        else if (queue.mode === 'shuffle') {
          setSongsInQueue(queue.songs)
          console.log('sup nig');
          
        } 
      }  
      dispatch({type: SET_CURRENT_SONG, songToPlay: queue.songs[currSongIdx + value]})
  }

  function setQueueMode(mode) {
    dispatch({ type: SET_QUEUE_MODE, mode })
    setSongsInQueue(queue.songs)
  }
  
  

  useEffect(() => {
    playAudio(true)
  }, [currSong])
  
  function playAudio() {
    // playerRef?.current?.playVideo()
    setIsPlaying(true)
  }


  function onPlayerReady(event) {
    setCurrentTime(0)
    intervalRef.current = setInterval(() => {
      setCurrentTime(playerRef.current.getCurrentTime())
    }, 1000)

    playerRef.current = event.target

    playerRef.current.setVolume(volume)
    const duration = playerRef.current.getDuration()
    setDuration(duration)

    event.target.setPlaybackQuality('small')
    event.target.playVideo()
    console.log(playerRef.current)
  }

  function handleVolumeChange(event) {
    const newVolume = parseInt(event.target.value, 10)
    setVolume(newVolume)
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume)
    }
  }

  function toggleDetailsSidebar() {
    setIsActive(prevState => !prevState)
    dispatch({ type: TOGGLE_DETAILS_SIDEBAR })
  }

  // function soundPlay() {
  //   if (player) {
  //     console.log(player);

  //     player.playVideo()
  //     setIsPlaying(true)
  //   }
  // }

  function toggleSoundPlay() {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState()

      if (playerState === 1) {
        playerRef.current.pauseVideo()
        setIsPlaying(false)

        intervalRef.current && clearInterval(intervalRef.current)
      } else {
        playerRef.current.playVideo()
        setIsPlaying(true)

        intervalRef.current = setInterval(() => {
          setCurrentTime(playerRef.current.getCurrentTime())
        }, 1000)
      }
    }
  }

  function handleTimeChange(ev) {
    const newTime = parseInt(ev.target.value, 10)
    setCurrentTime(newTime)

    if (playerRef.current) {
      playerRef.current.seekTo(newTime)
    }
  }

  return (
    <>
      <div className="player flex flex-column justify-center align-center">
        <div className="top flex flex-row align-center">
          <TiArrowShuffle onClick={() => setQueueMode('shuffle')} className={queue.mode === 'shuffle' ? 'active' : ''}/>
          <div className="song-actions flex flex-row align-center">
            <FaBackwardStep onClick={() => playNextOrPrev(-1)}/>
            <div onClick={toggleSoundPlay}>
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </div>
            <FaForwardStep onClick={() => playNextOrPrev(1)}/>
          </div>
          <RiRepeat2Line onClick={() => setQueueMode('sync')} className={queue.mode === 'sync' ? 'active' : ''}/>
        </div>

        <div className="bottom flex flex-row align-center">
          <YouTube
            className="hidden"
            videoId={currSong?.id}
            opts={opts}
            onReady={onPlayerReady}
          />
          <div className="music-player-container flex flex-row align-center">
            <p className="music-current-time">
              {currentTime ? formatTime(currentTime) : '0:00'}
            </p>
            <input
              type="range"
              name=""
              min={0}
              max={duration ? duration : 0}
              value={currentTime}
              className="youtube-player"
              onChange={handleTimeChange}
            />
            <p className="music-total-length">
              {duration ? formatTime(duration) : '0:00'}
            </p>
          </div>
        </div>
      </div>
      {currSong && (
        <MusicPlayerActions
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          toggleDetailsSidebar={toggleDetailsSidebar}
          isActive={isActive}
        />
      )}
    </>
  )
}
