import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { StationDetails } from './pages/StationDetails'

import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { MenuSidebar } from './cmps/MenuSidebar.jsx'
import { AppIndex } from './pages/AppIndex.jsx'
import { Homepage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'

export function RootCmp() {
  return (
    <div className="app">
      <MenuSidebar />
      <UserMsg />
      <main>
        <Routes>
          <Route path="/" element={<AppIndex />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/station/:stationId" element={<StationDetails />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
