import { BsFillPinAngleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'

export function StationPreview({ station }) {
  const navigate = useNavigate()
  return (
    <li className="station-preview flex flex-row" onClick={() => navigate(`/station/${station._id}`)}>
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
