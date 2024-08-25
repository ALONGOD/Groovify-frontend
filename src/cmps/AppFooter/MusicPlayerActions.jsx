import { AiOutlineSound } from "react-icons/ai";
import { HiOutlineQueueList } from "react-icons/hi2";
import { IoPlayCircleOutline } from "react-icons/io5";

export function MusicPlayerActions({volume, handleVolumeChange, toggleDetailsSidebar, isActive
}) {
  return (
    <div className="other-options flex flex-row align-center">
      <IoPlayCircleOutline
        onClick={toggleDetailsSidebar}
        style={{ color: isActive ? '#00ba5c' : 'inherit' }}
      />
      <HiOutlineQueueList />
      <AiOutlineSound />
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={handleVolumeChange}
        className="youtube-player sound"
      />
    </div>
  )
}
