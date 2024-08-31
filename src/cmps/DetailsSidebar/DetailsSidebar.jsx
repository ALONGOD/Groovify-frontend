import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer'
import { SongDetails } from './SongDetails'
import { QueueDetails } from './QueueDetails'

export function DetailsSidebar() {
    const currSong = useSelector(state => state.stationModule.player.currSong)
    const detailsSidebarMode = useSelector(state => state.systemModule.detailsSidebarMode)
    // console.log('detailsSidebarMode:', detailsSidebarMode)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900 && detailsSidebarMode) {
                dispatch({ type: TOGGLE_DETAILS_SIDEBAR })
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [dispatch, detailsSidebarMode])

    return (
        <aside className={`details-sidebar ${detailsSidebarMode} ${detailsSidebarMode ? 'open' : 'closed'}`}>
           {detailsSidebarMode === 'songDetails' && <SongDetails currSong={currSong} />}
           {detailsSidebarMode === 'queueDetails' && <QueueDetails />}
        </aside>
    )
}
