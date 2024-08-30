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
const volumeToSave = isVolumeMuted ? 0 : volume


const detailsSidebarMode = useSelector(
  storeState => storeState.systemModule.detailsSidebarMode
)


function onSetDetailsSidebar(state) {
  setDetailsSidebar(state)
}


  return (
    <div className="other-options flex flex-row align-center">
      <IoPlayCircleOutline
        onClick={() => onSetDetailsSidebar('songDetails')}
        style={{ color: detailsSidebarMode === 'songDetails' ? '#00ba5c' : 'inherit' }}
      />
      <HiOutlineQueueList onClick={() => onSetDetailsSidebar('queueDetails')} style={{ color: detailsSidebarMode === 'queueDetails' ? '#00ba5c' : 'inherit' }}/>
      {isVolumeMuted ? <AiOutlineMuted onClick={toggleVolume}/> : <AiOutlineSound onClick={toggleVolume}/>}
      <ProgressBar currProgress={volumeToSave} setCurrent={setVolume} maxProgress={100} handleProgressClick={handleVolumeChange} type='volume-progress' playerRef={playerRef} />
    </div>
  )
}
