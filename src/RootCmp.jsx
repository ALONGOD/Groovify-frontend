import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { StationIndex } from './pages/StationIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { StationDetails } from './pages/StationDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'


export function RootCmp() {
  return (
    <div className="app">
      <MenuSidebar />
      <DetailsSidebar />
      <UserMsg />

      <main>
        <AppHeader />
        <Routes>
          <Route path="/" element={<AppIndex />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/liked" element={<LikedSongsStation />} />
            <Route path="/station/:id" element={<StationList />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
