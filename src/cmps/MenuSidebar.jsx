import { NavLink } from 'react-router-dom'
import { VscLibrary } from 'react-icons/vsc'
import { GoHomeFill, GoPlus, GoArrowRight } from 'react-icons/go'
import { FiSearch } from 'react-icons/fi'

export function MenuSidebar() {
    const MainMenu = () => (
        <div className='main-menu flex flex-column'>
            <NavLink
                to='/'
                className={({ isActive }) => `nav-link flex ${isActive ? 'active' : ''}`}
            >
                <GoHomeFill className='icon text-2xl' />
                <span>Home</span>
            </NavLink>

            <NavLink
                to='/search'
                className={({ isActive }) => `nav-link flex ${isActive ? 'active' : ''}`}
            >
                <FiSearch className='icon text-2xl' />
                <span>Search</span>
            </NavLink>
        </div>
    )

    const LibraryMenu = () => (
        <div className='library-menu nav-link flex'>
            <VscLibrary className='icon text-2xl' />
            <span>Your Library</span>
            <GoPlus className='ml-auto icon text-2xl' />
            <GoArrowRight className='icon text-2xl' />
        </div>
    )

    return (
        <aside className='menu-sidebar flex flex-column'>
            <MainMenu />
            <LibraryMenu />
        </aside>
    )
}
