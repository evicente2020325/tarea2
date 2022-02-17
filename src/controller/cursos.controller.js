const Curso = require('../models/cursos.model');

function AgregarCurso(req, res) {
    var parametros = req.body;
    var modeloCurso = new Curso();

    if (parametros.nombreCurso && parametros.idMaestro){

        modeloCurso.nombreCurso = parametros.nombreCurso;
        modeloCurso.idMaestro = parametros.idMaestro;
     
        modeloCurso.save((e, cursoGuardado) => {
            return res.send({ cursos : cursoGuardado});
        })
    }else {
        return res.send({ mensaje: "Debe llenar todos los parametros." })
    }
}   

function EditarCurso(req, res) {
    var idCur = req.params.idCurso;
    var parametros = req.body;

    Curso.findByIdAndUpdate(idCur, parametros, {new:true}, (e,cursoEditado) => {
        if (e) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!cursoEditado) return res.status(404).send({mensaje:'Error al editar el curso'});

        return res.status(200).send({curso: cursoEditado});
    })
}

function EliminarCurso(req, res) {
    var idCur = req.params.idCurso;

    Curso.findByIdAndDelete(idCur, (e, cursoEliminado) => {
        if(e) res.status(500).send({mensaje : 'Error de la peticion'});

        if(!cursoEliminado) return res.status(500)
        .send({ mensaje: 'Error al eliminar el curso' })

        return res.status(200).send({ curso: cursoEliminado});
    })
}



module.exports = {
    AgregarCurso,
    EditarCurso,
    EliminarCurso
}