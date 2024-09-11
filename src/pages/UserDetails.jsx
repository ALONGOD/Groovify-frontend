import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ImagePick } from '../cmps/ImagePick'
import { FastAverageColor } from 'fast-average-color'
import { adjustBrightnessAndSaturation } from '../services/util.service'
import { userService } from '../services/user/user.service.remote'
import { stationService } from '../services/station/station.service.remote'
import { StationList } from '../cmps/StationList'

export function UserDetails() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userModule.user)
  const { imgUrl, username, fullname } = user

  const [stationsByUser, setStationsByUser] = useState([])
  const [gradient, setGradient] = useState(null)

  const fac = new FastAverageColor()

  useEffect(() => {
    fetchStationsByUser()

    fac.getColorAsync(user?.imgUrl).then(color => {
      console.log('color:', color)
      const color1 = adjustBrightnessAndSaturation(color.hex, 0.5, 1.8)
      const color2 = '#121212'
      setGradient({
        background: `linear-gradient(to bottom, ${color1} 10%, ${color2} 100%)`,
      })
    })
  }, [user])

  async function fetchStationsByUser() {
    const stations = await stationService.getStationsByUser(user._id)
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

  return (
    <section className="user-details relative">
      <div className="gradient" style={gradient}></div>
      <header className="flex flex-row align-end">
        <ImagePick pickedImg={imgUrl} setImg={setUserImg} />
        <div className="info flex flex-column">
          <h4>Profile</h4>
          <h1>{user?.username}</h1>
          <p>{stationsByUser?.length} Public Playlists</p>
        </div>
      </header>
      <main>
        <div className="station-list-container flex flex-column align-start">
          <h3>Public Playlists</h3>
          <StationList stations={stationsByUser} type='userDetails'/>
        </div>
      </main>
    </section>
  )
}
