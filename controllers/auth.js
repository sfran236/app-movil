const bcryptjs = require('bcryptjs');
const{response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login = async (req,res = response) =>{

    const {correo, contraseña} = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ where: { correo: correo } });
        if (!usuario){
            return res.status(400).json({
                msg: 'El Usuario o contraseña son incorrectos'
            })
        }

        //si el usuario esta activo
        if (usuario.estado === 'I'){
            return res.status(400).json({
                msg: 'El usuario '+ usuario.nombre +' esta inactivo.'
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(contraseña,usuario.contraseña)
        if (!validPassword){
            return res.status(400).json({
                msg: 'El Usuario o contraseña son incorrectos'
            });
        }

        //generar el JWT (Json web token)
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const logout = async (req,res = response) =>{

    res.json({
        msg: 'Sesion cerrada.'
    })
}



module.exports = {login,logout};