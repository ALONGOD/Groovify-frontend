import { useEffect, useRef, useState } from 'react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6'
import { RiRepeat2Line } from 'react-icons/ri'
import { TiArrowShuffle } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import YouTube from 'react-youtube'

export function MusicPlayer({}) {
  // const YT_API_KEY = 'AIzaSyDqTgt_N3MSGncWUccH-LbSYRtkdv_mXbw'
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0)
  
  const currSong = useSelector(state => state.stationModule.currSong)
  
  console.log(currSong);
  
  let videoElement = null
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  }

  useEffect(() => {
    soundPlay()
  }, [currSong])
  

  function onPlayerReady(event) {
    setPlayer(event.target)
    console.log(player);
    event.target.playVideo()
  }

  function soundPlay() {
    if (player) {
      console.log(player);
      
      player.playVideo()
      setIsPlaying(true)
    }
  }

  function toggleSoundPlay() {
    if (player) {
      const playerState = player.getPlayerState()
      
      if (playerState === 1) {
        player.pauseVideo()
        setIsPlaying(false)
      } else {
        player.playVideo()
        setIsPlaying(true)
      }
    }
      

  }
  const currentAudio = useRef()

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
    </>
  )
}
