import { useState } from 'react'
import { MainMenu } from './MainMenu'
import { LibraryMenu } from './LibraryMenu'
import { StationList } from './StationList'

export function MenuSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState(null)

  return (
    <aside
      className={`menu-sidebar flex flex-column ${
        isCollapsed ? 'collapsed' : ''
      }`}
    >
      <div className='navigation'>
        <MainMenu isCollapsed={isCollapsed} />
      </div>
      <div className='library-menu flex flex-column'>
        <LibraryMenu
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          selected={selected}
          setSelected={setSelected}
        />
        <StationList />
      </div>
    </aside>
  )
}
