import { BsFillPinAngleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'

export function StationPreview({ station, isCollapsed }) {
  console.log('station:', station)
  const navigate = useNavigate()

  const {_id, imgUrl, name, songs} = station
  return (
    <li className="station-preview flex flex-row" onClick={() => navigate(`/station/${_id}`)}>
      <img src={imgUrl} alt="station img" />
      {!isCollapsed && <div className="flex flex-column">
        <h3>{name}</h3>
        <div className='station-details flex flex-row'>
          {/* <div>
            <BsFillPinAngleFill />
          </div> */}
          <span>Playlist</span>
          <span className='divider'>&#9679;</span>
          <span>{songs?.length} songs</span>
        </div>
      </div>}
    </li>
  )
}
