import { useNavigate } from "react-router";
import { spotifyAPIService } from "../../services/spotifyAPI/spotifyAPI.service";
import { LikeSongBtn } from "../LikeSongBtn";
import { MusicPlayer } from "./MusicPlayer";

export function DesktopFooter({currSong}) {
  const navigate = useNavigate()  

    async function navigateToArtist(name) {
        const res = await spotifyAPIService.searchDetails(name, 'artist')
        const artist = res.artists.items[0]
        navigate(`/artist/${artist.id}`)
      }

    return (
        <footer className='app-footer flex flex-row'>
            
        <div className='details flex flex-row align-center'>
            {currSong &&(
                <>
                    <img src={currSong?.imgUrl} alt='song-img' />
                    <div className='flex flex-column'>
                        <h3>{currSong.title}</h3>
                        <h4 className="artist" onClick={() => navigateToArtist(currSong.artist)}>{currSong.artist}</h4>
                    </div>
                    <LikeSongBtn song={currSong} />
                </>
            )}
        </div>
        <MusicPlayer currSong={currSong}/>
    </footer>
    )
}