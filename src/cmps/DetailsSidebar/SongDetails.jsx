import { LikeSongBtn } from "../LikeSongBtn";
import { DetailsSidebarClose } from "./DetailsSidebarClose";

export function SongDetails({ currSong}) {

    return (
        <>
            <header className='details-header'>
                <h3>{currSong ? currSong.artist : 'Metro Boomin, A$AP Rocky, Takeoff'}</h3>
                <div className='header-actions'>
                    <button className='more-options'>•••</button>
                    <DetailsSidebarClose />
                </div>
            </header>
            <div className='details-image'>
                <img
                    src={currSong?.imgUrl || 'https://i.ytimg.com/vi/WwSRA2p4He0/mqdefault.jpg'}
                    alt='Album Art'
                />
            </div>
            <div className='details-song-info'>
                <div className='song-and-band'>
                    <h2>
                        {currSong
                            ? currSong.title
                            : 'Feel the Fiyaaah (with A$AP Rocky & feat. Takeoff)'}
                    </h2>
                    <h4>{currSong ? currSong.artist : 'Metro Boomin, A$AP Rocky, Takeoff'}</h4>
                </div>
                <LikeSongBtn song={currSong} />
            </div>
        </>
    )

}