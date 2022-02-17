const express = require('express');
const app = express();
const cors = require('cors');

//Importacion de rutas
const usuariosRoutes = require('./src/routes/usuarios.routes');
const cursosRoutes = require('./src/routes/cursos.routes');


app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', usuariosRoutes, cursosRoutes);

module.exports = app;