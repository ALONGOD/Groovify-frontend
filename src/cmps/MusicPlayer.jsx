import { useRef, useState } from 'react'

export function MusicPlayer() {
  const [audioProgress, setAudioProgress] = useState(0)
  const currentAudio = useRef()


  return (
    <div className="music-player-container flex flex-row align-center">
        <audio src={''} ref={currentAudio} />
      <p className="music-current-time">0:00</p>
      <input type="range" name="" className="youtube-player" />
      <p className="music-total-length">3:30</p>
    </div>
  )
}
