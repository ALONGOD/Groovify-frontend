import { useSelector } from 'react-redux';
import { SongList } from '../cmps/SongList.jsx';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js';
import { TopResult } from '../cmps/SearchPage/TopResult.jsx';
import { stationService } from '../services/station/station.service.local.js';
import { PlayPauseBtn } from '../cmps/PlayPauseBtn.jsx';
import { query } from '../store/actions/backend.station.js';

export function SearchPage() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
  console.log('playlistResults:', playlistResults)
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm) return;
    fetchResults();
  }, [searchTerm]);

  async function fetchResults() {
    try {
      const [youtubeResults, playlistResults] = await Promise.all([
        fetchSongsFromYouTube(searchTerm),
        fetchPlaylists(searchTerm),
      ]);
      setSearchResults(youtubeResults);
      setPlaylistResults(playlistResults);
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
      // const filterBy = { searchTerm: query };
      const results = await query(search);
      return results;
    } catch (error) {
      console.error('Error fetching playlists:', error);
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
        <div className="playlist-results">
          {playlistResults.length !== 0 && (
            <>
              <h2>Playlists</h2>
              <div className="playlist-container">
                {playlistResults.map((playlist) => (
                  <div
                    key={playlist._id}
                    className="playlist-item"
                    onClick={() => onPlaylistClick(playlist._id)}
                  >
                    <img
                      src={playlist.imgUrl}
                      alt={playlist.name}
                    />
                    <div className="playlist-info">
                      <h3>{playlist.name}</h3>
                      <p>By {playlist.createdBy.fullname}</p>
                    </div>
                    <PlayPauseBtn
                      station={playlist}
                      type="top-result"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
