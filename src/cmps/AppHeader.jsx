import { useLocation, useNavigate } from 'react-router'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaRegBell } from 'react-icons/fa'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js'
import { useState, useCallback } from 'react';
import { SearchBar } from './SearchBar.jsx'


export function AppHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const isSearchPage = location.pathname.includes('/search')
  const isStationDetailsPage = false
  // location.pathname.includes('/station')

  function navigation(direction) {
    navigate(direction)
  }

  return (
    <header className="app-header flex flex-row justify-between align-center">
      <div className="left flex flex-row align-center">
        <div className="action-nav-btns flex flex-row">
          <div className="react-icon" >
            <IoIosArrowBack title='Go back' onClick={() => navigation(-1)} />
          </div>
          <div className="react-icon" >
            <IoIosArrowForward title='Go forward' onClick={() => navigation(1)} />
          </div>
        </div>
        {(isSearchPage || isStationDetailsPage) && (
          <div className='search-bar'>
            <SearchBar searchType={'youtube'} />
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
