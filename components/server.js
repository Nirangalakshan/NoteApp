const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nlakshan1999',
  database: 'notes_db'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

// Save notes function
const saveNotes = (req, res) => {
  const { note_text } = req.body;
  const image_name = req.file ? req.file.originalname : null;
  const created_at = new Date();
  const sql = 'INSERT INTO notes (note_text, image_name, created_at) VALUES (?, ?, ?)';
  db.query(sql, [note_text, image_name, created_at], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, note_text, image_name, created_at });
  });
};

// API endpoint to save a note
app.post('/notes', upload.single('image'), saveNotes);

// Fetch all notes
app.get('/notes', (req, res) => {
  const sql = 'SELECT * FROM notes';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
