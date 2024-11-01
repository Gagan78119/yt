const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  
  },
  videos: {
    type: [String], // List of YouTube links
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
