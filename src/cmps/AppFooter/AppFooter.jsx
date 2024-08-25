import { FaCircleCheck } from 'react-icons/fa6'
import { MusicPlayer } from './MusicPlayer'
import { useSelector } from 'react-redux'


export function AppFooter() {
  const currSong = useSelector(storeState => storeState.stationModule.currSong)

  return (
    <footer className="app-footer full flex flex-row align-center justify-between">
      <div className="details flex flex-row align-center">
        {currSong && (
          <>
            <img src={currSong.imgUrl} alt="song-img" />
            <div className="flex flex-column">
              <h3>{currSong.title}</h3>
              <h4>{currSong.artist}</h4>
            </div>
            <FaCircleCheck />
          </>
        )}
      </div>
      <MusicPlayer currSong={currSong} />
      
    </footer>
  )
}