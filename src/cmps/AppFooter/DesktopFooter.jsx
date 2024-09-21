import { LikeSongBtn } from "../LikeSongBtn";
import { MusicPlayer } from "./MusicPlayer";

export function DesktopFooter({currSong}) {
     
    return (
        <footer className='app-footer flex flex-row'>
            
        <div className='details flex flex-row align-center'>
            {currSong &&(
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
        <MusicPlayer currSong={currSong}/>
    </footer>
    )
}