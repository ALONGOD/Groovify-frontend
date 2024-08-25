import { CiCirclePlus } from 'react-icons/ci'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { addToLikedSongs, removeFromLikedSongs } from '../store/actions/station.actions'
import { useSelector } from 'react-redux'

export function LikeSongBtn({ onHover, song }) {
    const stations = useSelector(state => state.stationModule.stations)
    const likedSongs = stations.find(station => station._id === 'liked-songs')?.songs
    const isSongLiked = likedSongs.some(likedSong => likedSong.id === song.id)

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
                />
            ) : (
                <CiCirclePlus
                    className='like-song-btn'
                    onClick={onAddToLikedSongs}
                    title='Add to Liked Songs'
                />
            )}
        </div>
    )
}
