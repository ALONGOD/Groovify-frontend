import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { SET_USER } from '../../store/reducers/user.reducer'
import { userService } from '../../services/user/user.service.remote'
import { socketService } from '../../services/socket.service'
import { LibraryMenuFix } from './LibraryMenuFix'
import { SubMenu } from '../SubMenu'
import { StationList } from '../StationList'
import { StationPreview } from '../StationPreview'
import { SearchBar } from '../SearchBar'
import { showErrorMsg } from '../../services/event-bus.service'
import { updateUser } from '../../store/actions/backend.user'

export function MenuSidebarFix({stationIdParams}) {
  const params = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.userModule.user)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isBelowThreshold, setIsBelowThreshold] = useState(false)
  const [selected, setSelected] = useState(null)
  const [filteredStations, setFilteredStations] = useState(
    user?.likedStations || []
  )
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getUser()
    // if (!user) navigate('/auth/login')
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (searchTerm) {
      try {
        const regex = new RegExp(searchTerm, 'i')
        const filtered = user?.likedStations.filter(station =>
          regex.test(station.name)
        )
        setFilteredStations(filtered)
      } catch (err) {
        console.error('Invalid regular expression:', err)
      }
    } else {
      setFilteredStations(user?.likedStations)
    }
  }, [searchTerm, user?.likedStations])

  async function getUser() {
    try {
      const userToSave = await userService.getLoggedinUser()
      if (!userToSave) navigate('/auth/login')
      dispatch({ type: SET_USER, user: userToSave })
      socketService.login({ id: userToSave._id, fullname: userToSave.fullname })
    } catch (err) {
      navigate('/auth/login')
      console.log('Cannot set logged in user', err)
    }
  }

  async function getUser() {
    try {
      const userToSave = await userService.getLoggedinUser()
      if (!userToSave) navigate('/auth/login')
      // const userToSave = await userService.getById(user._id)
      dispatch({ type: SET_USER, user: userToSave })
      socketService.login({ id: userToSave._id, fullname: userToSave.fullname })
    } catch (err) {
      navigate('/auth/login')
      console.log('Cannot set logged in user', err)
    }
  }

  function handleResize() {
    if (window.innerWidth < 1100) {
      setIsCollapsed(true)
      setIsBelowThreshold(true)
    } else {
      setIsBelowThreshold(false)
    }

  }

  async function moveStation(fromIndex, toIndex) {
    try {
      const updatedStations = [...user?.likedStations]
      if (fromIndex === toIndex) return
      const [movedStation] = updatedStations.splice(fromIndex, 1)
      updatedStations.splice(toIndex, 0, movedStation)
      dispatch({
        type: SET_USER,
        user: { ...user, likedStations: updatedStations },
      })
      await updateUser({ ...user, likedStations: updatedStations })
    } catch (err) {
      console.log('Cannot move station', err)
      dispatch({
        type: SET_USER,
        user: { ...user, likedStations: [...user.likedStations] },
      })
      showErrorMsg('Failed to move Station')
    }
  }


  function onSearch(value) {
    setSearchTerm(value)
  }

  return (
    <aside
      className={`menu-sidebar flex flex-column ${
        isCollapsed ? 'collapsed' : ''
      }`}
    >
      <LibraryMenuFix
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        selected={selected}
        setSelected={setSelected}
        isBelowThreshold={isBelowThreshold}
      />
      <SubMenu selected={selected} setSelected={setSelected} />
      <div className="station-list">
        <div className={`search-bar-container ${isCollapsed ? 'hidden' : ''}`}>
          <SearchBar
            searchType={'station'}
            placeholder={'Search in Playlists'}
            onSearch={onSearch} // Pass the onSearch function
          />
        </div>
        <StationPreview
          station={user?.likedSongsStation}
          type="station-preview"
          isCollapsed={isCollapsed}
          stationIdParams={stationIdParams}
          />
        <StationList
          isCollapsed={isCollapsed}
          stations={filteredStations}
          type="station-preview"
          moveStation={moveStation}
          stationIdParams={stationIdParams}
        />
      </div>
    </aside>
  )
}
