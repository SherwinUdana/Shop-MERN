const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageName: String,
  imageDescription: String,
  imageData: String, // Store base64 string or a reference to a file path
});

module.exports = mongoose.model('Image', imageSchema);
