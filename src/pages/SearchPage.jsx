import { useSelector } from 'react-redux';
import { SongList } from '../cmps/SongList.jsx';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js';
import { TopResult } from '../cmps/SearchPage/TopResult.jsx';
import { stationService } from '../services/station/station.service.local.js';

export function SearchPage() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
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

  async function fetchPlaylists(query) {
    try {
      const filterBy = { searchTerm: query };
      const results = await stationService.query(filterBy);
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
          {searchResults?.length && (
            <>
              <h2>Songs</h2>
              <SongList songs={searchResults} type="search-results" />
            </>
          )}
        </div>
        <div className="playlist-results" style={{ marginTop: '8%' }}>
          {playlistResults?.length && (
            <>
              <h2>Playlists</h2>
              <div style={{ display: 'flex', gap: '20px', overflowX: 'auto' }}>
                {playlistResults.map((playlist) => (
                  <div
                    key={playlist._id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '150px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      color: '#fff',
                    }}
                    onClick={() => onPlaylistClick(playlist._id)}
                  >
                    <img
                      src={playlist.imgUrl}
                      alt={playlist.name}
                      style={{
                        width: '100%',
                        height: '150px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        marginBottom: '8px',
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {playlist.name}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#b3b3b3' }}>
                        By {playlist.createdBy.fullname}
                      </p>
                    </div>
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
