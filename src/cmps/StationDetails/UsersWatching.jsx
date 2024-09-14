import { GoDotFill } from 'react-icons/go'
import { useNavigate } from 'react-router'

export function UsersWatching({ users }) {
  const navigate = useNavigate()
  console.log();
  
  return (
    <div className="user-watching flex flex-row align-center justify-start">
      {users.length > 3 ? (
        <h3>{users.length} users listening...</h3>
      ) : (
        users.map(user => (
          <div onClick={() => navigate(`/profile/${user.id}`)} className="user flex flex-row align-center" key={user?._id}>
            <GoDotFill />
            <h3>{user.fullname}</h3>
          </div>
        ))
      )}
    </div>
  )
}
