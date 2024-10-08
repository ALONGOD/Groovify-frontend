import axios from 'axios';

const API_KEY = 'AIzaSyDqTgt_N3MSGncWUccH-LbSYRtkdv_mXbw';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const YouTubeAPIService = {
    searchVideos,
    getVideoDetails,
    getPlaylistItems,
    formatDuration, // Optional: If you want to expose this utility function
};

function searchVideos(query, maxResults = 5) {
    const cacheKey = `${query}_${maxResults}`;

    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        console.log('Returning cached data for query:', query);
        return Promise.resolve(JSON.parse(cachedData));
    }

    const url = `${BASE_URL}/search`;
    const params = {
        part: 'snippet',
        q: query,
        maxResults,
        type: 'video',
        key: API_KEY,
    };

    console.log('Fetching data from YouTube API for query:', query);

    return axios.get(url, { params })
        .then(response => {
            const videoItems = response.data.items.map(item => {
                // Extract video ID and other properties from the item
                const videoId = item.id.videoId;
                const title = item.snippet.title;
                const description = item.snippet.description;
                const thumbnailUrl = item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url;
                const channelTitle = item.snippet.channelTitle;

                // Use the video ID to create the URL for the video
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                return {
                    id: videoId,
                    title: title,
                    artist: channelTitle, // Assuming channelTitle as the artist
                    album: '', // Album data is typically not available via YouTube API
                    url: videoUrl,
                    imgUrl: [thumbnailUrl],
                    addedAt: Date.now(), // Using the current timestamp as addedAt
                    duration: '', // Duration will be added later in getVideoDetails
                };
            });

            localStorage.setItem(cacheKey, JSON.stringify(videoItems));

            return videoItems;
        })
        .catch(error => {
            throw new Error('Failed to fetch videos: ' + error.message);
        });
}

function getVideoDetails(videoId) {
    const url = `${BASE_URL}/videos`;
    const params = {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
        key: API_KEY,
    };
    return axios.get(url, { params })
        .then(response => {
            const video = response.data.items[0];

            // Extract duration and convert it to a human-readable format
            const duration = video.contentDetails.duration;
            const formattedDuration = formatDuration(duration);

            return {
                ...video,
                formattedDuration,
            };
        })
        .catch(error => {
            throw new Error('Failed to fetch video details: ' + error.message);
        });
}

function getPlaylistItems(playlistId, maxResults = 10) {
    const url = `${BASE_URL}/playlistItems`;
    const params = {
        part: 'snippet',
        playlistId,
        maxResults,
        key: API_KEY,
    };
    return axios.get(url, { params })
        .then(response => response.data.items)
        .catch(error => {
            throw new Error('Failed to fetch playlist items: ' + error.message);
        });
}

// Utility function to convert ISO 8601 duration to human-readable format
function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
    return `${hours ? hours + ':' : ''}${minutes ? minutes + ':' : '00:'}${seconds ? seconds : '00'}`;
}
