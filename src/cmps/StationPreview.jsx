import { BsFillPinAngleFill } from 'react-icons/bs'

export function StationPreview({ station }) {
  return (
    <li className="station-preview flex flex-row">
      <img src={station.imgUrl} alt="station img" />
      <div className="flex flex-column">
        <h3>{station.name}</h3>
        <div className='station-details flex flex-row'>
          <div>
            <BsFillPinAngleFill />
          </div>
          <span>Playlist</span>
          <span className='divider'>&#9679;</span>
          <span>{station.songs.length} songs</span>
        </div>
      </div>
    </li>
  )
}
