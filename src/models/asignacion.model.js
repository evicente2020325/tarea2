const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AsignacionSchema = new Schema({
    idAlumno: String,
    idMaestro: String
})

module.exports = mongoose.model('Curso', AsignacionSchema);