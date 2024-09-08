import { useRef, useState } from 'react'
import { LuPen } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { EDIT_STATION_DISPLAY } from '../store/reducers/station.reducer'

export function ImagePick({ station, pickedImg }) {
  const dispatch = useDispatch()
  const [onHoverImage, setOnHoverImage] = useState(false)
  const imageInput = useRef()

  function setStationImg(img) {
    dispatch({ type: EDIT_STATION_DISPLAY, station: { ...station, imgUrl: img } })
  }

  function handlePickClick() {
    imageInput.current.click()
  }

  function handleImageChange({ target }) {
    const file = target.files[0]
    if (!file) {
      setStationImg(null)
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
      setStationImg(fileReader.result)
    }

    fileReader.readAsDataURL(file)
  }

  return (
    <div className="img relative">
      {pickedImg ? (
        <div
          onMouseOver={() => setOnHoverImage(true)}
          onMouseLeave={() => setOnHoverImage(false)}
          className="img-container"
          onClick={handlePickClick}
        >
          {onHoverImage && (
            <div className="hover-container flex flex-column absolute align-center justify-center">
              <LuPen />
              <p className='choose-photo'>Choose Photo</p>
            </div>
          )}
          <img
            src={pickedImg}
            alt="The image selected by the user"
          />
        </div>
      ) : (
        <div onClick={handlePickClick} className="">
          {/* <i className="fa-regular fa-image fa-xl"></i>
          <h4 className="text-[0.8em]">+ Upload Image</h4> */}
        </div>
      )}
      <input
        type="file"
        name="img"
        accept="image/png, image/jpeg"
        className="hidden"
        ref={imageInput}
        onChange={handleImageChange}
      />
    </div>
  )
}
