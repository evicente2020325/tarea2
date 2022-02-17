const express = require('express');
const controladorUsuario = require('../controller/usuarios.controller');

const api = express.Router();

api.post('/registrar', controladorUsuario.Registrar);
api.post('/login', controladorUsuario.Login);
module.exports = api;