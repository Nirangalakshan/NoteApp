const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Add this line to use fs.unlink for deleting files

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

// Delete a note
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const getSql = 'SELECT image_name FROM notes WHERE id = ?';
  const deleteSql = 'DELETE FROM notes WHERE id = ?';

  db.query(getSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const image_name = results[0].image_name;

    db.query(deleteSql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Delete the image file if it exists
      if (image_name) {
        fs.unlink(path.join(__dirname, 'uploads', image_name), (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      res.status(200).json({ message: 'Note deleted successfully' });
    });
  });
});

// Edit a note
app.put('/notes/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { note_text } = req.body;
  let image_name = req.file ? req.file.originalname : null;
  const updated_at = new Date();

  const getSql = 'SELECT image_name FROM notes WHERE id = ?';
  const updateSql = 'UPDATE notes SET note_text = ?, image_name = ?, updated_at = ? WHERE id = ?';

  db.query(getSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const old_image_name = results[0].image_name;

    // If no new image is provided, keep the old one
    if (!image_name) {
      image_name = old_image_name;
    }

    db.query(updateSql, [note_text, image_name, updated_at, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Delete the old image file if a new image is uploaded
      if (req.file && old_image_name) {
        fs.unlink(path.join(__dirname, 'uploads', old_image_name), (err) => {
          if (err) {
            console.error(err);
          }
        });
      }

      res.status(200).json({ message: 'Note updated successfully' });
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
