import { CiCirclePlus } from "react-icons/ci";
import { addToLikedSongs } from "../store/actions/station.actions";

export function LikeSongBtn({ onHover, song }) {

    function onAddToLikedSongs() {
        addToLikedSongs(song)
    }

    return (
        <div>
            <CiCirclePlus className={`like-song-btn ${onHover ? '' : 'hidden'}`} 
            onClick={onAddToLikedSongs}/>
        </div>
    )
}