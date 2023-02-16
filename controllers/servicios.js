const Servicio = require('../models/servicio');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

 const getServicios = async (req,res) =>{

    const {nombre_servicio} = req.body

    try {
        const servicios = await Servicio.findAll({
            where: {
              nombre:{[Op.iLike]: nombre_servicio} 
            }
          });
        res.json({servicios})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador' 
        })
    }

    

}

 const getServicio = async(req,res) =>{

    const {id} = req.params;

        const servicio= await Servicio.findByPk(id);
         if (servicio) {
            res.json(servicio)
         } else {
            res.status(404).json({
                msg: `No existe un servicio con el id ${id}`
            })
         }
    

}

 const postServicio = async (req,res) =>{

    const {body} = req;
    try {

       const servicio =  Servicio.build(body);
       await servicio.save();
       res.json(servicio)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

 const putServicio = async(req,res) =>{

    const {id} = req.params;
    const {body} = req;

    try {

        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg:'No existe un servicio con el id ' + id
            });
        }
        await servicio.update(body)

        res.json(servicio)
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

 const deleteServicio= async(req,res) =>{

    const {id} = req.params;


    try {

        const servicio = await Servicio.findByPk(id);
        if (!servicio) {
            return res.status(404).json({
                msg:'No existe un servicio con el id ' + id
            });
        }
        
        await servicio.destroy();

        res.json({
            msg: 'Fue borrado el servicio exitosamente',
            servicio})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {getServicio,getServicios,deleteServicio,postServicio,putServicio}