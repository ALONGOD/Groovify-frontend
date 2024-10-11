import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { YouTubeAPIService } from '../../services/youtubeAPI/fetchYoutubeApi.js';
import { spotifyAPIService } from '../../services/spotifyAPI/spotifyAPI.service.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewStation, saveStation } from '../../store/actions/backend.station.js';
import { userService } from '../../services/user/user.service.remote.js';
import { saveStationToLiked } from '../../store/actions/backend.user.js';
import { ModalAI } from './ModalAI.jsx';

export function AddStationModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userModule.user)
    console.log('user:', user)
    const [showAIModal, setShowAIModal] = useState(false);
    const [userPrompt, setUserPrompt] = useState(''); 

    async function onAddNewStation() {
        try {
            const newStation = await addNewStation();
            navigate(`/station/${newStation._id}`);
        } catch (err) {
            console.error('Failed to add new playlist:', err);
        }
    }

    async function getYouTubeSongsFromSpotify(spotifySongs) {
        const batchSize = 5;
        const youtubeSongs = [];

        for (let i = 0; i < spotifySongs.length; i += batchSize) {
            const batch = spotifySongs.slice(i, i + batchSize);
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
            console.log(youtubeResults)
            youtubeSongs.push(...youtubeResults);
        }

        return youtubeSongs;
    }

    async function onAddAIPlaylist() {
        try {
            if (!userPrompt) return;

            const spotifySongs = await spotifyAPIService.getRecommendedSongs(userPrompt);
            console.log(spotifySongs)

            const youtubeSongs = await getYouTubeSongsFromSpotify(spotifySongs);

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

            const savedStation = await saveStation(newStation);
            await saveStationToLiked(savedStation);
            navigate(`/station/${savedStation._id}`);
            setShowAIModal(false); 
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
            <div className="row flex flex-row" onClick={() => setShowAIModal(true)}>
                <AiOutlinePlus />
                <h3>Add AI playlist</h3>
            </div>

            {showAIModal && (
                <ModalAI userPrompt={userPrompt} setShowAIModal={setShowAIModal} setUserPrompt={setUserPrompt} onAddAIPlaylist={onAddAIPlaylist}/>
            )}
        </div>
    );
}
