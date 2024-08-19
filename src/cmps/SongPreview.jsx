import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosPlay } from "react-icons/io";

export function SongPreview({ song, idx }) {
  const [onSongHover, setOnSongHover] = useState(false);
  const { addedAt, duration, imgUrl, title, artist, album } = song;
  
  return (
    <li className="flex flex-row align-center" onMouseEnter={() => setOnSongHover(true)} onMouseLeave={() => setOnSongHover(false)}>
      <h4 className="idx">{onSongHover ? <IoIosPlay /> : idx + 1}</h4>
      <div className="flex flex-row align-center">
        <img src={imgUrl} alt="song-img" />
        <div className="song-details flex flex-column">
          <h4 className="title">{title}</h4>
          <h4>{artist ? artist : 'Artist'}</h4>
        </div>
      </div>
      <h4>{album ? album : 'Album'}</h4>
      <h4>{addedAt}</h4>
      <h4>{duration}</h4>
    </li>
  )
}
