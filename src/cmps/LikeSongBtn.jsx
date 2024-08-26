import { CiCirclePlus } from 'react-icons/ci'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import {
  addToLikedSongs,
  removeFromLikedSongs,
} from '../store/actions/station.actions'
import { useSelector } from 'react-redux'

export function LikeSongBtn({ song, isSongLiked }) {
  // Safely handle cases where song or likedSongsStation is null or undefined

  function onAddToLikedSongs() {
    addToLikedSongs(song)
  }

  function onRemoveFromLikedSongs() {
    removeFromLikedSongs(song.id)
  }

  return (
    <>
      {isSongLiked ? (
        <IoIosCheckmarkCircle
          className="like-song-btn liked"
          onClick={onRemoveFromLikedSongs}
          title="Remove from Liked Songs"
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <CiCirclePlus
          className="like-song-btn"
          onClick={onAddToLikedSongs}
          title="Add to Liked Songs"
          style={{ cursor: 'pointer' }}
        />
      )}
    </>
  )
}
