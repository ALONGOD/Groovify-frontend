import { Outlet, useParams } from 'react-router'
import { AppHeader } from '../cmps/AppHeader'
import { stationService } from '../services/station/station.service.local'
import { useSelector } from 'react-redux'
import { Loader } from '../cmps/Loader'
import { DynamicNavbar } from '../cmps/MenuSidebar/DynamicNavbar'

export function AppIndex() {
  const params = useParams()

  const detailsSidebarMode = useSelector(
    (state) => state.systemModule.detailsSidebarMode
  )
  const isLoading = useSelector((state) => state.systemModule.isLoading)

  return (
    <>
      <DynamicNavbar stationIdParams={params?.stationId}/>
      <main className="main-content">
        {isLoading && <Loader />}
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
