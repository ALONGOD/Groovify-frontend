import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DetailsSidebarClose } from './DetailsSidebarClose'
import { TOGGLE_DETAILS_SIDEBAR } from '../store/reducers/system.reducer'
import { LikeSongBtn } from './LikeSongBtn'

export function DetailsSidebar() {
    const currSong = useSelector(state => state.stationModule.currSong)
    const isDetailsOpen = useSelector(state => state.systemModule.isDetailsOpen)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900 && isDetailsOpen) {
                dispatch({ type: TOGGLE_DETAILS_SIDEBAR })
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [dispatch, isDetailsOpen])

    return (
        <aside className={`details-sidebar ${isDetailsOpen ? 'open' : 'closed'}`}>
            <header className='details-header'>
                <h3>{currSong ? currSong.artist : 'Metro Boomin, A$AP Rocky, Takeoff'}</h3>
                <div className='header-actions'>
                    <button className='more-options'>•••</button>
                    <DetailsSidebarClose />
                </div>
            </header>
            <div className='details-image'>
                <img
                    src={currSong?.imgUrl || 'https://i.ytimg.com/vi/WwSRA2p4He0/mqdefault.jpg'}
                    alt='Album Art'
                />
            </div>
            <div className='details-song-info'>
                <div className='song-and-band'>
                    <h2>
                        {currSong
                            ? currSong.title
                            : 'Feel the Fiyaaah (with A$AP Rocky & feat. Takeoff)'}
                    </h2>
                    <h4>{currSong ? currSong.artist : 'Metro Boomin, A$AP Rocky, Takeoff'}</h4>
                </div>
                <LikeSongBtn song={currSong} />
            </div>
        </aside>
    )
}
