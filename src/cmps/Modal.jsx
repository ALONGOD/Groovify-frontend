import { AiOutlinePlus } from 'react-icons/ai'
import { FaCaretRight, FaPlus, FaRegTrashAlt } from 'react-icons/fa'
import { FiPlusCircle } from 'react-icons/fi'
import { GoPlus, GoPlusCircle } from 'react-icons/go'

export function Modal() {
  return (
    <>
      <div className="modal absolute">
        <div className="modal-content">
          <div className="row flex flex-row justify-between">
            <div className="flex flex-row">
              <AiOutlinePlus />
              <h3>Add to playlist</h3>
            </div>
            <FaCaretRight />
          </div>
          <div className="row flex flex-row">
            <FaRegTrashAlt />
            <h3>Remove from playlist</h3>
          </div>
          <div className="row flex flex-row">
            <GoPlusCircle />
            <h3>Save to your liked songs</h3>
          </div>
        </div>
      </div>
    </>
  )
}
