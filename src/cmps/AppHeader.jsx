import { Link, NavLink, useSearchParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaRegBell } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useState } from 'react'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.user)
  const location = useLocation()
  const isSearchPage = location.pathname.includes('/search')

  

  return (
    <header className="app-header flex flex-row justify-between align-center">
      <div className="left flex flex-row align-center">
        <div className="action-nav-btns flex flex-row">
          <div className="react-icon" >
            <IoIosArrowBack title='Go back'/>
          </div>
          <div className="react-icon" >
            <IoIosArrowForward title='Go forward'/>
          </div>
        </div>
        {isSearchPage && (
          <div className='search-bar'>
            <FaMagnifyingGlass/>
            <input
              type="text"
              name="search"
              placeholder="What do you want to play?"
            />
          </div>
        )}
      </div>
      <div className="right flex flex-row align-center">
        <div className="react-icon">
          <FaRegBell />
        </div>
        <img
          src="https://i.scdn.co/image/ab67757000003b8212291183e9c0be882978f504"
          className="rounded-full"
          alt="profile picture"
        />
      </div>
    </header>
  )
}
