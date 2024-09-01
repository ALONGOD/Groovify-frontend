import { FaCircleCheck } from 'react-icons/fa6'
import { MusicPlayer } from './MusicPlayer'
import { useSelector } from 'react-redux'
import { LikeSongBtn } from '../LikeSongBtn'

export function AppFooter() {
    const currSong = useSelector(state => state.stationModule.player.currSong)

    return (
        <footer className='app-footer'>
            <div className='details flex flex-row align-center'>
                {currSong && (
                    <>
                        <img src={currSong?.imgUrl} alt='song-img' />
                        <div className='flex flex-column'>
                            <h3>{currSong.title}</h3>
                            <h4>{currSong.artist}</h4>
                        </div>
                        <LikeSongBtn song={currSong} />
                    </>
                )}
            </div>
            <MusicPlayer currSong={currSong} />
        </footer>
    )
}
