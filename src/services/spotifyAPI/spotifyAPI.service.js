// services/spotifyAPI/fetchSpotifyApi.js
export const SpotifyAPIService = {
    searchArtists
};
async function searchArtists(query, limit = 5) {
    try {
        const token = await getSpotifyAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        // Add a check for data.artists and data.artists.items
        return data.artists?.items || [];
    } catch (error) {
        console.error('Error fetching Spotify API:', error);
        return [];
    }
}

let accessToken = null;
let tokenExpiryTime = null;

async function getSpotifyAccessToken() {
    const clientId = '03db856e10b04a20855011a5d1c69ab1'; // Your Client ID
    const clientSecret = 'cdf0add83591488db66b50e93473aa13'; // Your Client Secret
    const auth = btoa(`${clientId}:${clientSecret}`);

    // Check if the token is still valid
    if (accessToken && new Date() < tokenExpiryTime) {
        return accessToken;
    }

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${auth}`,
            },
            body: 'grant_type=client_credentials',
        });

        const data = await response.json();

        if (response.ok) {
            accessToken = data.access_token;
            // Set the expiry time to current time + expires_in seconds
            tokenExpiryTime = new Date(new Date().getTime() + data.expires_in * 1000);
            return accessToken;
        } else {
            console.error('Failed to retrieve Spotify access token:', data);
            return null;
        }
    } catch (error) {
        console.error('Error fetching Spotify access token:', error);
        return null;
    }
}