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
      _id: 'u101',
      fullname: 'Puki Ben David',
      imgUrl: '',
    },
    likedByUsers: ['{minimal-user}', '{minimal-user}'],
    songs: [
      {
        id: 's1001',
        title: 'The Meters - Cissy Strut',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
        addedBy: '{minimal-user}',
        likedBy: ['{minimal-user}'],
        addedAt: 162521765262,
        duration: '3:30',
      },
      {
        id: 'mUkfiLjooxs',
        title: "The JB's - Pass The Peas",
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
        addedBy: '{minimal-user}',
        likedBy: ['{minimal-user}'],
        addedAt: 162521765262,
        duration: '3:30',
      },
    ],
    msgs: [
      {
        id: 'm101',
        from: '{mini-user}',
        txt: 'Manish?',
      },
    ],
  }
  ]
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
      ],
      likedStations: [
          {
              _id: '5cksxjas89xjsa8xjsa8jxs09',
              name: 'Moody',
              creator: 'Puki Ben David',
              album: 'Moody',
              img: ['default-img'],
          },
          {
              _id: 's102',
              name: 'Funky Monks',
              creator: 'Puki Ben David',
              album: 'Funky Monks',
              img: ['default-img'],
          },
      ],
  }
  

  