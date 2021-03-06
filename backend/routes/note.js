const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router(); // mini-express app, use this

const DB_PATH = './notes.db' // sqlite3 file
let db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(` Note is connected to ${DB_PATH}`);
})

// Add routes for /note here
router.post('/', (req, res) => {
  db.run('INSERT INTO notes VALUES(null, ?)', [req.body.text], function(err) {
    res.send(this.lastID.toString());
  })
})

router.get('/:id', (req, res) => {
  db.all('SELECT text FROM notes WHERE id=?', [req.params.id], (err, rows) => {
    if (rows.length === 0) {
      res.sendStatus(404);
      return;
    }
    let text = rows[0].text;
    if (text === null) {
      text = '';
    }
    res.send(text);
  })
});

module.exports = router
