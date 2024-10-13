import { useEffect, useState, useRef } from 'react'
import { StationPreview } from './StationPreview'
import { useParams } from 'react-router'

export function StationList({ isCollapsed, stations, type, moveStation, setImgHover, stationIdParams }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)


  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modalRef])


  return (
    <section className="station-list">
      <ul className={type === 'search-results' ? 'flex flex-row' : ''}>
        {stations?.map((station, index) => (
          <StationPreview
            station={station}
            stations={stations}
            key={station.id}
            isCollapsed={isCollapsed}
            index={index}
            moveStation={moveStation}
            type={type}
            setImgHover={setImgHover}
            stationIdParams={stationIdParams}
          />
        ))}
      </ul>
    </section >
  )
}
