import { CiCirclePlus } from 'react-icons/ci'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { addToLikedSongs, removeFromLikedSongs } from '../store/actions/station.actions'
import { useSelector } from 'react-redux'

export function LikeSongBtn({ onHover, song }) {
    const stations = useSelector(state => state.stationModule.stations)

    // Safely handle cases where song or likedSongsStation is null or undefined
    if (!song || !stations) {
        return null // Return null if song or stations is not available
    }

    const likedSongsStation = stations.find(station => station._id === 'liked-songs')
    const likedSongs = likedSongsStation ? likedSongsStation.songs : []

    // Check if the song is liked, ensuring likedSongs is an array
    const isSongLiked = likedSongs?.some(likedSong => likedSong.id === song.id)

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
