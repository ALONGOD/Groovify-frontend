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
import { setShuffleQueue, setSongsInQueue } from '../../store/actions/station.actions'
import { formatTime } from '../../services/util.service'
import { ProgressBar } from './ProgressBar'

export function MusicPlayer({ currSong }) {
  const dispatch = useDispatch()

  const queue = useSelector(storeState => storeState.stationModule.queue)

  const playerRef = useRef(null)
  const intervalRef = useRef(null)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)


  const [volume, setVolume] = useState(50)
  const isVolumeMuted = volume === 0
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


  async function playNextOrPrev(value) {
    let currSongIdx

    if (queue.isShuffled) {
      currSongIdx = queue.shuffledQueue.findIndex(song => song.id === currSong.id)
      if (queue.shuffledQueue[currSongIdx + value] === undefined) {
        const updatedShuffledQueue = await setShuffleQueue(queue.shuffledQueue)
        currSongIdx = updatedShuffledQueue.findIndex(song => song.id === currSong.id)
      }
      dispatch({ type: SET_CURRENT_SONG, songToPlay: queue.shuffledQueue[currSongIdx + value] })
    }

    if (!queue.isShuffled)
      console.log(queue.songsQueue);

    currSongIdx = queue.songsQueue.findIndex(song => song.id === currSong.id)
    if (queue.songsQueue[currSongIdx + value] === undefined) return
    dispatch({ type: SET_CURRENT_SONG, songToPlay: queue.songsQueue[currSongIdx + value] })

  }

  function setQueueIsShuffled(state) {
    if (state === queue.isShuffled) return dispatch({ type: SET_QUEUE_MODE, mode: '' })
    dispatch({ type: SET_QUEUE_MODE, mode: state })
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
    // console.log(playerRef.current)
  }

  // function handleVolumeChange(event) {
  //   const newVolume = parseInt(event.target.value, 10)
  //   setVolume(newVolume)
  //   if (playerRef.current) {
  //     playerRef.current.setVolume(newVolume)
  //   }
  // }

  function toggleDetailsSidebar() {
    setIsActive(prevState => !prevState)
    dispatch({ type: TOGGLE_DETAILS_SIDEBAR })
  }

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

  function handleVolumeChange(e){
    const volumeContainer = e.currentTarget; 
    const width = volumeContainer.offsetWidth;
    const clickX = e.nativeEvent.offsetX;

    const newVolume = clickX / width;
    setVolume(newVolume * 100);
    console.log(newVolume * 100);
    

    if (playerRef.current) {
      playerRef.current.setVolume(newVolume * 100); 
    }
  };

  function handleProgressClick(e) {
    if (!playerRef.current) return
    const progressContainer = e.target;
    const width = progressContainer.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = playerRef.current.getDuration();

    const newTime = (clickX / width) * duration;
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime, true);
  };

  function toggleVolume() {
    isVolumeMuted ? setVolume(50) : setVolume(0)
    playerRef.current.setVolume(volume)
  }

  return (
    <>
      <div className="player flex flex-column justify-center align-center">
        <div className="top flex flex-row align-center">
          <TiArrowShuffle onClick={() => setQueueIsShuffled(true)} className={queue.isShuffled ? 'active' : ''} />
          <div className="song-actions flex flex-row align-center">
            <FaBackwardStep onClick={() => playNextOrPrev(-1)} />
            <div onClick={toggleSoundPlay}>
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </div>
            <FaForwardStep onClick={() => playNextOrPrev(1)} />
          </div>
          <RiRepeat2Line onClick={() => setQueueIsShuffled(false)} className={!queue.isShuffled ? 'active' : ''} />
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

            <ProgressBar currProgress={currentTime} maxProgress={duration} handleProgressClick={handleProgressClick} type='video-progress'/>
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
          isVolumeMuted={isVolumeMuted}
          toggleVolume={toggleVolume}
        />
      )}
    </>
  )
}
