import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { FaCaretRight, FaRegTrashAlt } from "react-icons/fa"
import { GoPlusCircle } from "react-icons/go"
import { Modal } from "./Modal"

export function ModalSongOptions() {
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)
    return (
      <>
        <div className="row relative flex flex-row justify-between" onMouseEnter={() => setIsPlaylistModalOpen(true)} onMouseLeave={() => setIsPlaylistModalOpen(false)}>
          <div className="flex flex-row">
            <AiOutlinePlus />
            <h3>Add to playlist</h3>
          </div>
          <FaCaretRight />
         { isPlaylistModalOpen && <Modal modalType={'playlists'}/>}
        </div>
        <div className="row flex flex-row">
          <FaRegTrashAlt />
          <h3>Remove from playlist</h3>
        </div>
        <div className="row flex flex-row">
          <GoPlusCircle />
          <h3>Save to your liked songs</h3>
        </div>
      </>
    )
  }