import { AiOutlineAudioMuted, AiOutlineMuted, AiOutlineSound } from "react-icons/ai";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoPlayCircleOutline } from "react-icons/io5";
import { ProgressBar } from "./ProgressBar";
import { useEffect, useState } from "react";
import { TOGGLE_DETAILS_SIDEBAR } from "../../store/reducers/system.reducer";
import { useDispatch, useSelector } from "react-redux";
import { setDetailsSidebar } from "../../store/actions/system.actions";

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

function onSetDetailsSidebar(state) {
  setIsActive(prevState => !prevState)
  setDetailsSidebar(state)
}

  return (
    <div className="other-options flex flex-row align-center">
      <IoPlayCircleOutline
        onClick={() => onSetDetailsSidebar('songDetails')}
        style={{ color: isActive ? '#00ba5c' : 'inherit' }}
      />
      <HiOutlineQueueList onClick={() => onSetDetailsSidebar('queueDetails')}/>
      {isVolumeMuted ? <AiOutlineMuted onClick={toggleVolume}/> : <AiOutlineSound onClick={toggleVolume}/>}
      <ProgressBar currProgress={volumeToSave} setCurrent={setVolume} maxProgress={100} handleProgressClick={handleVolumeChange} type='volume-progress' playerRef={playerRef} />
    </div>
  )
}
