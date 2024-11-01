const express = require('express');
const Playlist = require('../models/Playlist');
const router = express.Router();

// Add video to playlist or create a new playlist
router.post('/', async (req, res) => {
  const { playlistName, youtubeLink, userId } = req.body;

  try {
    // Check if playlist with the given name already exists for this user
    let playlist = await Playlist.findOne({ name: playlistName, userId });

    if (playlist) {
      // If the playlist exists, add the video to the existing playlist
      playlist.videos.push(youtubeLink);
      await playlist.save();
      res.json({ message: 'Video added to existing playlist.' });
    } else {
      // If the playlist doesn't exist, create a new playlist
      const newPlaylist = new Playlist({
        name: playlistName,
        videos: [youtubeLink],
        userId: userId // Associate the playlist with the user
      });

      await newPlaylist.save();
      res.json({ message: 'New playlist created and video added.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Fetch playlists by user ID
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      // Fetch playlists associated with the user ID
      const playlists = await Playlist.find({ userId: userId });
      res.json(playlists);
  } catch (error) {
      console.error('Error fetching playlists:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get all playlists (optional)
router.get('/', async (req, res) => {
  try {
    // Fetch all playlists from the database
    const playlists = await Playlist.find();

    // Respond with the found playlists
    res.json(playlists);
  } catch (err) {
    console.error('Error fetching playlists:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
