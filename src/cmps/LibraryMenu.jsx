import { IoLibrary, IoLibraryOutline } from 'react-icons/io5'
import { GoPlus, GoArrowRight } from 'react-icons/go'
import { SubMenu } from './SubMenu'

export function LibraryMenu({ isCollapsed, setIsCollapsed, selected, setSelected }) {
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
                        <GoPlus className='ml-auto icon' onClick={e => e.stopPropagation()} />
                        <GoArrowRight className='icon' onClick={e => e.stopPropagation()} />
                    </>
                )}
            </div>
            {!isCollapsed && <SubMenu selected={selected} setSelected={setSelected} />}
        </>
    )
}
