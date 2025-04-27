const express = require('express')
const router = express.Router()

const {getNotes, saveNotes} = require('../controller/note-controller')

router.get('/get_notes',getNotes)
router.post('/save_notes',saveNotes)


module.exports = router; 