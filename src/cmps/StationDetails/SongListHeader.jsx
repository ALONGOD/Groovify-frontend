import { FaRegClock } from 'react-icons/fa'

export function SongListHeader() {
  return (
    <div className="list-header flex">
      <h4 className="idx-title">#</h4>
      <h4 className="title">Title</h4>
      <h4 className="album">Album</h4>
      <h4 className="date">Date added</h4>
      <h4></h4>
      <div className='clock-container'>
        <h4 className="clock">
          <FaRegClock />
        </h4>
      </div>
    </div>
  )
}
