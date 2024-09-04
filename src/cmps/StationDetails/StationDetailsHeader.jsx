
import { FastAverageColor } from 'fast-average-color';
import { ImagePick } from '../ImagePick'
import { DetailsHeaderActions } from './DetailsHeaderActions'
import { useEffect, useState } from 'react';
import { adjustBrightnessAndSaturation } from '../../services/util.service';

export function StationDetailsHeader({ station, setStation, toggleEditStation, isNewStation, setGradient }) {
  const fac = new FastAverageColor();
  const { name, createdBy, songs, imgUrl, description } = station
  
  useEffect(() => {
    fac.getColorAsync(imgUrl)
        .then(color => {
            const color1 = adjustBrightnessAndSaturation(color.hex, 0.4, 1.8);
            const color2 = '#121212'; 
            setGradient({
                background: `linear-gradient(to bottom, ${color1} 10%, ${color2} 100%)`,
            });
        });
}, [station]);


  return (
    <>
    {/* // <div className="station-details-container flex flex-column"> */}
      <div className="station-details-header flex flex-row align-end">
        <ImagePick setStation={setStation} pickedImg={imgUrl} />
        <div className="flex flex-column">
          <h4>Playlist</h4>
          <h1 onClick={toggleEditStation}>{name}</h1>
          {description && <p className='description' onClick={toggleEditStation}>{description}</p>}
          <div className="created-by flex flex-row align-center">
            <img src={createdBy && createdBy.imgUrl} />
            <h4 className="fullname">{createdBy && createdBy.fullname}</h4>
            <span className="divider">&#9679;</span>
            {station.songs && (
              <h4 className="station-length"> {station.songs.length} songs</h4>
            )}
          </div>
        </div>
      </div>

      {/* <DetailsHeaderActions toggleEditStation={toggleEditStation} isNewStation={isNewStation} station={station} /> */}
    {/* // </div> */}
            </>
  )
}
