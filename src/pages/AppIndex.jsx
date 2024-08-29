import { Outlet } from 'react-router'
import { AppHeader } from '../cmps/AppHeader'
import { stationService } from '../services/station/station.service.local'
import { useSelector } from 'react-redux'

export function AppIndex() {
  const isDetailsOpen = useSelector(state => state.systemModule.isDetailsOpen)

  return (
    <main className={isDetailsOpen ? 'open' : ''}>
      {/* <AppHeader /> */}
      <div className="main-section flex flex-column">
        <Outlet />
      </div>
    </main>
  )
}
