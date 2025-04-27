const connection = require('../db/db-connection')

const getNotes = (req,res) => {
    connection.query('SELECT * FROM notes', (err, rows) => {
        if (err) throw err
        res.json(rows)     
    })
}

const saveNotes = (req,res) => {
    connection.query('INSERT INTO notes VALUES(?,?,?,?)',[req.body.id,req.body.note_text,req.body.image_name,req.body.created_at], (err, rows) => {
        if (err) throw err
        res.json(rows)
    })
    
}

module.exports = {getNotes, saveNotes}