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
    isBelowThreshold,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function handlePlusClick(e) {
        e.stopPropagation()
        if (!isBelowThreshold) {
            setIsModalOpen(!isModalOpen)
        }
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function handleLibraryClick(e) {
        e.stopPropagation()
        if (!isBelowThreshold) {
            setIsCollapsed(!isCollapsed)
        }
    }

    return (
        <>
            <div
                className={`nav-link flex flex-row justify-between ${
                    selected === 'library' ? 'active' : ''
                }`}
                style={{
                    cursor: isBelowThreshold ? 'not-allowed' : 'default',
                    opacity: isBelowThreshold ? 0.5 : 1,
                }}
                title={isBelowThreshold ? 'Expand the window to open the Library sidebar' : ''}
            >
                {/* Added a wrapper div around the icon and text to make the entire area clickable */}
                <div
                    className='flex flex-row items-center cursor-pointer'
                    onClick={handleLibraryClick} // Added onClick handler to the entire span
                    style={{
                        cursor: isBelowThreshold ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isCollapsed ? (
                        <IoLibraryOutline className='icon' />
                    ) : (
                        <IoLibrary className='icon' />
                    )}
                    {!isCollapsed && (
                        <span
                            style={{
                                cursor: isBelowThreshold ? 'not-allowed' : 'pointer',
                            }}
                        >
                            Your Library
                        </span>
                    )}
                </div>
                {!isCollapsed && (
                    <div className='flex flex-row'>
                        <div className='add-playlist-modal relative'>
                            <GoPlus className='ml-auto icon' onClick={handlePlusClick} />
                            {isModalOpen && <Modal modalType='library' closeModal={closeModal} />}
                        </div>
                        <div>
                            <GoArrowRight className='icon' onClick={e => e.stopPropagation()} />
                        </div>
                    </div>
                )}
            </div>
            {!isCollapsed && <SubMenu selected={selected} setSelected={setSelected} />}
        </>
    )
}
