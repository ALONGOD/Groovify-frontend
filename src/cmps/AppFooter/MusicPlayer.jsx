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

export function MusicPlayer({currSong}) {
  // const YT_API_KEY = 'AIzaSyDqTgt_N3MSGncWUccH-LbSYRtkdv_mXbw'

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50)
  const playerRef = useRef(null)
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
    // height: '390',
    // width: '640',
    height: '200',
    width: '200',
    playerVars: {
      autoplay: 0,
    },
  }

  useEffect(() => {
    setIsPlaying(false)
  }, [currSong])
  

  function onPlayerReady(event) {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume)
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
      } else {
        playerRef.current.playVideo()
        setIsPlaying(true)
      }
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
            <p className="music-current-time">0:00</p>
            <input type="range" name="" className="youtube-player" />
            <p className="music-total-length">3:30</p>
          </div>
        </div>
      </div>
      {currSong && (
        <div className="other-options flex flex-row align-center">
          <IoPlayCircleOutline
            onClick={toggleDetailsSidebar}
            style={{ color: isActive ? '#00ba5c' : 'inherit' }}
          />
          <HiOutlineQueueList />
          <AiOutlineSound />
          <input type="range" min={0} max={100} step={1} value={volume} onChange={handleVolumeChange} className="youtube-player sound" />
        </div>
      )}
    </>
  )
}
