import { BsThreeDots } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import { IoPlayCircle } from "react-icons/io5";

export function DetailsHeaderActions() {
  return (
    <div className="station-header-actions flex flex-row justify-between align-center">
      <div className="flex flex-row gap-8 align-center">
        <IoPlayCircle className="play-circle" />
        <CiCirclePlus className="plus-circle" />
        <BsThreeDots className="three-dots" />
      </div>

      <div className="list-style-change flex flex-row gap-2 align-center">
        <FaListUl />
        <h4>List</h4>
      </div>
    </div>
  )
}
