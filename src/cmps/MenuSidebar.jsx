import { useEffect, useState } from 'react'
import { MainMenu } from './MainMenu'
import { LibraryMenu } from './LibraryMenu'
import { StationList } from './StationList'
import { userService } from '../services/user/user.service.remote'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER } from '../store/reducers/user.reducer'

export function MenuSidebar() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isBelowThreshold, setIsBelowThreshold] = useState(false)
    const [selected, setSelected] = useState(null)
    const [likedStations, setLikedStations] = useState([]);
    

    useEffect(() => {
        getUser()
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        getUser()
      }, [])

      useEffect(() => {
        if (user?.likedStations) setLikedStations([user?.likedSongsStation, ...user?.likedStations])

      }, [user])
      

    async function getUser() {
        try {
            const userToSave = await userService.getById('66dc87a4bcda36a278e45615')
            dispatch({ type: SET_USER, user: userToSave })
        } catch (err) {
            console.log('Cannot set logged in user', err)
            throw err
        }
    }

    function handleResize() {
        if (window.innerWidth < 1100) {
            setIsCollapsed(true)
            setIsBelowThreshold(true)
        } else {
            setIsBelowThreshold(false)
        }
    }

    return (
        <aside className={`menu-sidebar flex flex-column ${isCollapsed ? 'collapsed' : ''}`}>
            <div className='library-menu flex flex-column'>
                <div className='library-icon flex flex-column'>
                    <LibraryMenu
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        selected={selected}
                        setSelected={setSelected}
                        isBelowThreshold={isBelowThreshold}
                    />
                </div>
                <StationList isCollapsed={isCollapsed} user={user} stations={likedStations}/>
            </div>
        </aside>
    )
}
