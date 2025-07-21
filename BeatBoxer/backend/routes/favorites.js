const express = require('express');
const router = express.Router();
const favorites = require('../models/favorites');

router.get('/', (req, res) => {
  favorites.getAllfavorites((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET /users/:id - obtener un favorio por id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  favorites.getFavoriteById(id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'favorito no encontrado' });
    res.json(user);
  });
});


router.post('/', (req, res) => {
  const { user_id, beat_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'Falta user_id' });

  favorites.createfavorite(user_id, beat_id, (err, favorites) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(favorites);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { user_id, beat_id } = req.body;
  if (!user_id || !beat_id) return res.status(400).send('Faltan campos');

  favorites.updatefavorite(id, user_id, beat_id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).send('No encontrado');
    res.send('Actualizado');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  favorites.deletefavorite(id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).send('No encontrado');
    res.send('Eliminado');
  });
});

module.exports = router;
