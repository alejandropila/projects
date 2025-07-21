const db = require('../db');

function createUsersTable() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists');
    }
  });
}

function getAllUsers(callback) {
  db.all('SELECT * FROM users', [], callback);
}

function getUserById(id, callback) {
  db.get('SELECT * FROM users WHERE id = ?', [id], callback);
}

function createUser(username, email, password, callback) {
  db.run('INSERT INTO users(username, email, password) VALUES (?, ?, ?)', [username, email, password], function(err) {
    callback(err, { id: this.lastID, username, email });
  });
}

function updateUser(id,username, email, password, callback) {
  db.run('UPDATE users SET username = ?, email = ?, password = ?  WHERE id = ?', [username, email, password, id], function(err) {
    callback(err, this.changes);
  });
}

function deleteUser(id, callback) {
  db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
    callback(err, this.changes);
  });
}
module.exports = { 
    createUsersTable,
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
 };
