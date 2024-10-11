import axios from 'axios'

// services/spotifyAPI/fetchSpotifyApi.js
export const spotifyAPIService = {
  searchArtists,
  fetchDetailsFromArtist,
  fetchFeaturedPlaylists,
  fetchBrowseCategories,
  getRecommendedSongs,
  searchDetails
}
async function getRecommendedSongs(prompt) {
  try {
    const token = await getSpotifyAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/recommendations?seed_genres=${encodeURIComponent(prompt)}&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.tracks.map((track) => ({
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      duration: track.duration_ms,
      imgUrl: track.album.images[0].url,
      spotifyUrl: track.external_urls.spotify,
    }));
  } catch (error) {
    console.error('Error fetching recommendations from Spotify:', error);
    return [];
  }
}
async function searchArtists(query, limit = 5) {
  try {
    const token = await getSpotifyAccessToken()
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const data = await response.json()
    // Add a check for data.artists and data.artists.items
    return data.artists?.items || []
  } catch (error) {
    console.error('Error fetching Spotify API:', error)
    return []
  }
}

let accessToken = null
let tokenExpiryTime = null

async function getSpotifyAccessToken() {
  const clientId = '03db856e10b04a20855011a5d1c69ab1' // Your Client ID
  const clientSecret = 'cdf0add83591488db66b50e93473aa13' // Your Client Secret
  const auth = btoa(`${clientId}:${clientSecret}`)

  // Check if the token is still valid
  if (accessToken && new Date() < tokenExpiryTime) {
    return accessToken
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    })

    const data = await response.json()

    if (response.ok) {
      accessToken = data.access_token
      // Set the expiry time to current time + expires_in seconds
      tokenExpiryTime = new Date(new Date().getTime() + data.expires_in * 1000)
      return accessToken
    } else {
      console.error('Failed to retrieve Spotify access token:', data)
      return null
    }
  } catch (error) {
    console.error('Error fetching Spotify access token:', error)
    return null
  }
}

async function searchDetails(title, type) {
  try {
    const SPOTIFY_TOKEN = await getSpotifyAccessToken()
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${title}&type=${type}`, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

async function fetchDetailsFromArtist(id, fetchType) {
  try {
    var link
    switch (fetchType) {
      case 'artist':
        link = `https://api.spotify.com/v1/artists/${id}`
        break
      case 'topTracks':
        link = `https://api.spotify.com/v1/artists/${id}/top-tracks`
        break
      case 'albums':
        link = `https://api.spotify.com/v1/artists/${id}/albums`
        break
      case 'relatedArtists':
        link = `https://api.spotify.com/v1/artists/${id}/related-artists`
        break
    }

    const SPOTIFY_TOKEN = await getSpotifyAccessToken()
    const response = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    })
    console.log('response.data:', response.data)
    return response.data
  } catch (err) {
    console.error(err)
  }
}

// Cache object to store data
const cache = {}

// Cache Time-To-Live (TTL) in milliseconds (1 hour)
const CACHE_TTL = 60 * 60 * 1000

async function fetchFeaturedPlaylists(genre = '', country = 'US') {
  const cacheKey = `${genre}-${country}`

  // Check if the data is already in cache and is still valid
  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < CACHE_TTL)) {
    console.log(`Returning cached data for ${cacheKey}`)
    return cache[cacheKey].data
  }

  try {
    const SPOTIFY_TOKEN = await getSpotifyAccessToken()
    let url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}`

    if (genre) {
      const categories = await fetchBrowseCategories()
      const category = categories.categories.items.find(cat => cat.name.toLowerCase() === genre.toLowerCase())
      if (category) {
        url = `https://api.spotify.com/v1/browse/categories/${category.id}/playlists?country=${country}`
      }
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    })

    const stations = response.data.playlists.items.map(playlist => {
      // console.log('playlist:', playlist);
      
      return {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        imgUrl: playlist.images[0]?.url,
        spotifyUrl: playlist.external_urls.spotify,
      }
    })
    
    // Save the result in cache with a timestamp
    cache[cacheKey] = {
      data: stations,
      timestamp: Date.now()
    }

    return stations
  } catch (err) {
    console.error('Error fetching featured playlists:', err)
    return []
  }
}

async function fetchBrowseCategories() {
  try {
    const SPOTIFY_TOKEN = await getSpotifyAccessToken()
    const response = await axios.get('https://api.spotify.com/v1/browse/categories?locale=en_US', {
      headers: {
        Authorization: `Bearer ${SPOTIFY_TOKEN}`,
      },
    })
    console.log('response.data:', response.data)
    return response.data
  } catch (err) {
    console.error(err)
  }
}
