import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStation } from '../../store/actions/station.actions.js';
import { stationService } from '../../services/station/station.service.local.js';
import { userService } from '../../services/user/user.service.local.js';
import { BsThreeDots } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import { IoPlayCircle } from "react-icons/io5";
import { ThreeDotsModal } from "../Modal/ThreeDotsModal";
import { SET_USER } from '../../store/reducers/user.reducer'; // Make sure this import is correct
import { store } from '../../store/store'; // Import the store if it's not already included

export function DetailsHeaderActions({ toggleEditStation, isNewStation, station: propStation }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const station = useSelector((state) => state.stationModule.station) || propStation;
  const user = useSelector((state) => state.userModule.user);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  // Handle click for CiCirclePlus
  const handlePlusClick = async () => {
    try {
      // Ensure the station object exists
      if (!station) {
        console.error('Station not found.');
        return;
      }

      // Check if the station is already liked by the user
      if (station.likedByUsers && station.likedByUsers.includes(user._id)) {
        console.log('Station is already liked by the user.');
        return;
      }

      // Add the station to the user's likedStations
      const updatedUser = { ...user };
      updatedUser.likedStations.push({
        id: station._id,
        name: station.name,
        creator: station.createdBy.fullname,
        img: station.imgUrl,
      });

      // Update the user in the service
      await userService.saveLoggedinUser(updatedUser);

      // Dispatch the update to the store
      store.dispatch({ type: SET_USER, user: updatedUser });

      // Add the user's ID to the station's likedByUsers array
      const updatedStation = { ...station };
      if (!updatedStation.likedByUsers) {
        updatedStation.likedByUsers = [];
      }
      updatedStation.likedByUsers.push(user._id);

      // Update the station in the service
      await stationService.save(updatedStation);

      // Dispatch the updated station to the store
      dispatch(updateStation(updatedStation));

    } catch (err) {
      console.error('Failed to add station to likedStations:', err);
    }
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
          {isModalOpen && (
            <ThreeDotsModal
              closeModal={closeModal}
              toggleEditStation={toggleEditStation}
            />
          )}
        </div>
      </div>

      <div className="list-style-change flex flex-row gap-2 align-center">
        <FaListUl />
        <h4>List</h4>
      </div>
    </div>
  );
}
