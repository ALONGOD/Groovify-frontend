import { useSelector } from 'react-redux';
import { SongList } from '../cmps/SongList.jsx';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js';
import { SpotifyAPIService } from '../services/spotifyAPI/spotifyAPI.service.js';
import { TopResult } from '../cmps/SearchPage/TopResult.jsx';
import { stationService } from '../services/station/station.service.local.js';
import { PlayPauseBtn } from '../cmps/PlayPauseBtn.jsx';
import { query } from '../store/actions/backend.station.js';
import { ArtistList } from '../cmps/ArtistList.jsx';
import { StationPreview } from '../cmps/StationPreview.jsx';

export function SearchPage() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm) return;
    fetchResults();
  }, [searchTerm]);

  async function fetchResults() {
    try {
      const [youtubeResults, playlistResults, artistResults] = await Promise.all([
        fetchSongsFromYouTube(searchTerm),
        fetchPlaylists(searchTerm),
        fetchArtistsFromSpotify(searchTerm),
      ]);
      setSearchResults(youtubeResults);
      setPlaylistResults(playlistResults);
      setArtistResults(artistResults);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  }

  async function fetchSongsFromYouTube(query) {
    try {
      const results = await YouTubeAPIService.searchVideos(query);
      return results;
    } catch (error) {
      console.error('Error fetching YouTube API:', error);
      return [];
    }
  }

  async function fetchPlaylists(search) {
    try {
      const results = await query(search);
      return results;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }

  async function fetchArtistsFromSpotify(query) {
    try {
      const results = await SpotifyAPIService.searchArtists(query, 5);
      return results;
    } catch (error) {
      console.error('Error fetching artists from Spotify API:', error);
      return [];
    }
  }

  function onPlaylistClick(stationId) {
    navigate(`/station/${stationId}`);
  }

  return (
    <div className="search-page">
      <div className="main-details">
        {searchResults.length !== 0 && (
          <TopResult topResult={searchResults[0]} />
        )}
        <div className="songs-results">
          {searchResults.length !== 0 && (
            <>
              <h2>Songs</h2>
              <SongList songs={searchResults} type="search-results" />
            </>
          )}
        </div>
        <div className="playlist-results" style={{ display: playlistResults.length === 0 ? 'none' : 'block' }}>
          {playlistResults.length !== 0 && (
            <>
              <h2>Playlists</h2>
              <div className="playlist-container">
                {playlistResults.filter((playlist) => playlist.songs && playlist.songs.length > 0).map((playlist, index) => (
                  <StationPreview
                    key={playlist._id}
                    station={playlist}
                    index={index}
                    type="search-results"
                    user={playlist.createdBy}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="artist-results">
          {artistResults.length !== 0 && (
            <>
              <h2>Artists</h2>
              <ArtistList artists={artistResults} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
