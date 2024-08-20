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
        <div className='main-menu'>
            <NavLink to='/' className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {({ isActive }) => (
                    <>
                        {isActive ? <GoHomeFill className='icon' /> : <GoHome className='icon' />}
                        {!isCollapsed && <span>Home</span>}
                    </>
                )}
            </NavLink>
            <NavLink
                to='/search'
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
                {({ isActive }) => (
                    <>
                        {isActive ? (
                            <RiSearchFill className='icon' />
                        ) : (
                            <FiSearchOutline className='icon' />
                        )}
                        {!isCollapsed && <span>Search</span>}
                    </>
                )}
            </NavLink>
        </div>
    )

    const LibraryMenu = () => (
        <>
            <div
                className={`nav-link ${selected === 'library' ? 'active' : ''}`}
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{ cursor: 'pointer' }}
            >
                {selected === 'library' ? (
                    <IoLibrary className='icon' />
                ) : (
                    <IoLibraryOutline className='icon' />
                )}
                {!isCollapsed && <span>Your Library</span>}
                {!isCollapsed && (
                    <>
                        <GoPlus className='ml-auto icon' onClick={e => e.stopPropagation()} />
                        <GoArrowRight className='icon' onClick={e => e.stopPropagation()} />
                    </>
                )}
            </div>
            {!isCollapsed && <SubMenu />}
        </>
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
        </aside>
    )
}
