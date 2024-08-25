import { useRef, useState } from 'react'

export function ImagePick({ setDetailsToEdit, pickedImg }) {
//   const [pickedImage, setPickedImage] = useState()
  const [onHoverImage, setOnHoverImage] = useState(false)
  

  const imageInput = useRef()

  function handlePickClick() {
    imageInput.current.click()
  }

  function handleImageChange({ target }) {
    const file = target.files[0]
    if (!file) {
    //   setPickedImage(null)
      setDetailsToEdit((prev) => ({ ...prev, img: null }))
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
    //   setPickedImage(fileReader.result)
      setDetailsToEdit((prev) => ({ ...prev, img: fileReader.result }))
    }

    fileReader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-row items-center justify-between bg-background-mainBg text-slate-500 w-full h-[11em] p-4 mb-8 rounded-xl">
      <h4>Profile Picture</h4>
      {pickedImg ? (
        <div
          onMouseOver={() => setOnHoverImage(true)}
          onMouseLeave={() => setOnHoverImage(false)}
          className="relative w-[8em] h-full rounded-lg cursor-pointer  bg-purple-light transition-all duration-200"
          onClick={handlePickClick}
        >
          <p
            className={`${
              onHoverImage ? 'block' : 'hidden'
            } z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-purple-bright font-bold`}
          >
            Change Photo
          </p>
          <img
            src={pickedImg}
            alt="The image selected by the user"
            className={`w-full h-full rounded-lg hover:opacity-50 hover:blur-sm transition-all duration-200`}
          />
        </div>
      ) : (
        <div
          onClick={handlePickClick}
          className="flex flex-col bg-purple-light text-purple-bright justify-center items-center p-4 rounded-xl h-full min-w-[8em] max-w-[8em] font-bold gap-4 cursor-pointer hover:text-slate-700 hover:bg-purple-200 duration-200"
        >
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
      <div className="flex flex-col">
        <h5>Image must be below 1024x1024px</h5>
        <h5>Use PNG or JPG format</h5>
      </div>
    </div>
  )
}
