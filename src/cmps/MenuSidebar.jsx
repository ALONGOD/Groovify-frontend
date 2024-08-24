import { useEffect, useState } from 'react'
import { MainMenu } from './MainMenu'
import { LibraryMenu } from './LibraryMenu'
import { StationList } from './StationList'
import { userService } from '../services/user/user.service.local'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER } from '../store/reducers/user.reducer'

export function MenuSidebar() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)
    console.log('user:', user)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isBelowThreshold, setIsBelowThreshold] = useState(false)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        getUser()
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    async function getUser() {
        const user = await userService.getLoggedinUser()
        dispatch({ type: SET_USER, user })
    }

    function handleResize() {
        if (window.innerWidth < 768) {
            setIsCollapsed(true)
            setIsBelowThreshold(true)
        } else {
            setIsCollapsed(false)
            setIsBelowThreshold(false)
        }
    }

    return (
        <aside className={`menu-sidebar flex flex-column ${isCollapsed ? 'collapsed' : ''}`}>
            <div className='navigation'>
                <MainMenu isCollapsed={isCollapsed} />
            </div>
            <div className='library-menu flex flex-column'>
                <LibraryMenu
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    selected={selected}
                    setSelected={setSelected}
                    isBelowThreshold={isBelowThreshold}
                />
                <StationList isCollapsed={isCollapsed} />
            </div>
        </aside>
    )
}
