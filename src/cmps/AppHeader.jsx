import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FaRegBell } from 'react-icons/fa'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.user)
  const navigate = useNavigate()

  return (
    <header className="app-header flex flex-row justify-between">
      <div className="right">
        <IoIosArrowBack />
        <IoIosArrowForward />
        <input
          type="text"
          name="search"
          placeholder="What do you want to play?"
        />
      </div>
      <div className="left flex flex-row align-center">
        <FaRegBell />
        <img
          src="https://i.scdn.co/image/ab67757000003b8212291183e9c0be882978f504"
          className="rounded-full"
          alt="profile picture"
        />
      </div>
    </header>
  )
}
