import { AiOutlineAudioMuted, AiOutlineMuted, AiOutlineSound } from "react-icons/ai";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoPlayCircleOutline } from "react-icons/io5";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";
import { TOGGLE_DETAILS_SIDEBAR } from "../../store/reducers/system.reducer";
import { useDispatch, useSelector } from "react-redux";

export function MusicPlayerActions({volume, setVolume, handleVolumeChange, toggleDetailsSidebar, isVolumeMuted, toggleVolume, playerRef
}) {
const dispatch = useDispatch()
const volumeToSave = isVolumeMuted ? 0 : volume

const [isActive, setIsActive] = useState(false)
const isDetailsOpen = useSelector(
  storeState => storeState.systemModule.isDetailsOpen
)

useEffect(() => {
  setIsActive(isDetailsOpen)
}, [isDetailsOpen])


function toggleDetailsSidebar() {
  setIsActive(prevState => !prevState)
  dispatch({ type: TOGGLE_DETAILS_SIDEBAR, state: 'songDetails' })
}
  
  return (
    <div className="other-options flex flex-row align-center">
      <IoPlayCircleOutline
        onClick={toggleDetailsSidebar}
        style={{ color: isActive ? '#00ba5c' : 'inherit' }}
      />
      <HiOutlineQueueList />
      {isVolumeMuted ? <AiOutlineMuted onClick={toggleVolume}/> : <AiOutlineSound onClick={toggleVolume}/>}
      <ProgressBar currProgress={volumeToSave} setCurrent={setVolume} maxProgress={100} handleProgressClick={handleVolumeChange} type='volume-progress' playerRef={playerRef} />
    </div>
  )
}
