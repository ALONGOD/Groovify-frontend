import { useState } from 'react'
import { AiOutlineSound } from 'react-icons/ai'
import { FaPauseCircle } from 'react-icons/fa'
import { FaBackwardStep, FaCircleCheck, FaForwardStep } from 'react-icons/fa6'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { RiRepeat2Line } from 'react-icons/ri'
import { TiArrowShuffle } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_DETAILS_SIDEBAR } from '../store/reducers/system.reducer'
import { MusicPlayer } from './MusicPlayer'

export function AppFooter() {
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)

    const currSong = useSelector(storeState => storeState.stationModule.currSong)
    console.log('songPlaying:', currSong)

    function toggleDetailsSidebar() {
        setIsActive(prevState => !prevState)
        dispatch({ type: TOGGLE_DETAILS_SIDEBAR })
    }

    return (
        <footer className='app-footer relative full flex flex-row align-center justify-between'>
            <div className='details flex flex-row align-center'>
                <img
                    src={
                        currSong
                            ? currSong.imgUrl
                            : 'https://i.ytimg.com/vi/WwSRA2p4He0/mqdefault.jpg'
                    }
                    alt='song-img'
                />
                <div className='flex flex-column'>
                    <h3>
                        {currSong
                            ? currSong.title
                            : 'Feel the Fiyaaah (with A$AP Rocky & feat. Takeoff)'}
                    </h3>
                    <h4>{currSong ? currSong.artist : 'Metro Boomin, A$AP Rocky, Takeoff'}</h4>
                </div>
                <FaCircleCheck />
            </div>
            <MusicPlayer />
            <div className='other-options flex flex-row align-center'>
                <IoPlayCircleOutline
                    onClick={toggleDetailsSidebar}
                    style={{ color: isActive ? '#00ba5c' : 'inherit' }}
                />
                <HiOutlineQueueList />
                <AiOutlineSound />
                <input type='range' name='' className='youtube-player sound' />
            </div>
        </footer>
    )
}
