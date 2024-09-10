import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { showSuccessMsg } from '../services/event-bus.service'
import { ImagePick } from '../cmps/ImagePick'
import { FastAverageColor } from 'fast-average-color'
import { adjustBrightnessAndSaturation } from '../services/util.service'

export function UserDetails() {

  const user = useSelector(state => state.userModule.user)
  const [userToEdit, setUserToEdit] = useState({ ...user });
  
  const [gradient, setGradient] = useState(null);
  
  const fac = new FastAverageColor();
  
  useEffect(() => {
    fac.getColorAsync(user.imgUrl)
        .then(color => {
            const color1 = adjustBrightnessAndSaturation(color.hex, 0.4, 1.8);
            const color2 = '#121212'; 
            setGradient({
                background: `linear-gradient(to bottom, ${color1} 10%, ${color2} 100%)`,
            });
        });
}, [user]);


  return (
    <section className="user-details" style={{gradient}}>
      <header className='flex flex-row'>
        <ImagePick />
        <div className="flex flex-column">
          <h4>Profile</h4>
          <h1>{user?.username}</h1>
          <p>30 public Playlists</p>
        </div>
      </header>
    </section>
  )
}