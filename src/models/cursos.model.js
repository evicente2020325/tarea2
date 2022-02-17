const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = new Schema({
    nombreCurso: String,
    idMaestro: String
})

module.exports = mongoose.model('Curso', CursoSchema);