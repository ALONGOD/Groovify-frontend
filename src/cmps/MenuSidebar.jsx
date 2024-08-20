import { NavLink } from 'react-router-dom'
import { GoHomeFill, GoHome, GoPlus, GoArrowRight } from 'react-icons/go'
import { FiSearch as FiSearchOutline } from 'react-icons/fi'
import { RiSearchFill } from 'react-icons/ri'
import { IoLibrary, IoLibraryOutline } from 'react-icons/io5'
import { useState } from 'react'

export function MenuSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState(null)

    const MainMenu = () => (
        <div className='main-menu flex flex-column'>
            <NavLink
                to='/'
                className={({ isActive }) => `nav-link flex ${isActive ? 'active' : ''}`}
            >
                {({ isActive }) => (
                    <>
                        {isActive ? (
                            <GoHomeFill className='icon text-2xl' />
                        ) : (
                            <GoHome className='icon text-2xl' />
                        )}
                        {!isCollapsed && <span>Home</span>}
                    </>
                )}
            </NavLink>

            <NavLink
                to='/search'
                className={({ isActive }) => `nav-link flex ${isActive ? 'active' : ''}`}
            >
                {({ isActive }) => (
                    <>
                        {isActive ? (
                            <RiSearchFill className='icon text-2xl' />
                        ) : (
                            <FiSearchOutline className='icon text-2xl' />
                        )}
                        {!isCollapsed && <span>Search</span>}
                    </>
                )}
            </NavLink>
        </div>
    )

    const LibraryMenu = () => (
        <div
            className={`nav-link flex ${selected === 'library' ? 'active' : ''}`}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ cursor: 'pointer' }}
            as
            a
            fallback
        >
            <>
                {selected === 'library' ? (
                    <IoLibrary className='icon text-2xl' />
                ) : (
                    <IoLibraryOutline className='icon text-2xl' />
                )}
                {!isCollapsed && <span>Your Library</span>}
                {!isCollapsed && (
                    <>
                        <GoPlus
                            className='ml-auto icon text-2xl'
                            style={{ cursor: 'pointer' }}
                            onClick={e => {
                                e.stopPropagation()
                            }}
                        />
                        <GoArrowRight
                            className='icon text-2xl'
                            style={{ cursor: 'pointer' }}
                            onClick={e => {
                                e.stopPropagation()
                            }}
                        />
                    </>
                )}
            </>
        </div>
    )

    const SubMenu = () => {
        const handleSelect = item => {
            setSelected(item)
        }

        const handleDeselect = () => {
            setSelected(null)
        }

        return (
            <div className='sub-menu flex'>
                {selected && (
                    <button
                        className='sub-link clear-selection'
                        onClick={handleDeselect}
                        style={{ cursor: 'pointer' }}
                    >
                        X
                    </button>
                )}
                <div
                    className={`sub-link ${selected === 'playlists' ? 'active' : ''}`}
                    onClick={() => handleSelect('playlists')}
                    style={{ cursor: 'pointer' }}
                >
                    Playlists
                </div>
                <div
                    className={`sub-link ${selected === 'artists' ? 'active' : ''}`}
                    onClick={() => handleSelect('artists')}
                    style={{ cursor: 'pointer' }}
                >
                    Artists
                </div>
            </div>
        )
    }

    return (
        <aside className={`menu-sidebar flex flex-column ${isCollapsed ? 'collapsed' : ''}`}>
            <MainMenu />
            <LibraryMenu />
            {!isCollapsed && <SubMenu />}
        </aside>
    )
}
