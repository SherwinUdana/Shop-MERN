const express = require('express');
const multer = require('multer');
const router = express.Router();
const Image = require('../models/Image');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    console.log('Request received:', req.body);
    console.log('File received:', req.file);

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const imageData = req.file.buffer.toString('base64'); // Convert image to base64

    const newImage = new Image({
      imageName: req.body.imageName,
      imageDescription: req.body.imageDescription,
      imageData: imageData,
    });

    console.log('Image data to be saved:', newImage);

    await newImage.save();
    console.log('Image saved successfully');
    res.status(201).send('Image uploaded successfully');
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send(error.message);
  }
});

// Route to get all images
router.get('/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
