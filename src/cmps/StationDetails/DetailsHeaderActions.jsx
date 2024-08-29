import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import { IoPlayCircle } from "react-icons/io5";
import { ThreeDotsModal } from "../Modal/ThreeDotsModal";

export function DetailsHeaderActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="station-header-actions flex flex-row justify-between align-center">
      <div className="flex flex-row gap-8 align-center">
        <IoPlayCircle className="play-circle" />
        <CiCirclePlus className="plus-circle" />
        <div ref={modalRef} className="relative">
          <BsThreeDots className="three-dots" onClick={toggleModal} />
          {isModalOpen && <ThreeDotsModal />}
        </div>
      </div>

      <div className="list-style-change flex flex-row gap-2 align-center">
        <FaListUl />
        <h4>List</h4>
      </div>
    </div>
  );
}
