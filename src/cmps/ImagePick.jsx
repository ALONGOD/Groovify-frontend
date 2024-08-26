import { useRef, useState } from 'react'
import { LuPen } from 'react-icons/lu'

export function ImagePick({ setStation, pickedImg }) {
  const [onHoverImage, setOnHoverImage] = useState(false)
  const imageInput = useRef()

  function handlePickClick() {
    imageInput.current.click()
  }

  function handleImageChange({ target }) {
    const file = target.files[0]
    if (!file) {
      setStation(prev => ({ ...prev, imgUrl: null }))
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
      setStation(prev => ({ ...prev, imgUrl: fileReader.result }))
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
              <p>Choose Photo</p>
            </div>
          )}
          <img
            src={pickedImg}
            alt="The image selected by the user"
          />
        </div>
      ) : (
        <div onClick={handlePickClick} className="">
          <i className="fa-regular fa-image fa-xl"></i>
          <h4 className="text-[0.8em]">+ Upload Image</h4>
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
