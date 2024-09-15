import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ImagePick } from '../cmps/ImagePick'
import { FastAverageColor } from 'fast-average-color'
import { adjustBrightnessAndSaturation } from '../services/util.service'
import { userService } from '../services/user/user.service.remote'
import { stationService } from '../services/station/station.service.remote'
import { StationList } from '../cmps/StationList'
import { useNavigate, useParams } from 'react-router'
import { getUserById } from '../store/actions/backend.user'
import { showErrorMsg, showUserMsg } from '../services/event-bus.service'
import { LOADING_DONE, LOADING_START } from '../store/reducers/system.reducer'

export function UserDetails() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const params = useParams()
  const fac = new FastAverageColor()
  // const user = useSelector(state => state.userModule.user)
  const [user, setUser] = useState(null)
  const likedStations = user?.likedStations?.filter(
    station => station?.creator?.id !== user?._id
  )
  
  const [stationsByUser, setStationsByUser] = useState([])
  const [gradient, setGradient] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [params])

  
  useEffect(() => {
    fetchStationsByUser()
    fac.getColorAsync(user?.imgUrl).then(color => {
      const color1 = adjustBrightnessAndSaturation(color.hex, 0.5, 1.8)
      const color2 = '#121212'
      setGradient({
        background: `linear-gradient(to bottom, ${color1} 10%, ${color2} 100%)`,
      })
    })
  }, [user])

  async function fetchUser() {
    try {
      dispatch({ type: LOADING_START})
      console.log(params);
      
      const userToSave = await getUserById(params?.userId)
      setUser(userToSave)
    } catch (err) {
      showErrorMsg('Cannot get user')
      navigate(-1)
    } finally {
      dispatch({ type: LOADING_DONE})
    }
  }
  
  async function fetchStationsByUser() {
    const stations = user.likedStations.filter(station => station?.creator?.id === user?._id)
    setStationsByUser(stations)
  }

  async function setUserImg(imgUrl) {
    try {
      let userToSave = { ...user, imgUrl }
      await userService.update(userToSave)
      dispatch({ type: 'SET_USER', user: userToSave })
      userService.saveLoggedinUser(userToSave)
    } catch (err) {
      console.log('Cannot update user', err)
    }
  }

  function onToggleModal() {
    setModalOpen(!isModalOpen)
  }

  return (
    <section className="user-details relative">
      <div className="gradient" style={gradient}></div>
      <header className="flex flex-row align-end">
        <ImagePick pickedImg={user?.imgUrl} setImg={setUserImg} />
        <div className="info flex flex-column">
          <h4>Profile</h4>
          <h1>{user?.username}</h1>
          <p>{stationsByUser?.length} Public Playlists</p>
        </div>
      </header>
      <main>
        <div className="station-list-container flex flex-column align-start">
          <h3>Public Playlists</h3>
          <StationList stations={stationsByUser} type="userDetails" />
          <h3>Liked Playlists</h3>
          <StationList stations={likedStations} type="userDetails" />
        </div>
      </main>
    </section>
  )
}
