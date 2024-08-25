import { useEffect, useRef, useState } from 'react'
import { AiOutlineSound } from 'react-icons/ai'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { RiRepeat2Line } from 'react-icons/ri'
import { TiArrowShuffle } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube'
import { TOGGLE_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer'
import { MusicPlayerActions } from './MusicPlayerActions'

export function MusicPlayer({currSong}) {
  const playerRef = useRef(null)
  const intervalRef = useRef(null)
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const [volume, setVolume] = useState(50)

  const [isPlaying, setIsPlaying] = useState(true);

  const isDetailsOpen = useSelector(
    storeState => storeState.systemModule.isDetailsOpen
  )
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(isDetailsOpen)
  }, [isDetailsOpen])


  
  
  console.log(currSong);
  
  let videoElement = null
  const opts = {
    height: '200',
    width: '200',
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    // setIsPlaying(false)
  }, [currSong])

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
  

  function onPlayerReady(event) {
    setCurrentTime(0)
    playerRef.current = event.target;

    
    playerRef.current.setVolume(volume)
    const duration = playerRef.current.getDuration();
    setDuration(duration);
    
    event.target.setPlaybackQuality('small')
    event.target.playVideo()
    console.log(playerRef.current);
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
          <TiArrowShuffle />
          <div className="song-actions flex flex-row align-center">
            <FaBackwardStep />
            <div onClick={toggleSoundPlay}>
            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </div>
            <FaForwardStep />
          </div>
          <RiRepeat2Line />
        </div>

        

        <div className="bottom flex flex-row align-center">
          <YouTube
          className='hidden'
            videoId={
              currSong?.id
            }
            opts={opts}
            onReady={onPlayerReady}
          />
          <div className="music-player-container flex flex-row align-center">
            <p className="music-current-time">{currentTime ? formatTime(currentTime) : '0:00'}</p>
            <input type="range" name="" min={0} max={duration ? duration : 0} value={currentTime} className="youtube-player" onChange={handleTimeChange}/>
            <p className="music-total-length">{duration ? formatTime(duration) : '0:00'}</p>
          </div>
        </div>
      </div>
      {currSong && (
        <MusicPlayerActions volume={volume} handleVolumeChange={handleVolumeChange} toggleDetailsSidebar={toggleDetailsSidebar} isActive={isActive}/>
      )}
    </>
  )
}
