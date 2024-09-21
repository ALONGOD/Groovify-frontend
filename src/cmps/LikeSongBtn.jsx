import { CiCirclePlus } from 'react-icons/ci'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { addToLikedSongs, removeFromLikedSongs } from '../store/actions/backend.user'

export function LikeSongBtn({ song }) {
    const likedSongsStation = useSelector(state => state.userModule.user)?.likedSongsStation

    const likedSongs = likedSongsStation ? likedSongsStation.songs : []

    const isSongLiked = likedSongs?.some(likedSong => likedSong?.id === song?.id)

    function onAddToLikedSongs() {
        addToLikedSongs(song)
    }

    function onRemoveFromLikedSongs() {
        removeFromLikedSongs(song.id)
    }

    return (
        <div className='like-song-container flex align-center justify-start'>
            {isSongLiked ? (
                <IoIosCheckmarkCircle
                    className='like-song-btn liked'
                    onClick={onRemoveFromLikedSongs}
                    title='Remove from Liked Songs'
                    style={{ cursor: 'pointer' }}
                />
            ) : (
                <CiCirclePlus
                    className='like-song-btn'
                    onClick={onAddToLikedSongs}
                    title='Add to Liked Songs'
                    style={{ cursor: 'pointer' }}
                />
            )}
        </div>
    )
}
