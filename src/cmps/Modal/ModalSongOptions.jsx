import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaCaretRight, FaRegTrashAlt } from 'react-icons/fa'
import { GoPlusCircle } from 'react-icons/go'
import { Modal } from './Modal'
import {
  addSongToQueue,
  // addToLikedSongs,
  removeFromLikedSongs,
} from '../../store/actions/station.actions'
import { useParams } from 'react-router'
import { LikeSongBtn } from '../LikeSongBtn'
import { useSelector } from 'react-redux'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { CiCirclePlus } from 'react-icons/ci'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { removeSongFromStation } from '../../store/actions/backend.station'
import { addToLikedSongs } from '../../store/actions/backend.user'

export function ModalSongOptions({}) {
  const params = useParams()
  const stationId = params.stationId
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)
  const modalSong = useSelector(state => state.stationModule.modalSong)
  
  const likedSongsStation = useSelector(state => state.userModule.user).likedSongsStation

  const likedSongs = likedSongsStation ? likedSongsStation.songs : []

  const isSongLiked = likedSongs?.some(
    likedSong => likedSong.id === modalSong.id
  )

  async function onRemoveSongFromStation() {
    await removeSongFromStation(stationId)
  }

  async function toggleLikeSong() {
    if (isSongLiked) {
      await removeFromLikedSongs(modalSong.id)
    } else {
      await addToLikedSongs(modalSong)
    }
  }

  function onAddSongToQueue() {
    addSongToQueue(modalSong)
  }

  return (
    <>
      <div
        className="row relative flex flex-row justify-between"
        onMouseEnter={() => setIsPlaylistModalOpen(true)}
        onMouseLeave={() => setIsPlaylistModalOpen(false)}
      >
        <div className="flex flex-row">
          <AiOutlinePlus className="plus-btn" />
          <h3>Add to playlist</h3>
        </div>

        <FaCaretRight className="caret-right" />
        {isPlaylistModalOpen && <Modal modalType={'playlists'} />}
      </div>
      <div className="row flex flex-row song-liked" onClick={toggleLikeSong}>
        {isSongLiked ? (
          <IoIosCheckmarkCircle className="checkmark-btn" />
        ) : (
          <CiCirclePlus />
        )}
        <h3>
          {isSongLiked
            ? 'Remove from your Liked Songs'
            : 'Save to your Liked Songs'}
        </h3>
      </div>

      <div className="row flex flex-row" onClick={onAddSongToQueue}>
        <HiOutlineQueueList />
        <h3>Add to queue</h3>
      </div>
      <div className="row flex flex-row">
        <FaRegTrashAlt />
        <h3 onClick={onRemoveSongFromStation}>Remove from playlist</h3>
      </div>
    </>
  )
}
