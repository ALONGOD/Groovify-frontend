import { AiOutlineSound } from 'react-icons/ai'
import { FaPauseCircle } from 'react-icons/fa'
import { FaBackwardStep, FaCircleCheck, FaForwardStep } from 'react-icons/fa6'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { RiRepeat2Line } from 'react-icons/ri'
import { TiArrowShuffle } from 'react-icons/ti'
import { useSelector } from 'react-redux'

export function AppFooter() {
  // id: 'party1001',
  // 			title: 'One More Time',
  // 			artist: 'Daft Punk',
  // 			album: 'Discovery',
  // 			url: 'https://www.youtube.com/watch?v=FGBhQbmPwH8',
  // 			imgUrl: ['https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg'],
  // 			addedAt: 162521795266,
  // 			duration: '5:20',
  const count = useSelector(storeState => storeState.userModule.count)
  const songPlaying = useSelector(
    storeState => storeState.stationModule.songPlaying
  )

  const percentage = 10
  // const { title, imgUrl, artist, duration } = songPlaying
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

        <div className="bottom flex flex-row align-center"></div>
      </div>
      <div className="other-options flex flex-row align-center">
        <IoPlayCircleOutline />
        <HiOutlineQueueList />
        <AiOutlineSound />
        <progress min="0" max="100" value={percentage} />
      </div>
    </footer>
  )
}
