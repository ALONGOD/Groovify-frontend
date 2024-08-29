import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer'
import { SongDetails } from './SongDetails'
import { QueueDetails } from './QueueDetails'

export function DetailsSidebar() {
    const currSong = useSelector(state => state.stationModule.currSong)
    const isDetailsOpen = useSelector(state => state.systemModule.isDetailsOpen)
    // console.log('isDetailsOpen:', isDetailsOpen)
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
        <aside className={`details-sidebar ${isDetailsOpen} ${isDetailsOpen ? 'open' : 'closed'}`}>
           {isDetailsOpen === 'songDetails' && <SongDetails currSong={currSong} />}
           {isDetailsOpen === 'queueDetails' && <QueueDetails />}
        </aside>
    )
}
