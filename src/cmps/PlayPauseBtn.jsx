import { IoIosPause, IoIosPlay } from "react-icons/io";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { SET_PLAYER_CURRENT_SONG, SET_PLAYER_IS_PLAYING } from "../store/reducers/station.reducer";

export function PlayPauseBtn({ song, type }) {
    const dispatch = useDispatch()
    const isPlaying = useSelector(state => state.stationModule.player.isPlaying)
    const currSong = useSelector(state => state.stationModule.player.currSong)
    const isSongPlaying = (currSong?.id === song?.id) && isPlaying

    function playOrPauseSong() {
        dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: song })
        dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: !isPlaying })
    }

    if (type === 'top-result') {
        return (
            <div className={`play-pause-container ${type}`} onClick={playOrPauseSong}>
                {isSongPlaying ? <IoIosPause /> : <IoIosPlay />}
            </div>
        )
    }
    return (
        <>
            {isSongPlaying ? <IoIosPause /> : <IoIosPlay />}
        </>
    )
}