import { useState } from 'react';
import { IoLibrary, IoLibraryOutline } from 'react-icons/io5';
import { GoPlus, GoArrowRight } from 'react-icons/go';
import { SubMenu } from './SubMenu';
import { Modal } from './Modal/Modal';


export function LibraryMenu({ isCollapsed, setIsCollapsed, selected, setSelected }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handlePlusClick(e) {
        e.stopPropagation();
        setIsModalOpen(!isModalOpen);
    }

    function closeModal() {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className={`nav-link ${selected === 'library' ? 'active' : ''}`}
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{ cursor: 'pointer' }}
            >
                {isCollapsed ? (
                    <IoLibraryOutline className='icon' />
                ) : (
                    <IoLibrary className='icon' />
                )}
                {!isCollapsed && <span>Your Library</span>}
                {!isCollapsed && (
                    <>
                        <GoPlus className='ml-auto icon' onClick={handlePlusClick} />
                        <GoArrowRight className='icon' onClick={e => e.stopPropagation()} />
                    </>
                )}
            </div>
            {!isCollapsed && <SubMenu selected={selected} setSelected={setSelected} />}
            {isModalOpen && <Modal modalType="library" closeModal={closeModal} />}

        </>
    );
}
