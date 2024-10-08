import { useParams } from 'react-router'
import { stationService } from '../../services/station/station.service.local'
import { useEffect, useState } from 'react'
import {
  EDIT_STATION_DISPLAY,
  SET_EDIT_MODAL,
} from '../../store/reducers/station.reducer'
import { useDispatch } from 'react-redux'
import { ImagePick } from '../ImagePick'
import {
  getStationById,
  onUpdateStation,
} from '../../store/actions/backend.station'

export function EditStationModal() {
  const dispatch = useDispatch()
  const params = useParams()
  const [station, setStation] = useState({})

  console.log('station:', station)

  useEffect(() => {
    fetchStation()
  }, [])

  async function fetchStation() {
    // const stationToSet = await stationService.getById(params.stationId)
    const stationToSet = await getStationById(params.stationId)
    setStation(stationToSet)
  }

  function handleChange(ev) {
    const { name, value } = ev.target
    setStation({ ...station, [name]: value })
  }

  function setImg(img) {
    setStation({ ...station, imgUrl: img })
  }

  async function handleSave(ev) {
    try {
      ev.preventDefault()
      const stationToSave = await onUpdateStation(station)
      console.log('station:', station)
      console.log('stationToSave:', stationToSave)
      dispatch({ type: EDIT_STATION_DISPLAY, station: stationToSave })
    } catch (err) {
      console.log('Cannot save station', err)
    } finally {
      closeEditModal()
    }
  }

  // function handleSave(ev) {
  //   ev.preventDefault()
  //   storageService.put('stationDB', station)
  //   dispatch({ type: UPDATE_STATION, updatedStation: station })
  //   closeEditModal()
  // }

  function closeEditModal() {
    dispatch({ type: SET_EDIT_MODAL, isOpen: false })
  }

  return (
    <form onSubmit={handleSave} className="flex flex-column">
      <div className="header flex flex-row justify-between">
        <h2>Edit details</h2>
        <button onClick={closeEditModal}>x</button>
      </div>
      <main>
        <div className="main-details flex flex-row">
          <ImagePick setImg={setImg} pickedImg={station.imgUrl} />
          <div className="inputs flex flex-column">
            <div className="input-with-label">
              <label>Name</label>
              <input
                type="text"
                value={station.name}
                onChange={handleChange}
                name="name"
                placeholder="Add a name"
              />
            </div>
            <div className="input-with-label textarea">
              <label htmlFor="">Description</label>
              <textarea
                type="text"
                value={station.description}
                onChange={handleChange}
                name="description"
                placeholder="Add an optional description"
              />
            </div>
          </div>
        </div>
        <div className="save-container flex justify-end align-center">
          <button className="save-btn">Save</button>
        </div>
        <div className="description flex flex-column justify-start">
          <p>
            By proceeding, you agree to give Spotify access to the image you
            choose to upload.
          </p>
          <p>Please make sure you have the right to upload the image.</p>
        </div>
      </main>
    </form>
  )
}
