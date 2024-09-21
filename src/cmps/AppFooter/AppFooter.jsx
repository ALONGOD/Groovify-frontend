import { FaCircleCheck } from 'react-icons/fa6'
import { MusicPlayer } from './MusicPlayer'
import { useSelector } from 'react-redux'
import { LikeSongBtn } from '../LikeSongBtn'
import { MobileFooter } from './MobileFooter';
import { DesktopFooter } from './DesktopFooter';

export function AppFooter() {
  const currSong = useSelector(state => state.stationModule.player.currSong)
  const isMobile = useSelector(state => state.systemModule.isMobile)

  return (
      isMobile ? <MobileFooter currSong={currSong}/> : <DesktopFooter currSong={currSong}/>
  )
}
