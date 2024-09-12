import { useEffect, useState } from 'react'
import { MainMenu } from './MainMenu'
import { LibraryMenu } from './LibraryMenu'
import { StationList } from './StationList'
import { userService } from '../services/user/user.service.remote'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER } from '../store/reducers/user.reducer'
import { useNavigate } from 'react-router'

export function MenuSidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)
    console.log('user:', user)
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
            const userToSave = await userService.getLoggedinUser()
            if (!userToSave) navigate('/auth/login')
            // const userToSave = await userService.getById(user._id)
            dispatch({ type: SET_USER, user: userToSave })
        } catch (err) {
            navigate('/auth/login')
            console.log('Cannot set logged in user', err)
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
                <StationList isCollapsed={isCollapsed} stations={likedStations} user={user} type='station-preview'/>
            </div>
        </aside>
    )
}
