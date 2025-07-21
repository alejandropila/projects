const express = require('express');
const app = express();
const port = 3000;

const { createUsersTable } = require('./models/user');
const { createBeatsTable } = require('./models/beat');
const { createfavoritesTable } = require('./models/favorites');

const beatsRouter = require('./routes/beats');
const usersRouter = require('./routes/users');
const favoritesRouter = require('./routes/favorites');

app.use(express.json());
app.use('/beats', beatsRouter);
app.use('/users', usersRouter);
app.use('/favorites', favoritesRouter);

// Crear tablas al iniciar
createUsersTable();
createBeatsTable();
createfavoritesTable();

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
