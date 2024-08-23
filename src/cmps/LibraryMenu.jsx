import { useState } from 'react'
import { IoLibrary, IoLibraryOutline } from 'react-icons/io5'
import { GoPlus, GoArrowRight } from 'react-icons/go'
import { SubMenu } from './SubMenu'
import { Modal } from './Modal/Modal'

export function LibraryMenu({
  isCollapsed,
  setIsCollapsed,
  selected,
  setSelected,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handlePlusClick(e) {
    e.stopPropagation()
    setIsModalOpen(!isModalOpen)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
    <>
      <div
        className={`nav-link flex flex-row justify-between ${
          selected === 'library' ? 'active' : ''
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex flex-row">
          {isCollapsed ? (
            <IoLibraryOutline className="icon" />
          ) : (
            <IoLibrary className="icon" />
          )}
          {!isCollapsed && <span>Your Library</span>}
        </div>
        {!isCollapsed && (
          <div className="flex flex-row">
            <div className="add-playlist-modal relative">
              <GoPlus className="ml-auto icon" onClick={handlePlusClick} />
              {isModalOpen && (
                <Modal modalType="library" closeModal={closeModal} />
              )}
            </div>
            <div>
              <GoArrowRight
                className="icon"
                onClick={e => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
      {!isCollapsed && (
        <SubMenu selected={selected} setSelected={setSelected} />
      )}
    </>
  )
}
