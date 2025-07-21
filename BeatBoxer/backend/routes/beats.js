const express = require('express');
const router = express.Router();
const Beat = require('../models/beat');

router.get('/', (req, res) => {
  Beat.getAllBeats((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name, artist } = req.body;
  if (!name) return res.status(400).json({ error: 'Falta nombre' });

  Beat.createBeat(name, artist, (err, beat) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(beat);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, artist } = req.body;
  if (!name || !artist) return res.status(400).send('Faltan campos');

  Beat.updateBeat(id, name, artist, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).send('No encontrado');
    res.send('Actualizado');
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Beat.deleteBeat(id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).send('No encontrado');
    res.send('Eliminado');
  });
});

module.exports = router;
