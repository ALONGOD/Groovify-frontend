import React from 'react';
import { useNavigate } from 'react-router';
import { SpotifyAPIService } from '../services/spotifyAPI/spotifyAPI.service';

export function ArtistList({ artists }) {
    const navigate = useNavigate();

    async function navigateToArtist(artistId) {
        // navigate(`/artist/${artistId}`);
        const details = await SpotifyAPIService.fetchDetailsFromArtist(artistId, 'topTracks')
        const topTracks = await SpotifyAPIService.fetchDetailsFromArtist(artistId, 'albums')
        const relatedArtists = await SpotifyAPIService.fetchDetailsFromArtist(artistId, 'relatedArtists')
        const featuredPlaylists = await SpotifyAPIService.fetchFeaturedPlaylists()
        console.log('featuredPlaylists:', featuredPlaylists)
        console.log('relatedArtists:', relatedArtists)
        console.log('topTracks:', topTracks)
        console.log('details:', details);
        
    }
    
    return (
        <div className="artist-list">
            {artists.map((artist) => {
                console.log('artist:', artist)
                if (artist.images.length === 0) return null; // Correct use of conditional
                return (
                    <div key={artist.id} className="artist-item" onClick={() => navigateToArtist(artist.id)}>
                        <img src={artist.images[0]?.url || 'default-image-url'} alt={artist.name} />
                        <div className="artist-info">
                            <h3>{artist.name}</h3>
                            <p>{artist.followers.total.toLocaleString()} followers</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
