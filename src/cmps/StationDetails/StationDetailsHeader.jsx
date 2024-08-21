import { BsThreeDots } from 'react-icons/bs'
import { CiCirclePlus } from 'react-icons/ci'
import { FaCircle, FaListUl } from 'react-icons/fa'
import { IoPlayCircle } from 'react-icons/io5'

export function StationDetailsHeader({ station }) {
  const { name, createdBy, songs, imgUrl } = station

  return (
    <div className="station-details-container flex flex-column">
      <div className="station-details-header flex flex-row align-end">
        <img src={imgUrl} alt="station-name" className="station-img" />
        <div className="flex flex-column">
          <h4>Playlist</h4>
          <h1>{name}</h1>
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
      <div className="station-header-actions flex flex-row justify-between">
        <div className="flex flex-row">
          <IoPlayCircle />
          <CiCirclePlus />
          <BsThreeDots />
        </div>
        <div className="list-style-diff flex flex-row">
          <FaListUl />
          <h4>List</h4>
        </div>
      </div>
    </div>
  )
}
