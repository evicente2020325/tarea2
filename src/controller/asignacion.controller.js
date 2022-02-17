const Asignacion = require('../models/asignacion.model');

function AsignarCurso(req, res) {
    var idCursos = req.parametros.AsignarCurso;
    var cursosAsignados = new Asignacion;

    Asignacion.find({idAlumno: req.user.id.sub}, (err, AsignacionCurso) => {
        if(AsignacionCurso.length <= 3){
            return res.status(500).send({mensaje : "Ya tienes asignado 3 cursos."})
        }else{
            Asignacion.findOne({
                idAlumno: req.user.sub,
                idCurso: idCursos


            }, (e, cursosEncontrados) => {
                if(!cursosEncontrados){
                    cursosAsignados.idAlumno = req.user.sub;
                    cursosAsignados.idCurso = idCursos;

                    modeloAsignacion.save((e, AsignacionBuena) => {
                        if(e) return res.status(500).send({mensaje : 'Error de peticion'})
                        if(!AsignacionBuena)return res.status(500).send({mensaje : 'Error al guardar usuario'})
                        return res.status(500).send({ asignacion: AsignacionBuena })
                    })
                }else{
                    return res.status(500).send({mensaje : 'Ya estas asignado a esta clase.'})
                }
            })
        }
    })
    
}


module.exports = {
    AsignarCurso
}