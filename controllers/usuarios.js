const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


 const getUsuarios = async (req,res) =>{

    try {
        const usuarios = await Usuario.findAll();
        res.json({usuarios})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador' 
        })
    }

    

}

 const getUsuario = async(req,res) =>{

    const {id} = req.params;

        
        const usuario= await Usuario.findByPk(id);
         if (usuario) {
            res.json(usuario)
         } else {
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            })
         }
    

}

 const postUsuario = async (req,res) =>{

    const {body} = req;
    try {

        const existeEmail = await Usuario.findOne({
            where:{
                correo: body.correo
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el email ${body.correo}`
            })
        }

        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        body.contraseña = bcryptjs.hashSync(body.contraseña,salt);

       const usuario =  Usuario.build(body);
       await usuario.save();
       res.json(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

 const putUsuario = async(req,res) =>{

    const {id} = req.params;
    const {body} = req;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg:'No existe un usuario con el id ' + id
            });
        }
        await usuario.update(body)

        res.json(usuario)
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

 const deleteUsuario = async(req,res) =>{

    const {id} = req.params;


    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg:'No existe un usuario con el id ' + id
            });
        }
        
        // await usuario.destroy();
        await usuario.update({estado: 'I'})

        res.json({
            msg: 'Fue borrado el usuario exitosamente',
            usuario})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {getUsuario,getUsuarios,deleteUsuario,postUsuario,putUsuario}