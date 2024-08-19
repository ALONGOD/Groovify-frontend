import React from 'react'
import { Routes, Route, Router } from 'react-router'

import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { CarIndex } from './pages/CarIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { CarDetails } from './pages/CarDetails'
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

export function RootCmp() {
  return (
    <Router>
      <div className="app">
        <MenuSidebar />
        <DetailsSidebar />
        <UserMsg />

        <main>
          <Routes>
            <AppHeader />
            <Route path="/" element={<AppIndex />}>
              <Route path="/home" element={<Homepage />} />
              <Route path="/station/:id" element={<StationDetails />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  )
}
