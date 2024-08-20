import { FaCaretRight, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'

export function Modal() {
  return (
    <>
      <div className="backdrop"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="flex flex-row">
            <FaPlus />
            <h3>Add to playlist</h3>
            <FaCaretRight />
          </div>
          <div className="flex flex-row">
            <FaRegTrashAlt />
            <h3>Remove from playlist</h3>
          </div>
          <div className="flex flex-row">
            <FiPlusCircle />
            <h3>Save to your liked songs</h3>
          </div>
        </div>
      </div>
    </>
  )
}
