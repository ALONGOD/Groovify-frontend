import React from 'react'
import { useNavigate } from 'react-router'
import { SpotifyAPIService } from '../services/spotifyAPI/spotifyAPI.service'

export function ArtistList({ artists }) {
  const navigate = useNavigate()

  async function navigateToArtist(artistId) {
    navigate(`/artist/${artistId}`)
  }

  return (
    <ul className="artist-list">
      {artists?.map(artist => {
        console.log('artist:', artist)
        if (artist.images.length === 0) return null // Correct use of conditional
        return (
          <>
            <li
              key={artist.id}
              className="artist-item flex flex-column justify-start"
              onClick={() => navigateToArtist(artist.id)}
            >
              <img
                src={artist.images[0]?.url || 'default-image-url'}
                alt={artist.name}
              />
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p>{artist.followers.total.toLocaleString()} followers</p>
              </div>
            </li>
          </>
        )
      })}
    </ul>
  )
}
