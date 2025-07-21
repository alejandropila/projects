const db = require('../db');

function createBeatsTable() {
// Crear tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS beats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  artist TEXT
)`);
}

function getAllBeats(callback) {
  db.all('SELECT * FROM beats', [], callback);
}

function getBeatById(id, callback) {
  db.get('SELECT * FROM beats WHERE id = ?', [id], callback);
}

function createBeat(name, artist, callback) {
  db.run('INSERT INTO beats(name, artist) VALUES (?, ?)', [name, artist], function(err) {
    callback(err, { id: this.lastID, name, artist });
  });
}

function updateBeat(id, name, artist, callback) {
  db.run('UPDATE beats SET name = ?, artist = ? WHERE id = ?', [name, artist, id], function(err) {
    callback(err, this.changes);
  });
}

function deleteBeat(id, callback) {
  db.run('DELETE FROM beats WHERE id = ?', [id], function(err) {
    callback(err, this.changes);
  });
}

module.exports = {
  getAllBeats,
  getBeatById,
  createBeat,
  updateBeat,
  deleteBeat,
  createBeatsTable
};
