import { NavLink } from 'react-router-dom'
import { GoHomeFill, GoHome, GoPlus, GoArrowRight, GoX } from 'react-icons/go'
import { FiSearch as FiSearchOutline } from 'react-icons/fi'
import { RiSearchFill } from 'react-icons/ri'
import { IoLibrary, IoLibraryOutline } from 'react-icons/io5'
import { useState } from 'react'

export function MenuSidebar() {
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
                        <span>Home</span>
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
                        <span>Search</span>
                    </>
                )}
            </NavLink>
        </div>
    )

    const LibraryMenu = () => (
        <NavLink
            to='/library'
            className={({ isActive }) => `nav-link flex ${isActive ? 'active' : ''}`}
        >
            {({ isActive }) => (
                <>
                    {isActive ? (
                        <IoLibrary className='icon text-2xl' />
                    ) : (
                        <IoLibraryOutline className='icon text-2xl' />
                    )}
                    <span>Your Library</span>
                    <GoPlus className='ml-auto icon text-2xl' />
                    <GoArrowRight className='icon text-2xl' />
                </>
            )}
        </NavLink>
    )

    const SubMenu = () => {
        const [selected, setSelected] = useState(null)

        const handleSelect = item => {
            setSelected(item)
        }

        const handleDeselect = () => {
            setSelected(null)
        }

        return (
            <div className='sub-menu flex'>
                {selected && (
                    <button className='sub-link clear-selection' onClick={handleDeselect}>
                        X
                    </button>
                )}
                <NavLink
                    to='/playlists'
                    className={({ isActive }) =>
                        `sub-link ${isActive && selected === 'playlists' ? 'active' : ''}`
                    }
                    onClick={() => handleSelect('playlists')}
                >
                    Playlists
                </NavLink>
                <NavLink
                    to='/artists'
                    className={({ isActive }) =>
                        `sub-link ${isActive && selected === 'artists' ? 'active' : ''}`
                    }
                    onClick={() => handleSelect('artists')}
                >
                    Artists
                </NavLink>
            </div>
        )
    }

    return (
        <aside className='menu-sidebar flex flex-column'>
            <MainMenu />
            <LibraryMenu />
            <SubMenu />
        </aside>
    )
}
