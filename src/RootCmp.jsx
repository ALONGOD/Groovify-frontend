// src/RootCmp.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { StationDetails } from './pages/StationDetails'
import { AppFooter } from './cmps/AppFooter/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { MenuSidebar } from './cmps/MenuSidebar/MenuSidebar.jsx'
import { DetailsSidebar } from './cmps/DetailsSidebar/DetailsSidebar.jsx'
import { AppIndex } from './pages/AppIndex.jsx'
import { Homepage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { toggleModal } from './store/actions/station.actions.js'
import { AppHeader } from './cmps/AppHeader'
import { AuthPage } from './pages/AuthPage.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { ArtistDetails } from './pages/ArtistDetails.jsx'
import { MenuSidebarFix } from './cmps/MenuSidebar/MenuSidebarFix.jsx'
import { DynamicNavbar } from './cmps/MenuSidebar/DynamicNavbar.jsx'
import { useSelector } from 'react-redux'

export function RootCmp() {
  const isMobile = useSelector(state => state.systemModule.isMobile)
  return (
    <div className={`app ${isMobile ? 'mobile' : ''}`} onClick={toggleModal}>
      {!isMobile && <AppHeader />}
      <div className={'content-wrapper'}>
        {/* <MenuSidebarFix /> */}
        <DynamicNavbar />

        <Routes>
          <Route path="/auth/:authType" element={<AuthPage />} />
          <Route path="/" element={<AppIndex />}>
            <Route path="/profile/:userId" element={<UserDetails />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/station/:stationId" element={<StationDetails />} />
            <Route path="/artist/:artistId" element={<ArtistDetails />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:searchTerm" element={<SearchPage />} />
          </Route>
        </Routes>

        <DetailsSidebar />
      </div>
      <AppFooter />
      <UserMsg />
    </div>
  )
}
