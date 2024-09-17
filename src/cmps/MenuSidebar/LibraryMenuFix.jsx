import { GoPlus } from 'react-icons/go'
import { Modal } from '../Modal/Modal'
import { YourLibraryEmpty } from '../svgs/YourLibraryEmpty'
import { YourLibraryFull } from '../svgs/YourLibraryFull'
import { useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'

export function LibraryMenuFix({
  isCollapsed,
  setIsCollapsed,
  isBelowThreshold,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  function handleLibraryClick(e) {
    e.stopPropagation()
    if (!isBelowThreshold) {
      setIsCollapsed(!isCollapsed)
    }
  }

  function handlePlusClick(e) {
    e.stopPropagation()
    if (!isBelowThreshold) {
      setIsModalOpen(state => !state)
    }
  }
  function closeModal() {
    setIsModalOpen(false)
  }

  function LibraryIcon() {
    return isCollapsed ? <YourLibraryEmpty /> : <YourLibraryFull />
  }
  return (
    <div className="library-menu flex flex-column">
      <div className="library-btns flex flex-row justify-between">
        <div
          className="your-library flex flex-row align-center justify-start"
          onClick={handleLibraryClick}
        >
          <LibraryIcon />
          {!isCollapsed && <h2>Your Library</h2>}
        </div>
          <FiPlus onClick={handlePlusClick} className="plus-btn" />
          {isModalOpen && <Modal modalType="library" closeModal={closeModal} />}
      </div>
    </div>
  )
}
