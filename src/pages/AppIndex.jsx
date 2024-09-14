import { Outlet } from 'react-router'
import { AppHeader } from '../cmps/AppHeader'
import { stationService } from '../services/station/station.service.local'
import { useSelector } from 'react-redux'
import { Loader } from '../cmps/Loader'

export function AppIndex() {
  const detailsSidebarMode = useSelector(
    state => state.systemModule.detailsSidebarMode
  )
  const isLoading = useSelector(state => state.systemModule.isLoading)

  return (
    <>
      <main className="main-content">
        {isLoading &&
         <Loader />
          }
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
