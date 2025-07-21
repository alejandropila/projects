const db = require('../db');

function createfavoritesTable() {
  db.run(`CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE,
    beat_id TEXT NOT NULL UNIQUE
  )`, (err) => {
    if (err) {
      console.error('Error creating favorites table:', err.message);
    } else {
      console.log('favorites table created or already exists');
    }
  });
}

function getAllfavorites(callback) {
  db.all('SELECT * FROM favorites', [], callback);
}

function getFavoriteById(id, callback) {
  db.get('SELECT * FROM favorites WHERE id = ?', [id], callback);
}

function createfavorite(user_id, beat_id, callback) {
  db.run('INSERT INTO favorites(user_id, beat_id) VALUES (?, ?)', [user_id, beat_id], function(err) {
    callback(err, { id: this.lastID, user_id, beat_id });
  });
}

function updatefavorite(id,user_id, beat_id, callback) {
  db.run('UPDATE favorites SET user_id = ?, beat_id = ?  WHERE id = ?', [user_id, beat_id, id], function(err) {
    callback(err, this.changes);
  });
}

function deletefavorite(id, callback) {
  db.run('DELETE FROM favorites WHERE id = ?', [id], function(err) {
    callback(err, this.changes);
  });
}
module.exports = { 
    createfavoritesTable,
    createfavorite,
    getAllfavorites,
    getFavoriteById,
    updatefavorite,
    deletefavorite
 };
