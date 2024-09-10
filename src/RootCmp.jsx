// src/RootCmp.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { StationDetails } from './pages/StationDetails'
import { AppFooter } from './cmps/AppFooter/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { MenuSidebar } from './cmps/MenuSidebar.jsx'
import { DetailsSidebar } from './cmps/DetailsSidebar/DetailsSidebar.jsx'
import { AppIndex } from './pages/AppIndex.jsx'
import { Homepage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { toggleModal } from './store/actions/station.actions.js'
import { AppHeader } from './cmps/AppHeader'
import { AuthPage } from './pages/AuthPage.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { ArtistDetails } from './pages/ArtistDetails.jsx'

export function RootCmp() {
  return (
    <div className="app" onClick={toggleModal}>
      <AppHeader />
      <div className="content-wrapper">
        <MenuSidebar />

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
