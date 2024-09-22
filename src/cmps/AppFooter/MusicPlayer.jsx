import { useEffect, useRef, useState } from 'react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6'
import { RiRepeat2Line } from 'react-icons/ri'
import { TiArrowShuffle } from 'react-icons/ti'
import { useSelector, useDispatch } from 'react-redux'
import YouTube from 'react-youtube'
import { MusicPlayerActions } from './MusicPlayerActions'
import {
  SET_PARTY_PLAY,
  SET_PLAYER,
  SET_PLAYER_CURRENT_SONG,
  SET_PLAYER_IS_PLAYING,
  SET_QUEUE_MODE,
} from '../../store/reducers/station.reducer'
import {
  loadSavedSettings,
  setShuffleQueue,
  addToHistory,
} from '../../store/actions/station.actions'
import { formatTime } from '../../services/util.service'
import { ProgressBar } from './ProgressBar'
import { SyncButton } from '../svgs/SyncButton'
import { ShuffleButton } from '../svgs/ShuffleButton'
import { storageService } from '../../services/async-storage.service'
import { socketService } from '../../services/socket.service'
import { showErrorMsg } from '../../services/event-bus.service'

export function MusicPlayer({ currSong }) {
  // const {pathname} = useLocation()
  // console.log('location:', pathname)
  const dispatch = useDispatch()
  const queue = useSelector(storeState => storeState.stationModule.queue)
  const player = useSelector(storeState => storeState.stationModule.player)
  const user = useSelector(storeState => storeState.userModule.user)
  const isMobile = useSelector(state => state.systemModule.isMobile)
  const isPlaying = player.isPlaying
  const partyListen = player.partyListen
  const partyState = partyListen.state
  const stationId = partyListen.stationId

  const playerRef = useRef(null)
  const intervalRef = useRef(null)

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const [volume, setVolume] = useState(50)
  
  const opts = {
    height: '200',
    width: '200',
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    if (!currSong) {
      loadSavedSettings()
    }
    storageService.save('currentSong', currSong)
    if (player?.currStation) {
      storageService.save('currentStation', player.currStation)
    }
    if (currSong) {
      dispatch(addToHistory(currSong))
    }
  }, [currSong, player.currStation, volume])

  useEffect(() => {
    try {
      if (playerRef.current) {
        if (isPlaying) playerRef?.current?.playVideo()
          else playerRef?.current?.pauseVideo()
      }
    } catch (err) {
      showErrorMsg('Error playing song')    
    }
  }, [isPlaying])

  useEffect(() => {
    if (partyListen.state) {
      joinParty()
      socketService.on('request-player', ({ room, userId }) => {
        if (userId !== user?._id) {
          socketService.emit('send-player', { player, currentTime })
        }
      })
      socketService.on('sync-player', ({ player, currentTime, userId }) => {
        if (userId !== user?._id) {
          syncPlayer(player, currentTime)
        }
      })
    } else {
      leaveParty()
      socketService.off('sync-player')
      socketService.off('request-player')
      socketService.off('user-joined')
    }
  }, [partyListen.state])

  function joinParty() {
    socketService.emit('join-party', { stationId })
    dispatch({ type: SET_PARTY_PLAY })

    socketService.on('user-joined', user => {
      console.log(`${user?.fullname} joined the party!`)
    })

    socketService.emit('request-player')
  }

  function leaveParty() {
    socketService.emit('leave-party', { stationId })
  }

  function syncPlayer(player, currentTime) {
    dispatch({ type: SET_PLAYER, player })
    if (currentTime) {
      playerRef.current.seekTo(currentTime)
      setCurrentTime(currentTime)
    }
  }

  async function playNextOrPrev(value) {
    let currSongIdx

    if (queue.isShuffled) {
      currSongIdx = queue.shuffledQueue.findIndex(
        song => song.id === currSong.id
      )
      if (queue.shuffledQueue[currSongIdx + value] === undefined) {
        const updatedShuffledQueue = await setShuffleQueue(queue.shuffledQueue)
        currSongIdx = updatedShuffledQueue.findIndex(
          song => song.id === currSong.id
        )
      }
      console.log('shuffled', queue.shuffledQueue)
      const nextSong = queue.shuffledQueue[currSongIdx + value]
      if (partyState)
        socketService.emit('send-player', {
          player: { ...player, currSong: nextSong },
          currentTime,
          userId: user?._id,
        })
      dispatch({
        type: SET_PLAYER_CURRENT_SONG,
        currSong: nextSong,
      })
    }

    if (!queue.isShuffled) {
      console.log(queue.songsQueue)

      currSongIdx = queue.songsQueue.findIndex(song => song.id === currSong.id)
      if (queue.songsQueue[currSongIdx + value] === undefined) return
      const nextSong = queue.songsQueue[currSongIdx + value]
      if (partyState)
        socketService.emit('send-player', {
          player: { ...player, currSong: nextSong },
          currentTime,
          userId: user?._id,
        })
      dispatch({
        type: SET_PLAYER_CURRENT_SONG,
        currSong: queue.songsQueue[currSongIdx + value],
      })
    }
  }

  function setQueueIsShuffled(state) {
    if (state === queue.isShuffled)
      return dispatch({ type: SET_QUEUE_MODE, mode: '' })
    dispatch({ type: SET_QUEUE_MODE, mode: state })
  }

  function onPlayerReady(event) {
    // if (pathname.includes('auth')) return playerRef?.current?.stopVideo()
    dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: true })
    intervalRef.current = setInterval(() => {
      setCurrentTime(playerRef.current.getCurrentTime())
    }, 1000)

    playerRef.current = event.target

    playerRef.current.setVolume(volume)
    const duration = playerRef.current.getDuration()
    setDuration(duration)

    event.target.setPlaybackQuality('small')
    event.target.playVideo()
  }

  function toggleSoundPlay() {
    if (playerRef.current) {
      const playerState = playerRef.current.getPlayerState()

      if (playerState === 1) {
        playerRef.current.pauseVideo()
        dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: false })

        intervalRef.current && clearInterval(intervalRef.current)
      } else {
        playerRef.current.playVideo()
        dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: true })

        intervalRef.current = setInterval(() => {
          setCurrentTime(playerRef.current.getCurrentTime())
        }, 1000)
      }
      if (partyState)
        socketService.emit('send-player', {
          player: { ...player, isPlaying: !player.isPlaying },
          currentTime,
          userId: user?._id,
        })
      // socketService.emit('send-player', { player, currentTime })
    }
  }

  function handleVolumeChange(e) {
    const volumeContainer = e.currentTarget
    const width = volumeContainer.offsetWidth
    const clickX = e.nativeEvent.offsetX

    const newVolume = clickX / width
    setVolume(newVolume * 100)
    console.log(newVolume * 100)

    if (playerRef.current) {
      playerRef.current.setVolume(newVolume * 100)
    }
  }

  function handleProgressClick(e) {
    if (!playerRef.current) return
    const progressContainer = e.target
    const width = progressContainer.offsetWidth
    const clickX = e.nativeEvent.offsetX
    const duration = playerRef.current.getDuration()

    const newTime = (clickX / width) * duration
    setCurrentTime(newTime)
    playerRef.current.seekTo(newTime, true)
    console.log('partyState:', partyState)
    if (partyState)
      socketService.emit('send-player', {
        player,
        currentTime,
        userId: user?._id,
      })
  }

  const isVolumeMuted =
    (playerRef?.current?.isMuted() && playerRef.current.getPlayerState === 1) ||
    volume === 0

  function toggleVolume() {
    isVolumeMuted ? playerRef.current.unMute() : playerRef.current.mute()
    isVolumeMuted ? setVolume(100) : setVolume(0)
  }

  return (
    <>
      <div className={`player flex flex-column justify-center align-center ${isMobile ? 'mobile' : ''}`}>
        <div className="top flex flex-row align-center">
          <ShuffleButton
            setQueueIsShuffled={setQueueIsShuffled}
            queue={queue}
          />
          <div className="song-actions flex flex-row align-center">
            <FaBackwardStep onClick={() => playNextOrPrev(-1)} />
            <div onClick={toggleSoundPlay} className="play-pause">
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </div>
            <FaForwardStep onClick={() => playNextOrPrev(1)} />
          </div>
          <SyncButton setQueueIsShuffled={setQueueIsShuffled} queue={queue} />
        </div>

        <div className="bottom flex flex-row align-center">
          <YouTube
            className="hidden"
            videoId={currSong?.id}
            opts={opts}
            onReady={onPlayerReady}
            onEnd={() => playNextOrPrev(1)}
          />
          <div className="music-player-container flex flex-row align-center">
            <p className="music-current-time">
              {currentTime ? formatTime(currentTime) : '0:00'}
            </p>

            <ProgressBar
              currProgress={currentTime}
              maxProgress={duration}
              handleProgressClick={handleProgressClick}
              type="video-progress"
              playerRef={playerRef}
              setCurrent={setCurrentTime}
            />
            <p className="music-total-length">
              {duration ? formatTime(duration) : '0:00'}
            </p>
          </div>
        </div>
      </div>

      <MusicPlayerActions
        volume={volume}
        setVolume={setVolume}
        handleVolumeChange={handleVolumeChange}
        isVolumeMuted={isVolumeMuted}
        toggleVolume={toggleVolume}
        playerRef={playerRef}
        isMobile={isMobile}
      />
    </>
  )
}
