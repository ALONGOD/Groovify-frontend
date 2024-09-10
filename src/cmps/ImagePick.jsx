import { useRef, useState } from 'react'
import { LuPen } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { EDIT_STATION_DISPLAY } from '../store/reducers/station.reducer'
import { onUpdateStation } from '../store/actions/backend.station'

export function ImagePick({ setImg, pickedImg }) {
  const dispatch = useDispatch()
  const [onHoverImage, setOnHoverImage] = useState(false)
  const imageInput = useRef()



  function handlePickClick() {
    imageInput.current.click()
  }

  function handleImageChange({ target }) {
    const file = target.files[0]
    if (!file) {
      setImg('https://res.cloudinary.com/dpoa9lual/image/upload/v1724570942/Spotify_playlist_photo_yjeurq.png')
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
        // setImg(station => ({ ...station, imgUrl: fileReader.result }))
        // onUpdateStation({...station, imgUrl: fileReader.result})
        setImg(fileReader.result )
      
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
              <p className="choose-photo">Choose Photo</p>
            </div>
          )}
          <img src={pickedImg} alt="The image selected by the user" />
        </div>
      ) : (
        <div onClick={handlePickClick} className="">
          <img src='https://res.cloudinary.com/dpoa9lual/image/upload/v1724570942/Spotify_playlist_photo_yjeurq.png' alt="placeholder" />
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
