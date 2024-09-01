import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import { IoPlayCircle } from "react-icons/io5";
import { ThreeDotsModal } from "../Modal/ThreeDotsModal";

export function DetailsHeaderActions({ toggleEditStation, isNewStation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  function closeModal() {
    setIsModalOpen(!isModalOpen);
  }

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

  // Handle click for CiCirclePlus
  const handlePlusClick = () => {
    // Functionality to be added later
  };

  return (
    <div className="station-header-actions flex flex-row justify-between align-center">
      <div className="flex flex-row gap-8 align-center">
        <IoPlayCircle className="play-circle" />
        {isNewStation && (
          <CiCirclePlus className="plus-circle" onClick={handlePlusClick} />
        )}
        <div ref={modalRef} className="relative">
          <BsThreeDots className="three-dots" onClick={toggleModal} />
          {isModalOpen && <ThreeDotsModal closeModal={closeModal} toggleEditStation={toggleEditStation} />}
        </div>
      </div>

      <div className="list-style-change flex flex-row gap-2 align-center">
        <FaListUl />
        <h4>List</h4>
      </div>
    </div>
  );
}
