const Role = require('../models/role');
const Usuario = require('../models/usuario'); //la u mayuscula me permite crear instancias de este modelo


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
           throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const emailExiste = async (correo = '') => {

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo: correo });
    if (existeEmail){
        throw new Error(`El correo ${correo} ya está registrado.`)
        }
    }

const existeUsuarioPorId = async (id = '') => {

    //verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`El id ${id} no existe.`)
        }
    }



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}