import { AiOutlinePlus } from 'react-icons/ai';
import { YouTubeAPIService } from '../../services/youtubeAPI/fetchYoutubeApi.js';
import { SpotifyAPIService } from '../../services/spotifyAPI/spotifyAPI.service.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewStation, saveStation } from '../../store/actions/backend.station.js';
import { userService } from '../../services/user/user.service.remote.js';
import { saveStationToLiked } from '../../store/actions/backend.user.js';

export function AddStationModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handles adding a new station without AI
    async function onAddNewStation() {
        try {


            const newStation = await saveStation();
            navigate(`/station/${newStation._id}`);
        } catch (err) {
            console.error('Failed to add new playlist:', err);
        }
    }

    // Fetch YouTube videos based on Spotify recommendations
    async function getYouTubeSongsFromSpotify(spotifySongs) {
        const batchSize = 5;  // Set a batch size to control the number of concurrent requests
        const youtubeSongs = [];

        for (let i = 0; i < spotifySongs.length; i += batchSize) {
            const batch = spotifySongs.slice(i, i + batchSize);

            // Process the batch of songs concurrently
            const youtubeResults = await Promise.all(
                batch.map(async (spotifySong) => {
                    const youtubeResults = await YouTubeAPIService.searchVideos(`${spotifySong.title} ${spotifySong.artist}`, 1);
                    const youtubeSong = youtubeResults[0];
                    return {
                        id: youtubeSong.id,
                        title: spotifySong.title,
                        artist: spotifySong.artist,
                        album: spotifySong.album,
                        url: youtubeSong.url,
                        imgUrl: youtubeSong.imgUrl[0],
                        addedAt: Date.now(),
                        duration: youtubeSong.duration || '',
                    };
                })
            );

            youtubeSongs.push(...youtubeResults);  // Add the processed batch to the results
        }

        return youtubeSongs;
    }

    // Handles adding an AI-generated playlist
    async function onAddAIPlaylist() {
        try {
            // Ask for a user prompt
            const userPrompt = prompt('Please enter a genre or mood for your playlist:');
            if (!userPrompt) return;

            // Fetch Spotify recommendations based on user input
            const spotifySongs = await SpotifyAPIService.getRecommendedSongs(userPrompt);

            // Map Spotify songs to YouTube songs (get YouTube IDs)
            const youtubeSongs = await getYouTubeSongsFromSpotify(spotifySongs);
            const user = await userService.getLoggedinUser()
            console.log(user)
            // Prepare a new station with the YouTube songs
            const newStation = {
                name: `AI Playlist: ${userPrompt}`,
                description: `AI generated playlist based on: ${userPrompt}`,
                imgUrl: 'https://res.cloudinary.com/dpoa9lual/image/upload/v1724570942/Spotify_playlist_photo_yjeurq.png',
                tags: [userPrompt],
                songs: youtubeSongs,
                createdBy: {
                    id: user._id,
                    fullname: user.username,
                    imgUrl: user.imgUrl,
                },
                likedByUsers: [],
            };

            // Save the new station and navigate to the playlist
            const savedStation = await saveStation(newStation);
            console.log('Saved station:', savedStation)
            await saveStationToLiked(newStation)
            navigate(`/station/${savedStation._id}`);
        } catch (err) {
            console.error('Failed to add AI playlist:', err);
        }
    }

    return (
        <div className="add-station-modal">
            <div className="row flex flex-row" onClick={onAddNewStation}>
                <AiOutlinePlus />
                <h3>Add new playlist</h3>
            </div>
            <div className="row flex flex-row" onClick={onAddNewStation}>
                <AiOutlinePlus />
                <h3>Add playlist folder</h3>
            </div>
            <div className="row flex flex-row" onClick={onAddAIPlaylist}>
                <AiOutlinePlus />
                <h3>Add AI playlist</h3>
            </div>
        </div>
    );
}
