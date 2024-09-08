import { useEffect, useRef, useState } from 'react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { FaBackwardStep, FaForwardStep } from 'react-icons/fa6'
import { RiRepeat2Line } from 'react-icons/ri'
import { TiArrowShuffle } from 'react-icons/ti'
import { useSelector, useDispatch } from 'react-redux'
import YouTube from 'react-youtube'
import { MusicPlayerActions } from './MusicPlayerActions'
import {
    SET_CURRENT_SONG,
    SET_PLAYER_CURRENT_SONG,
    SET_PLAYER_IS_PLAYING,
    SET_QUEUE_MODE,
} from '../../store/reducers/station.reducer'
import {
    loadSavedSettings,
    setIsPlaying,
    setShuffleQueue,
    setSongsInQueue,
    addToHistory,
} from '../../store/actions/station.actions'
import { formatTime } from '../../services/util.service'
import { ProgressBar } from './ProgressBar'
import { SyncButton } from '../svgs/SyncButton'
import { ShuffleButton } from '../svgs/ShuffleButton'
import { storageService } from '../../services/async-storage.service'

export function MusicPlayer({ currSong }) {
    const dispatch = useDispatch()
    const songs = useSelector(storeState => storeState.stationModule.songs)
    const queue = useSelector(storeState => storeState.stationModule.queue)
    const player = useSelector(storeState => storeState.stationModule.player)
    const isPlaying = player.isPlaying

    const playerRef = useRef(null)
    const intervalRef = useRef(null)

    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const [volume, setVolume] = useState(50)

    useEffect(() => {
        if (!currSong) loadSavedSettings()
        storageService.save('currentSong', currSong)
        if (player?.currStation) {
            storageService.save('currentStation', player.currStation)
        }
        if (currSong) {
            dispatch(addToHistory(currSong))
        }
    }, [currSong, player.currStation])

    useEffect(() => {
        if (playerRef.current) {
            playerRef?.current?.getPlayerState() === 1 ? setIsPlaying(true) : setIsPlaying(false)
        }
    }, [playerRef, playerRef?.current?.getPlayerState()])

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
            console.log('shuffled', queue.shuffledQueue)

            dispatch({
                type: SET_PLAYER_CURRENT_SONG,
                currSong: queue.shuffledQueue[currSongIdx + value],
            })
        }

        if (!queue.isShuffled) {
            console.log(queue.songsQueue)

            currSongIdx = queue.songsQueue.findIndex(song => song.id === currSong.id)
            if (queue.songsQueue[currSongIdx + value] === undefined) return
            dispatch({
                type: SET_PLAYER_CURRENT_SONG,
                currSong: queue.songsQueue[currSongIdx + value],
            })
        }
    }

    function setQueueIsShuffled(state) {
        if (state === queue.isShuffled) return dispatch({ type: SET_QUEUE_MODE, mode: '' })
        dispatch({ type: SET_QUEUE_MODE, mode: state })
    }

    // function playAudio() {
    //   playerRef?.current?.playVideo()
    //   setIsPlaying(true)
    // }

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
    }
    const isVolumeMuted = playerRef?.current?.isMuted() || volume === 0

    function toggleVolume() {
        isVolumeMuted ? playerRef.current.unMute() : playerRef.current.mute()
    }

    return (
        <>
            <div className='player flex flex-column justify-center align-center'>
                <div className='top flex flex-row align-center'>
                    <ShuffleButton setQueueIsShuffled={setQueueIsShuffled} queue={queue} />
                    <div className='song-actions flex flex-row align-center'>
                        <FaBackwardStep onClick={() => playNextOrPrev(-1)} />
                        <div onClick={toggleSoundPlay} className='play-pause'>
                            {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
                        </div>
                        <FaForwardStep onClick={() => playNextOrPrev(1)} />
                    </div>
                    <SyncButton setQueueIsShuffled={setQueueIsShuffled} queue={queue} />
                </div>

                <div className='bottom flex flex-row align-center'>
                    <YouTube
                        className='hidden'
                        videoId={currSong?.id}
                        opts={opts}
                        onReady={onPlayerReady}
                        onEnd={() => playNextOrPrev(1)}
                    />
                    <div className='music-player-container flex flex-row align-center'>
                        <p className='music-current-time'>
                            {currentTime ? formatTime(currentTime) : '0:00'}
                        </p>

                        <ProgressBar
                            currProgress={currentTime}
                            maxProgress={duration}
                            handleProgressClick={handleProgressClick}
                            type='video-progress'
                            playerRef={playerRef}
                            setCurrent={setCurrentTime}
                        />
                        <p className='music-total-length'>
                            {duration ? formatTime(duration) : '0:00'}
                        </p>
                    </div>
                </div>
            </div>
            {currSong && (
                <MusicPlayerActions
                    volume={volume}
                    setVolume={setVolume}
                    handleVolumeChange={handleVolumeChange}
                    isVolumeMuted={isVolumeMuted}
                    toggleVolume={toggleVolume}
                    playerRef={playerRef}
                />
            )}
        </>
    )
}
