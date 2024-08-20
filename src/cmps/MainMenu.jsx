import { NavLink } from 'react-router-dom'
import { GoHomeFill, GoHome } from 'react-icons/go'
import { FiSearch as FiSearchOutline } from 'react-icons/fi'
import { RiSearchFill } from 'react-icons/ri'

export function MainMenu({ isCollapsed }) {
    return (
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
}
