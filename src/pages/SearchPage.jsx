import { useSelector } from 'react-redux';
import { SongList } from '../cmps/SongList.jsx';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js';
import { spotifyAPIService } from '../services/spotifyAPI/spotifyAPI.service.js';
import { TopResult } from '../cmps/SearchPage/TopResult.jsx';
import { stationService } from '../services/station/station.service.local.js';
import { PlayPauseBtn } from '../cmps/PlayPauseBtn.jsx';
import { query } from '../store/actions/backend.station.js';
import { ArtistList } from '../cmps/ArtistList.jsx';
import { StationPreview } from '../cmps/StationPreview.jsx';
import { StationList } from '../cmps/StationList.jsx';
import { CategoryPreview } from '../cmps/SearchPage/CategoryPreview.jsx';

export function SearchPage() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [playlistResults, setPlaylistResults] = useState([]);
  const [artistResults, setArtistResults] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log('categories:', categories)

  const navigate = useNavigate();

  useEffect(() => {
    if (!searchTerm && !categories.length) {
      fetchCategories();
    } else {
      fetchResults();
    }
  }, [searchTerm]);

  async function fetchResults() {
    fetchSongsFromYouTube(searchTerm)
    fetchPlaylists(searchTerm)
    fetchArtistsFromSpotify(searchTerm)
  }

  async function fetchSongsFromYouTube(query) {
    try {
      const results = await YouTubeAPIService.searchVideos(query);
      setSearchResults(results);
      return results;
    } catch (error) {
      console.error('Error fetching YouTube API:', error);
      return [];
    }
  }

  async function fetchPlaylists(search) {
    try {
      const results = await query(search);
      setPlaylistResults(results);
      return results;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      return [];
    }
  }

  async function fetchArtistsFromSpotify(query) {
    try {
      const results = await spotifyAPIService.searchArtists(query, 5);
      setArtistResults(results);
      return results;
    } catch (error) {
      console.error('Error fetching artists from Spotify API:', error);
      return [];
    }
  }

  function onPlaylistClick(stationId) {
    navigate(`/station/${stationId}`);
  }

  async function fetchCategories() {
    try {
      const data = await spotifyAPIService.fetchBrowseCategories();
      setCategories(data.categories.items);
      console.log(data)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  function onCategoryClick(category) {
    navigate(`/category/${category.id}`);
  }
  return (
    <div className="search-page">
      <div className="main-details">
        {searchTerm ? (
          <>
            {searchResults.length !== 0 && <TopResult topResult={searchResults[0]} />}
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
                  <StationList stations={playlistResults} type="search-results" />
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
          </>
        ) : (
          <div className="category-grid">
            {categories.map((category) =>
              category.name === 'Charts' ? null : (
                <CategoryPreview category={category} onCategoryClick={onCategoryClick} key={category.id}/>
              )
            )}
          </div>

        )}
      </div>
    </div>
  );
}