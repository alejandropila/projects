const express = require('express');
const router = express.Router();

const {
  createUsersTable,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../models/user');

// Asegurarse que la tabla exista al cargar el router
createUsersTable();

// GET /users - lista todos los usuarios
router.get('/', (req, res) => {
  getAllUsers((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /users/:id - obtener un usuario por id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  getUserById(id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  });
});

// POST /users - crear nuevo usuario
router.post('/', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  createUser(username, email, password, (err, user) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint')) {
        return res.status(409).json({ error: 'Usuario o email ya existe' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(user);
  });
});

// PUT /users/:id - actualizar usuario
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  updateUser(id, username, email, password, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado' });
  });
});

// DELETE /users/:id - eliminar usuario
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  deleteUser(id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  });
});

module.exports = router;
