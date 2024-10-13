import { FastAverageColor } from 'fast-average-color'
import { useEffect } from 'react'
import { LikeSongBtn } from '../LikeSongBtn'
import { PlayPauseBtn } from './../PlayPauseBtn'
import { MusicPlayer } from './MusicPlayer'

export function MobileFooter({ currSong }) {

  return (
    currSong && (
      <>
        <footer className="mobile-footer flex flex-row align-center justify-between">
          <div className="song-details flex flex-row">
            <img src={currSong?.imgUrl} alt="song-img" />
            <div className="flex flex-column gap-1">
              <h3>{currSong.title}</h3>
              <h4>{currSong.artist}</h4>
            </div>
          </div>
          <div className="btns flex flex-row align-center gap-8">
            <LikeSongBtn song={currSong} />
            <PlayPauseBtn song={currSong} />
          </div>
        </footer>
        <MusicPlayer currSong={currSong}/>
      </>
    )
  )
}
