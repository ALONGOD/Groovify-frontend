
import { DetailsHeaderActions } from './DetailsHeaderActions'
import { useEffect, useRef, useState } from 'react'

export function StationDetailsHeader({ station, toggleEditStation }) {
  const { name, createdBy, songs, imgUrl, description } = station
  const [averageColor, setAverageColor] = useState(null)
  const imgRef = useRef(null)





  return (
    <div className="station-details-container flex flex-column">
      <div className="station-details-header flex flex-row align-end">
      <img src={imgUrl} ref={imgRef} alt="station-name" className="station-img" />
        <div className="flex flex-column">
          <h4>Playlist</h4>
          <h1 onClick={toggleEditStation}>{name}</h1>
          {description && <p onClick={toggleEditStation}>{description}</p>}
          <div className="created-by flex flex-row align-center">
            <img src={createdBy && createdBy.imgUrl} />
            <h4 className="fullname">{createdBy && createdBy.fullname}</h4>
            <span className="divider">&#9679;</span>
            {station.songs && (
              <h4 className="station-length"> {station.songs.length} songs</h4>
            )}
          </div>
        </div>
      </div>

      <DetailsHeaderActions />
    </div>
  )
}
