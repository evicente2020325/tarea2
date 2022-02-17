const express = require('express');
const controladorCursos = require('../controller/cursos.controller');

const api = express.Router();

api.post('/agregarCurso',controladorCursos.AgregarCurso);
api.put('/editarCurso/:idCurso',controladorCursos.EditarCurso);
api.delete('/eliminarCurso/:idCurso',controladorCursos.EliminarCurso);

module.exports = api;