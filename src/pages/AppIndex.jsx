import { Outlet } from 'react-router'
import { AppHeader } from '../cmps/AppHeader'
import { DetailsSidebar } from '../cmps/DetailsSidebar'
import { stationService } from '../services/station/station.service.local'

export function AppIndex() {

  return (
    <>
      <AppHeader />
      <DetailsSidebar />
      <div className="main-section flex flex-column">
        <Outlet />
      </div>
    </>
  )
}
