import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch } from 'react-icons/fa'

export function MenuSidebar() {
    return (
        <aside className='menu-sidebar flex flex-column'>
            <NavLink to='/' activeClassName='active' className='nav-link flex'>
                <FaHome className='icon mr-4 text-2xl' />
                <span>Home</span>
            </NavLink>

            <NavLink to='/search' activeClassName='active' className='nav-link flex'>
                <FaSearch className='icon mr-4 text-2xl' />
                <span>Search</span>
            </NavLink>
        </aside>
    )
}
