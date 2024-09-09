import { useEffect, useState } from 'react'
import { FaSpotify } from 'react-icons/fa'
import { useParams } from 'react-router'

export function AuthPage() {
  const { authType } = useParams()
  const [credentials, setCredentials] = useState({
    fullname: '',
    username: '',
    password: '',
  })

  const [isLogin, setIsLogin] = useState()

  useEffect(() => {
    if (authType) {
      const isAuthLogin = authType === 'login' ? true : false
      setIsLogin(isAuthLogin)
    }
  }, [authType])

  function toggleIsLogin() {
    setIsLogin(state => !state)
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
        <form className="flex flex-column align-start">
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
          {isLogin
            ? 'Already have an account? '
            : "Don't have an account?"}
          <span onClick={toggleIsLogin}>
            {isLogin ? 'Sign up for Spotify' : 'Log in here'}
          </span>
        </p>
      </main>
    </div>
  )
}
