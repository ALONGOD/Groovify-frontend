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

export function MusicPlayer({ currSong }) {
  const dispatch = useDispatch()

  const playerRef = useRef(null)
  const intervalRef = useRef(null)
  const [playerSettings, setPlayerSettings] = useState({
    duration: 0,
    currentTime: 0,
    volume: 50,
    isPlaying: true,
    mode: 'shuffle' /* sync, shuffle, repeat */
  });
  const {duration, currentTime, volume, isPlaying, mode} = playerSettings;


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
  
  useEffect(() => {
    setPlayerSettings(settings => ({...settings, isPlaying: true}))
  }, [currSong])

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }

  function setMode(mode) {
    setPlayerSettings(settings => ({...settings, mode}))
  }

  function onPlayerReady(event) {
    setPlayerSettings(settings => ({...settings, duration: 0}))
    playerRef.current = event.target


    intervalRef.current = setInterval(() => {
      const currentTime = playerRef.current.getCurrentTime()
      setPlayerSettings(settings => ({...settings, currentTime}))
    }, 1000)
    
    
    playerRef.current.setVolume(playerSettings.volume)
    const duration = playerRef.current.getDuration()
    setPlayerSettings(settings => ({...settings, duration}))

    event.target.setPlaybackQuality('small')
    event.target.playVideo()
    console.log(playerRef.current)
  }

  function handleVolumeChange(event) {
    const volume = parseInt(event.target.value, 10)
    setPlayerSettings(settings => ({...settings, volume}))
    if (playerRef.current) {
      playerRef.current.setVolume(volume)
    }
  }

  function toggleDetailsSidebar() {
    setIsActive(prevState => !prevState)
    dispatch({ type: TOGGLE_DETAILS_SIDEBAR })
  }



  function toggleSoundPlay() {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState()

      if (playerState === 1) {
        playerRef.current.pauseVideo()
        setPlayerSettings(settings => ({...settings, isPlaying: false}))
        
        intervalRef.current && clearInterval(intervalRef.current)
      } else {
        playerRef.current.playVideo()
        setPlayerSettings(settings => ({...settings, isPlaying: true}))

        intervalRef.current = setInterval(() => {
          const currentTime = playerRef.current.getCurrentTime()
          setPlayerSettings(settings => ({...settings, currentTime}))
        }, 1000)
      }
    }
  }

  function handleTimeChange(ev) {
    const newTime = parseInt(ev.target.value, 10)
    setPlayerSettings(settings => ({...settings, currentTime: newTime}))

    if (playerRef.current) {
      playerRef.current.seekTo(newTime)
    }
  }

  return (
    <>
      <div className="player flex flex-column justify-center align-center">
        <div className="top flex flex-row align-center">
          <TiArrowShuffle className={mode === 'shuffle' ? 'active' : ''} onClick={() => setMode('shuffle')}/>
          <div className="song-actions flex flex-row align-center">
            <FaBackwardStep />
            <div onClick={toggleSoundPlay}>
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </div>
            <FaForwardStep />
          </div>
          <RiRepeat2Line className={mode === 'sync' ? 'active' : ''} onClick={() => setMode('sync')}/>
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
