import { useEffect, useState } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router'
import { userService } from '../services/user/user.service.remote'
import { SET_USER } from '../store/reducers/user.reducer'
import { useDispatch } from 'react-redux'
import { socketService } from '../services/socket.service'

export function AuthPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authType } = useParams()
  const [credentials, setCredentials] = useState({
    fullname: '',
    username: '',
    password: '',
  })
  const { username, password } = credentials

  const [isLogin, setIsLogin] = useState()

  useEffect(() => {
    try {
      const user = isUserLoggedin()
      if (user) {
        console.log('User is already logged in')
      }
      if (authType) {
        const isAuthLogin = authType === 'login' ? true : false
        setIsLogin(isAuthLogin)
      }
    } catch (err) {
      navigate('/')
    }
  }, [authType])

  async function isUserLoggedin() {
    try {
      await userService.getLoggedinUser()
    } catch (err) {
      throw err
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    try {
      let user
      if (isLogin) user = await userService.login({ username, password })
      else user = await userService.signup(credentials)
      socketService.login(user._id)
      dispatch({ type: SET_USER, user })
      navigate('/')
    } catch (err) {
      console.log('Cannot login or signup', err)
    }
  }

  function toggleIsLogin() {
    let authType
    if (isLogin) authType = 'signup'
    else authType = 'login'
    navigate(`/auth/${authType}`)
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <div className="auth-container">
      <main className="flex flex-column justify-center align-center">
        <div className="auth-header flex flex-column align-center">
          <FaSpotify size={30} color="white" />
          <h1>{isLogin ? 'Login' : 'Sign up'} to Spotify</h1>
        </div>
        <hr />
        <form className="flex flex-column align-start" onSubmit={handleSubmit}>
          {/* <div className="inputs"> */}
          {!isLogin && (
            <>
              <label htmlFor="fullname">Full name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={credentials.fullname}
                onChange={handleChange}
              />
            </>
          )}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          {/* </div> */}
          <button>{isLogin ? 'Login' : 'Sign up'}</button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <span onClick={toggleIsLogin}>
            {isLogin ? 'Sign up for Spotify' : 'Log in here'}
          </span>
        </p>
      </main>
    </div>
  )
}
