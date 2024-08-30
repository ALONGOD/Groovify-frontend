import { useLocation, useNavigate } from 'react-router'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaRegBell, FaSpotify } from 'react-icons/fa'
import { GoHomeFill, GoHome } from 'react-icons/go'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useState, useCallback } from 'react'
import { SearchBar } from './SearchBar.jsx'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
    const navigate = useNavigate()
    const location = useLocation()
    const isSearchPage = location.pathname.includes('/search')
    const isStationDetailsPage = location.pathname.includes('/station')

    function navigation(direction) {
        navigate(direction)
    }

    return (
        <header className='app-header flex flex-row justify-between align-center'>
            {/* Left Div: Spotify Icon, Back, and Forward Buttons */}
            <div className='left flex flex-row align-center'>
                <NavLink to='/'>
                    <FaSpotify size={30} color='white' />
                </NavLink>

                <div className='action-nav-btns flex flex-row'>
                    <div className='react-icon'>
                        <IoIosArrowBack title='Go back' onClick={() => navigation(-1)} />
                    </div>

                    <div className='react-icon'>
                        <IoIosArrowForward title='Go forward' onClick={() => navigation(1)} />
                    </div>
                </div>
            </div>

            {/* Middle Div: Home Button and Search Bar */}
            <div className='middle flex flex-row align-center'>
                <NavLink to='/' className='home-button'>
                    {({ isActive }) => <>{isActive ? <GoHomeFill /> : <GoHome />}</>}
                </NavLink>

                <NavLink to='/search' className='search-bar'>
                    <SearchBar searchType={'youtube'} />
                </NavLink>
            </div>

            {/* Right Div: Bell Icon and Profile Image */}
            <div className='right flex flex-row align-center'>
                <div className='react-icon'>
                    <FaRegBell />
                </div>
                <img
                    src='https://i.scdn.co/image/ab67757000003b8212291183e9c0be882978f504'
                    className='rounded-full'
                    alt='profile picture'
                />
            </div>
        </header>
    )
}
