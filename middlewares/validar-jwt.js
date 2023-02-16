const { response } = require("express")
const jwt = require("jsonwebtoken")
const Usuario = require("../models/usuario")


const validarJWT = async (req,res = response,next) =>{
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);


        // req.usuarioaut = await Usuario.find({_id:uid})
        // console.log('ide del token' , uid , token)
        req.usuarioaut = await Usuario.findByPk(uid)


        if(!req.usuarioaut){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe'
            })
        }

    
    
       req.id = uid;
       
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
    
}

module.exports = {
    validarJWT
}