import { CiCirclePlus } from "react-icons/ci";

export function LikeSongBtn({ onHover, song }) {

    return (
        <div>
            <CiCirclePlus className={`like-song-btn ${onHover ? '' : 'hidden'}`} />
        </div>
    )
}