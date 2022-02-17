const Usuarios = require('../models/usuarios.model')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../services/jwt');

function Registrar(req, res) {
    var parametros = req.body;
    var modeloUsuario = new Usuarios();

    if(parametros.nombre && parametros.apellido && parametros.email
        && parametros.password) {
            Usuarios.find({ email : parametros.email }, (e, usuarioEncontrados) => {
                if ( usuarioEncontrados.length > 0 ){ 
                    return res.status(500)
                        .send({ mensaje: "Este correo ya se encuentra utilizado" })
                } else {
                    modeloUsuario.nombre = parametros.nombre;
                    modeloUsuario.apellido = parametros.apellido;
                    modeloUsuario.email = parametros.email;
                    modeloUsuario.password = parametros.password;
                    modeloUsuario.rol = 'ALUMNO'; 
                    
                    modeloUsuario.save((e, usuarioGuardado)=>{

                        bcrypt.hash(parametros.password, null, null, (e, passwordEncriptada) => {
                            modeloUsuario.password = passwordEncriptada;
    
                            modeloUsuario.save((e, usuarioGuardado)=>{
                                if(e) return res.status(500)
                                    .send({ mensaje : 'Error en la peticion' })
                                if(!usuarioGuardado) return res.status(500)
                                    .send({ mensaje: 'Error al guardar el Usuario' })
        
                                return res.status(200).send({ usuario: usuarioGuardado})
                            })
                        })                        
                    })
                }
            })
    } else {
        return res.status(404)
            .send({ mensaje : 'Debe ingresar los parametros obligatorios'})
    }

}

function Login(req, res) {
    var parametros = req.body;

    Usuarios.findOne({ email : parametros.email }, (err, usuarioEncontrado) => {
        if(e) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (e, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200)
                            .send({ token: jwt.crearToken(usuarioEncontrado) })
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'La contrasena no coincide.'})
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'El usuario, no se ha podido identificar'})
        }
    })
}

function EditarPerfil(req, res) {
    var idAlum = req.params.id;
    var parametros = req.body;

    Curso.findByIdAndUpdate(idAlum, parametros, {new:true}, (e,perfilEditado) => {
        if (e) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!perfilEditado) return res.status(404).send({mensaje:'Error al editar el curso'});

        return res.status(200).send({perfil: perfilEditado});
    })
}

module.exports = {
    Registrar,
    Login,
    EditarPerfil
}