const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { auth } = require('../middleware/auth');

// Upload Endpoint
router.post('/', auth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  // Return the path relative to server root
  const filePath = `/uploads/${req.file.filename}`;
  res.json({ filePath });
});

module.exports = router;
