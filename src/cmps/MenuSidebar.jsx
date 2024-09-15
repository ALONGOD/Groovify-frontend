import { useEffect, useState } from 'react'
import { MainMenu } from './MainMenu'
import { LibraryMenu } from './LibraryMenu'
import { StationList } from './StationList'
import { userService } from '../services/user/user.service.remote'
import { useDispatch, useSelector } from 'react-redux'
import { SET_USER } from '../store/reducers/user.reducer'
import { useNavigate } from 'react-router'
import io from 'socket.io-client'
import { socketService } from '../services/socket.service'
import { SearchBar } from './SearchBar'
const socket = io.connect('http://localhost:3030')

export function MenuSidebar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.userModule.user)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isBelowThreshold, setIsBelowThreshold] = useState(false)
  const [selected, setSelected] = useState(null)
  const [likedStations, setLikedStations] = useState([])
  const [filteredStations, setFilteredStations] = useState([])
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    getUser()
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (user?.likedStations) {
      const stations = [user?.likedSongsStation, ...user?.likedStations]
      setLikedStations(stations)
      setFilteredStations(stations)
    }
  }, [user])

  useEffect(() => {
    console.log(searchTerm)
    if (searchTerm && searchTerm !== '') {
      try {
        const regex = new RegExp(searchTerm, 'i') // 'i' flag makes it case-insensitive
        const filtered = likedStations.filter(station =>
          regex.test(station.name)
        )
        setFilteredStations(filtered)
      } catch (err) {
        console.error('Invalid regular expression:', err)
      }
    } else {
      setFilteredStations(likedStations)
    }
  }, [searchTerm, likedStations])


  async function getUser() {
    try {
      const userToSave = await userService.getLoggedinUser()
      console.log('userToSave:', userToSave)
      if (!userToSave) navigate('/auth/login')
      // const userToSave = await userService.getById(user._id)
      dispatch({ type: SET_USER, user: userToSave })
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

  function moveStation(fromIndex, toIndex) {
    //   console.log('fromIndex:', fromIndex)
    //   console.log('toIndex:', toIndex)
    //       const updatedStations = [...likedStations]
    //       if (fromIndex === toIndex) return
    //       if (fromIndex === 0 || toIndex === 0) return
    //         const [movedStation] = updatedStations.splice(fromIndex, 1)
    //         updatedStations.splice(toIndex, 0, movedStation)
    //         setLikedStations(updatedStations)
  }

  return (
    <aside
      className={`menu-sidebar flex flex-column ${isCollapsed ? 'collapsed' : ''
        }`}
    >
      <div className="library-menu flex flex-column">
        <div className="library-icon flex flex-column">
          <LibraryMenu
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            selected={selected}
            setSelected={setSelected}
            isBelowThreshold={isBelowThreshold}
          />

        </div>
        {filteredStations.length > 0 ? (
          <StationList
            isCollapsed={isCollapsed}
            stations={filteredStations}
            type="station-preview"
            moveStation={moveStation}
            onSearch={setSearchTerm}
          />
        ) : (
          <>
            <div className='station-list'>
              <div className="search-bar-container">
                <SearchBar
                  searchType={'station'}
                  placeholder={searchTerm}
                  onSearch={setSearchTerm}
                />
              </div>
            </div>
            <p>No stations found</p>
          </>
        )}
      </div>
    </aside>
  )
}