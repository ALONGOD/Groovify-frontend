import { useParams } from "react-router"
import { stationService } from "../../services/station/station.service.local"
import { useEffect, useState } from "react";
import { SET_EDIT_MODAL } from "../../store/reducers/station.reducer";
import { useDispatch } from "react-redux";

export function EditStationModal() {
    const dispatch = useDispatch()
    const params = useParams()
    const [station, setStation] = useState({});
    

    useEffect(() => {
      const stationToSet = stationService.getById(params.stationId)
      setStation(stationToSet)
    }, [])

    function closeEditModal() {
        dispatch({ type: SET_EDIT_MODAL, isOpen: false })
    }
    
  return (
    <div className="flex flex-column">
      <div className="header">
        <h2>Edit details</h2>
        <button onClick={closeEditModal}>x</button>
      </div>

      <div className="flex flex-row">
        <img src={station?.imgUrl} alt="Station Img" />
        <div className="flex flex-column">
          <div className="input-with-label">
            <label>Name</label>
            <input type="text" value={station.name} placeholder="Add a name"/>
          </div>
          <div className="input-with-label">
            <label htmlFor="">Description</label>
            <textarea type="text" value={station.description} placeholder="Add an optional description"/>
          </div>
        </div>
      </div>
        <button className="save-btn">Save</button>
        <div className="flex flex-column justify-start">
          <p>
            By proceeding, you agree to give Spotify access to the image you
            choose to upload.
          </p>
          <p>Please make sure you have the right to upload the image.</p>
        </div>
    </div>
  )
}
