import { Outlet } from 'react-router'
import { AppHeader } from '../cmps/AppHeader'
import { stationService } from '../services/station/station.service.local'
import { useSelector } from 'react-redux'

export function AppIndex() {
  const detailsSidebarMode = useSelector(
    state => state.systemModule.detailsSidebarMode
  )

  return (
    <>
      <main className="main-content">
        <main className={detailsSidebarMode ? 'open' : ''}>
          {/* <AppHeader /> */}
          <div className="main-section flex flex-column">
            <Outlet />
          </div>
        </main>
      </main>
    </>
  )
}
