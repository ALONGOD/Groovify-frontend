import { AiOutlineAudioMuted, AiOutlineMuted, AiOutlineSound } from "react-icons/ai";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoPlayCircleOutline } from "react-icons/io5";
import { ProgressBar } from "./ProgressBar";

export function MusicPlayerActions({volume, handleVolumeChange, toggleDetailsSidebar, isActive, isVolumeMuted, toggleVolume
}) {
  
  return (
    <div className="other-options flex flex-row align-center">
      <IoPlayCircleOutline
        onClick={toggleDetailsSidebar}
        style={{ color: isActive ? '#00ba5c' : 'inherit' }}
      />
      <HiOutlineQueueList />
      {isVolumeMuted ? <AiOutlineMuted onClick={toggleVolume}/> : <AiOutlineSound onClick={toggleVolume}/>}
      <ProgressBar currProgress={volume} maxProgress={100} handleProgressClick={handleVolumeChange} type='volume-progress'/>
    </div>
  )
}
