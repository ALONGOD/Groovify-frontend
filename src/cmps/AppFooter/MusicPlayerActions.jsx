import {
  AiOutlineAudioMuted,
  AiOutlineMuted,
  AiOutlinePlaySquare,
  AiOutlineSound,
} from 'react-icons/ai'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { IoPlayCircleOutline } from 'react-icons/io5'
import { ProgressBar } from './ProgressBar'
import { useEffect, useState } from 'react'
import { TOGGLE_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer'
import { useDispatch, useSelector } from 'react-redux'
import { setDetailsSidebar } from '../../store/actions/system.actions'
import { NoVolume } from '../svgs/NoVolume'
import { MaxVolume } from '../svgs/MaxVolume'
import { QueueButton } from '../svgs/QueueButton'
// import {ReactComponent as LibraryIcon} from '../../assets/svgs/your-library.svg'

export function MusicPlayerActions({
  volume,
  setVolume,
  handleVolumeChange,
  toggleDetailsSidebar,
  isVolumeMuted,
  toggleVolume,
  playerRef,
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
      <button
        onClick={() => onSetDetailsSidebar('songDetails')}
        
      >
        <AiOutlinePlaySquare className={detailsSidebarMode === 'songDetails' ? 'active' : ''}/>
      </button>
      <button onClick={() => onSetDetailsSidebar('queueDetails')}>
        <QueueButton
          className={detailsSidebarMode === 'queueDetails' ? 'active' : ''}
        />
      </button>
      <button>
        {isVolumeMuted ? (
          <NoVolume onClick={toggleVolume} />
        ) : (
          <MaxVolume onClick={toggleVolume} />
        )}
      </button>
      <ProgressBar
        currProgress={volumeToSave}
        setCurrent={setVolume}
        maxProgress={100}
        handleProgressClick={handleVolumeChange}
        type="volume-progress"
        playerRef={playerRef}
      />
    </div>
  )
}
