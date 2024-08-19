import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { showSuccessMsg } from '../services/event-bus.service'

export function UserDetails() {

  const { userId } = useParams()
  const user = useSelector(storeState => storeState.userModule.watchedUser)

  useEffect(() => {
    loadUser(params.id)
  }, [userId])


  return (
    <section className="user-details">
    </section>
  )
}