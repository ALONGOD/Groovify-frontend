// Guidlines:
// *. currently no better API than youtube...
// *. no need for song store, it is part of the station

// Pages, Cmps:
// HomePage render 2 stations => link StationDetails
// Add station
// AppPlayer (initially rendered at StationDetails, later in footer)
//   Smart component - connected to store:
//   -. stationModule.currentlyPlayingUrl
//   -. stationModule.dispatch(nextSong)
// Filtering
// StationList, StationPreview
// StationDetails - Make it amazing
// D & D Later....

const stations = [
	{
		_id: '5cksxjas89xjsa8xjsa8jxs01',
		name: 'Chill Vibes',
		tags: ['Chill', 'Relaxing'],
		createdBy: {
			id: 'u102',
			fullname: 'Sam Smith',
			imgUrl: 'https://res.cloudinary.com/dh73ujhyv/image/upload/v1724082806/jevy3fwzckfd94pnyifz.webp',
		},
		likedByUsers: ['{user-id1}', '{user-id2}'],
		songs: [
			{
				id: 'chill1001',
				title: 'Bonobo - Kiara',
				url: 'https://youtu.be/L-kyRh7N-kE',
				imgUrl: 'https://i.ytimg.com/vi/S3r5TRU-M-o/mqdefault.jpg',
				addedBy: '{minimal-user1}',
				addedAt: 162521765263,
			},
			{
				id: 'chill1002',
				title: 'Tycho - A Walk',
				url: 'https://youtu.be/SDNA934EEVk',
				imgUrl: 'https://i.ytimg.com/vi/O8mco7B1gIg/mqdefault.jpg',
				addedBy: '{minimal-user1}',
				addedAt: 162521765263,
			},
		],
	},
	{
		_id: '5cksxjas89xjsa8xjsa8jxs02',
		name: 'Workout Energy',
		tags: ['Workout', 'Energetic'],
		createdBy: {
			id: 'u103',
			fullname: 'Jane Doe',
			imgUrl: 'https://res.cloudinary.com/dh73ujhyv/image/upload/v1724083027/rfft1keoyporqtgpv8w8.webp',
		},
		likedByUsers: ['{user-id3}', '{user-id4}'],
		songs: [
			{
				id: 'energy1001',
				title: 'Survivor - Eye of the Tiger',
				url: 'https://www.youtube.com/watch?v=btPJPFnesV4',
				imgUrl: 'https://i.ytimg.com/vi/btPJPFnesV4/mqdefault.jpg',
				addedBy: '{minimal-user2}',
				addedAt: 162521765264,
			},
			{
				id: 'energy1002',
				title: 'Eminem - Lose Yourself',
				url: 'https://www.youtube.com/watch?v=_Yhyp-_hX2s',
				imgUrl: 'https://i.ytimg.com/vi/_Yhyp-_hX2s/mqdefault.jpg',
				addedBy: '{minimal-user2}',
				addedAt: 162521765264,
			},
		],
	},
	{
		_id: '5cksxjas89xjsa8xjsa8jxs03',
		name: 'Party Hits',
		tags: ['Party', 'Upbeat'],
		createdBy: {
			id: 'u104',
			fullname: 'John Doe',
			imgUrl: 'https://res.cloudinary.com/dh73ujhyv/image/upload/v1724083048/mtoempa1met6lv2tc6bh.webp',
		},
		likedByUsers: ['{user-id5}', '{user-id6}'],
		songs: [
			{
				id: 'party1001',
				title: 'Daft Punk - One More Time',
				url: 'https://www.youtube.com/watch?v=FGBhQbmPwH8',
				imgUrl: 'https://i.ytimg.com/vi/FGBhQbmPwH8/mqdefault.jpg',
				addedBy: '{minimal-user3}',
				addedAt: 162521765265,
			},
			{
				id: 'party1002',
				title: 'LMFAO - Party Rock Anthem',
				url: 'https://www.youtube.com/watch?v=KQ6zr6kCPj8',
				imgUrl: 'https://i.ytimg.com/vi/KQ6zr6kCPj8/mqdefault.jpg',
				addedBy: '{minimal-user3}',
				addedAt: 162521765265,
			},
		],
	},
];


const user = {
	_id: 'u102',
	username: 'musicLover123',
	img: 'https://example.com/user-img.jpg',
	likedSongs: [
		{
			id: 's1001',
			title: 'Cissy Strut',
			artist: 'The Meters',
			album: 'Funky Monks',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg'],
			addedAt: 162521765262,
			duration: '3:00',
		},
		{
			id: 'mUkfiLjo1xs',
			title: "Pass The Peas",
			artist: "The JB's",
			album: 'Funky Monks',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg'],
			addedAt: 162521765262,
			duration: '4:00',
		},
		{
			id: 'mUkfiLj2oxs',
			title: "Pass The Peas",
			artist: "The JB's",
			album: 'Funky Monks',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg'],
			addedAt: 162521765262,
			duration: '2:30',
		},
		{
			id: 'mUkfiLj5oxs',
			title: "Pass The Peas",
			artist: "The JB's",
			album: 'Funky Monks',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg'],
			addedAt: 162521765262,
			duration: '2:30',
		},
		{
			id: 'qJ5F2P5tYmE',
			title: 'Superstition',
			artist: 'Stevie Wonder',
			album: 'Talking Book',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/qJ5F2P5tYmE/mqdefault.jpg'],
			addedAt: 162521775262,
			duration: '4:26',
		},

		{
			id: 'l8A7O4u4L9w',
			title: 'Give Up the Funk',
			artist: 'Parliament',
			album: 'Mothership Connection',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/l8A7O4u4L9w/mqdefault.jpg'],
			addedAt: 162521785262,
			duration: '5:45',
		},
		{
			id: 'WwSRA2p4He0',
			title: 'Dance to the Music',
			artist: 'Sly & The Family Stone',
			album: 'Dance to the Music',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/WwSRA2p4He0/mqdefault.jpg'],
			addedAt: 162521795262,
			duration: '3:00',
		},
	],
	likedStations: [
		{
			id: '5cksxjas89xjsa8xjsa8jxs09',
			name: 'Moody',
			creator: 'Puki Ben David',
			album: 'Moody',
			img: ['default-img'],
		},
		{
			id: 's102',
			name: 'Funky Monks',
			creator: 'Puki Ben David',
			album: 'Funky Monks',
			img: ['default-img'],
		},
	],
}

export { stations, user };

// function isLikedByUser(songId){}
