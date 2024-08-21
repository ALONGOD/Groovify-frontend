import { Outlet } from 'react-router'
import { AppHeader } from '../cmps/AppHeader'
import { DetailsSidebar } from '../cmps/DetailsSidebar'
import { stationService } from '../services/station/station.service.local'
import { useSelector } from 'react-redux'

export function AppIndex() {
  const isDetailsOpen = useSelector(state => state.stationModule.isDetailsOpen)

  return (
    <main>
      <AppHeader />
      <DetailsSidebar />
      <div className="main-section flex flex-column">
        <Outlet />
      </div>
    </main>
  )
}
