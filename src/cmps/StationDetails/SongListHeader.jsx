import { FaRegClock } from "react-icons/fa";

export function SongListHeader() {
     
    return (
        <div className="list-header flex">
            <h4>#</h4>
            <h4>Title</h4>
            <h4>Album</h4>
            <h4>Added At</h4>
            <h4><FaRegClock /></h4>
        </div>
    )
}