import { FaCircle } from 'react-icons/fa'

export function StationDetailsHeader({station}) {
  const { name, createdBy, songs, imgUrl } = station

  return (
    <div className="station-details-header flex flex-row">
      <img src={imgUrl} alt="station-name" className="station-img" />
      <div className="flex flex-column">
        <h4>Playlist</h4>
        <h1>{name}</h1>
        <div className="created-by flex flex-row align-center">
          <img src={createdBy && createdBy.imgUrl} />
          <h4 className="fullname">{createdBy && createdBy.fullname}</h4>
          <div className="circle-divider">
            <FaCircle />
          </div>
          {station.songs && (
            <h4 className="station-length"> {station.songs.length} songs</h4>
          )}
        </div>
      </div>
    </div>
  )
}
