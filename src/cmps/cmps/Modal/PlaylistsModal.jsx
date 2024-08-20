import { AiOutlinePlus } from "react-icons/ai"

export function PlaylistsModal({stations}) {
  console.log(stations);
  
    return (
      <>
        <div className="searchbar">
          <input type="text" name="" id="" />
        </div>
        <div className="row flex flex-row">
          <AiOutlinePlus />
          <h3>Add new playlist</h3>
        </div>
        {stations.map(station => {
          return (<h3 className="row" key={station._id}>
            {station.name}
          </h3>)
        })}
      </>
    )
  }