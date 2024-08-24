import { useState, useEffect } from 'react'
import { AiOutlineSound } from 'react-icons/ai'
import { FaCircleCheck } from 'react-icons/fa6'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_DETAILS_SIDEBAR } from '../store/reducers/system.reducer'
import { MusicPlayer } from './MusicPlayer'

export function AppFooter() {
    const dispatch = useDispatch()
    const [isActive, setIsActive] = useState(false)
    const currSong = useSelector(storeState => storeState.stationModule.currSong)
    const isDetailsOpen = useSelector(storeState => storeState.systemModule.isDetailsOpen)

    function toggleDetailsSidebar() {
        setIsActive(prevState => !prevState)
        dispatch({ type: TOGGLE_DETAILS_SIDEBAR })
    }

    useEffect(() => {
        setIsActive(isDetailsOpen)
    }, [isDetailsOpen])

    return (
        <footer className='app-footer full flex flex-row align-center justify-between'>
            <div className='details flex flex-row align-center'>
                {currSong && (
                    <>
                        <img src={currSong.imgUrl} alt='song-img' />
                        <div className='flex flex-column'>
                            <h3>{currSong.title}</h3>
                            <h4>{currSong.artist}</h4>
                        </div>
                        <FaCircleCheck />
                    </>
                )}
            </div>
            <MusicPlayer />
            {currSong && (
                <div className='other-options flex flex-row align-center'>
                    <IoPlayCircleOutline
                        onClick={toggleDetailsSidebar}
                        style={{ color: isActive ? '#00ba5c' : 'inherit' }}
                    />
                    <HiOutlineQueueList />
                    <AiOutlineSound />
                    <input type='range' name='' className='youtube-player sound' />
                </div>
            )}
        </footer>
    )
}
