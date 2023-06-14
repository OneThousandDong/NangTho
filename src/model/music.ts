export const Music = [
    {
        url: 'http://example.com/avaritia.mp3', // Load media from the network
        title: 'Avaritia',
        artist: 'deadmau5',
        album: 'while(1<2)',
        genre: 'Progressive House, Electro House',
        date: '2014-05-20T07:00:00+00:00', // RFC 3339
        artwork: 'http://example.com/cover.png', // Load artwork from the network
        duration: 402 // Duration in seconds
    },
    {
        url: 'file:///storage/sdcard0/Downloads/artwork.png', // Load media from the file system
        title: 'Ice Age',
        artist: 'deadmau5',
        // Load artwork from the file system:
        artwork: 'file:///storage/sdcard0/Downloads/cover.png',
        duration: 411
    },
    {
        url: 'file:///storage/sdcard0/Downloads/artwork.png', // Load media from the file system
        title: 'Ice Age',
        artist: 'deadmau5',
        // Load artwork from the file system:
        artwork: 'file:///storage/sdcard0/Downloads/cover.png',
        duration: 411
    }
]