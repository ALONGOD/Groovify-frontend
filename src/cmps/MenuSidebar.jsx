import { NavLink } from 'react-router-dom'
import { GoHomeFill, GoHome, GoPlus, GoArrowRight } from 'react-icons/go'
import { FiSearchOutline } from 'react-icons/fi'
import { RiSearchFill } from 'react-icons/ri'
import { IoLibrary, IoLibraryOutline } from 'react-icons/io5'

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

    const SubMenu = () => (
        <div className='sub-menu flex'>
            <NavLink
                to='/playlists'
                className={({ isActive }) => `sub-link ${isActive ? 'active' : ''}`}
            >
                Playlists
            </NavLink>
            <NavLink
                to='/artists'
                className={({ isActive }) => `sub-link ${isActive ? 'active' : ''}`}
            >
                Artists
            </NavLink>
        </div>
    )

    return (
        <aside className='menu-sidebar flex flex-column'>
            <MainMenu />
            <LibraryMenu />
            <SubMenu />
        </aside>
    )
}
