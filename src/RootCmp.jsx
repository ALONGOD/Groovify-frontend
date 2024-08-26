import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { StationDetails } from './pages/StationDetails'

import { AppFooter } from './cmps/AppFooter/AppFooter.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { MenuSidebar } from './cmps/MenuSidebar.jsx'
import { DetailsSidebar } from './cmps/DetailsSidebar.jsx'
import { AppIndex } from './pages/AppIndex.jsx'
import { Homepage } from './pages/HomePage.jsx'
import { SearchPage } from './pages/SearchPage.jsx'
import { toggleModal } from './store/actions/station.actions.js'

export function RootCmp() {
    return (
        <div className='app' onClick={toggleModal}>
            <MenuSidebar />
            <UserMsg />

            <Routes>
                <Route path='/' element={<AppIndex />}>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/station/:stationId' element={<StationDetails />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/search/:searchTerm' element={<SearchPage />} />
                </Route>
            </Routes>
            <DetailsSidebar />

            <AppFooter />
        </div>
    )
}
