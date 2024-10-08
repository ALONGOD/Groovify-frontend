import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer'
import { SongDetails } from './SongDetails'
import { QueueDetails } from './QueueDetails'
import { PartyDetails } from './PartyDetails'

export function DetailsSidebar() {
    const currSong = useSelector(state => state.stationModule.player.currSong)
    const detailsSidebarMode = useSelector(state => state.systemModule.detailsSidebarMode)
    // console.log('detailsSidebarMode:', detailsSidebarMode)
    const dispatch = useDispatch()
    const scrollableRef = useRef(null)
  
    const scrollThreshold = 30
    const [hasShadow, setHasShadow] = useState(false)

    useEffect(() => {
        function handleScroll() {
          console.log('window.scrollY:', window.scrollY)
          if (scrollableRef.current.scrollTop > scrollThreshold) {
            setHasShadow(true)
          } else {
            setHasShadow(false)
          }
        }
        const scrollableDiv = scrollableRef.current
        scrollableDiv.addEventListener('scroll', handleScroll)
        return () => {
          scrollableDiv.removeEventListener('scroll', handleScroll)
        }
      }, [])

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
        <aside className={`details-sidebar relative ${detailsSidebarMode} ${detailsSidebarMode ? 'open' : 'closed'} ${hasShadow ? 'scrolled' : ''}`} ref={scrollableRef}>
           {detailsSidebarMode === 'songDetails' && <SongDetails currSong={currSong} />}
           {detailsSidebarMode === 'queueDetails' && <QueueDetails />}
           {detailsSidebarMode === 'partyDetails' && <PartyDetails />}
        </aside>
    )
}
