import { AiOutlineSound } from 'react-icons/ai'
import { FaPauseCircle } from 'react-icons/fa'
import { FaBackwardStep, FaCircleCheck, FaForwardStep } from 'react-icons/fa6'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { RiRepeat2Line } from 'react-icons/ri'
import { TiArrowShuffle } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_DETAILS_SIDEBAR } from '../store/reducers/system.reducer'
import { MusicPlayer } from './MusicPlayer'

export function AppFooter() {
  const dispatch = useDispatch()
  const songPlaying = useSelector(
    storeState => storeState.stationModule.songPlaying
  )

  function toggleDetailsSidebar() {
    dispatch({ type: TOGGLE_DETAILS_SIDEBAR})
  }
  
  return (
    <footer className="app-footer full flex flex-row align-center justify-between">
      <div className="details flex flex-row align-center">
        <img
          src={
            songPlaying
              ? songPlaying.imgUrl
              : 'https://i.ytimg.com/vi/WwSRA2p4He0/mqdefault.jpg'
          }
          alt="song-img"
        />
        <div className="flex flex-column">
          <h3>
            {songPlaying
              ? songPlaying.title
              : 'Feel the Fiyaaah (with A$AP Rocky & feat. Takeoff)'}
          </h3>
          <h4>
            {songPlaying
              ? songPlaying.artist
              : 'Metro Boomin, A$AP Rocky, Takeoff'}
          </h4>
        </div>
        <FaCircleCheck />
      </div>
      <div className="player flex flex-column justify-center align-center">
        <div className="top flex flex-row align-center">
          <TiArrowShuffle />
          <div className="song-actions flex flex-row align-center">
            <FaBackwardStep />
            <FaPauseCircle />
            <FaForwardStep />
          </div>
          <RiRepeat2Line />
        </div>

        <div className="bottom flex flex-row align-center">
          <MusicPlayer />
        </div>
      </div>
      <div className="other-options flex flex-row align-center">
        <IoPlayCircleOutline onClick={toggleDetailsSidebar}/>
        <HiOutlineQueueList />
        <AiOutlineSound />
        <input type="range" name="" className="youtube-player sound" />
      </div>
    </footer>
  )
}
