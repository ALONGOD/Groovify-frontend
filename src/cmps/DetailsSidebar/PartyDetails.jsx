import { useSelector } from 'react-redux'
import { SongPreview } from '../SongPreview'
import { DetailsSidebarClose } from './DetailsSidebarClose'
import { socketService } from '../../services/socket.service'
import { useEffect, useState } from 'react'
import { UsersWatching } from '../StationDetails/UsersWatching'

export function PartyDetails({}) {
  const player = useSelector(state => state.stationModule.player)
  const partyListen = player.partyListen
  const [members, setMembers] = useState([])
  
  useEffect(() => {
      if (partyListen.state ) {
          
          socketService.emit('party-members', {
              stationId: partyListen.stationId,
            })
        socketService.on('receieve-members', members => {
            setMembers(members)
        })
        socketService.on('user-joined', user => {
            setMembers(members => [...members, user])
        })
        socketService.on('user-left', userId => {
            console.log('userId:', userId)
            setMembers(members => members.filter(member => member.id !== userId))
        })
    }
    return () => {
        socketService.off('receieve-members')
        socketService.off('user-joined')
    }
}, [])

if (!partyListen.state) return <h2>Party is currently inactive...</h2>
  return (
    <div className="party-listen flex flex-column">
      <div className="header flex flex-row justify-between align-center">
        <h2>Party Listen</h2>
        <DetailsSidebarClose />
      </div>
      <div className="currently-playing">
        <h2>Currently Playing</h2>
        <SongPreview song={player.currSong} type={'artist-page'} />
      </div>
      <div className="party-members">
        <h2>Participating </h2>
        {members.length ? <UsersWatching users={members} /> : ''}
      </div>
    </div>
  )
}
