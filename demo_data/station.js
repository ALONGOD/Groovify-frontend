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

var stations = [{
  _id: '5cksxjas89xjsa8xjsa8jxs09',
  name: 'Funky Monks',
  tags: ['Funk', 'Happy'],
  createdBy: {
    id: 'u101',
    fullname: 'Puki Ben David',
    imgUrl: '',
  },
  likedByUsers: ['{user-id}', '{user-id}'],
  songs: [
    {
      id: 's1001',
      title: 'The Meters - Cissy Strut',
      url: 'youtube/song.mp4',
      imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
      addedBy: '{minimal-user}',
      addedAt: 162521765262,
    },
    {
      id: 'mUkfiLjooxs',
      title: "The JB's - Pass The Peas",
      url: 'youtube/song.mp4',
      imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
	  addedBy: '{minimal-user}',
	  addedAt: 162521765262,
    },
  ],
}]

const user = {
	_id: '',
	username: '',
	img: '',
	likedSongs: [
		{
			id: 's1001',
			title: 'Cissy Strut',
			artist: 'The Meters',
			album: 'Funky Monks',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg'],
			addedAt: 162521765262,
			duration: '3:00', // Add duration property
		},
		{
			id: 'mUkfiLjo1xs',
			title: "Pass The Peas",
			artist: "The JB's",
			album: 'Funky Monks',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg'],
			addedAt: 162521765262,
			duration: '4:00', // Add duration property
		},
		{
			id: 'mUkfiLj2oxs',
			title: "Pass The Peas",
			artist: "The JB's",
			album: 'Funky Monks',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg'],
			addedAt: 162521765262,
			duration: '2:30', // Add duration property
		},
		{
			id: 'mUkfiLj5oxs',
			title: "Pass The Peas",
			artist: "The JB's",
			album: 'Funky Monks',
			url: 'youtube/song.mp4',
			imgUrl: ['https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg'],
			addedAt: 162521765262,
			duration: '2:30', // Add duration property
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

// function isLikedByUser(songId){}
