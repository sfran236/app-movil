
const {usuario} = require('../models/usuario');

const existeEmailDB = async(correo = '') => {
    const existeEmail = await usuario.findByPk({correo});
        if (existeEmail) {
        // return res.status(400).json({
        //     msg: 'El correo '+correo+' ya esta registrado'
        // })
        throw new Error('El correo '+correo+' ya esta registrado')
        }
    }

const existeUsuarioPorID = async(id) => {
    const existeUsuario = await usuario.findByPk(id);
        if (!existeUsuario) {
        throw new Error('El id '+id+' no existe')
        }  
    }




module.exports = {
    existeEmailDB,
    existeUsuarioPorID,
}