const ServicioPago = require('../models/pago-servicio');


 const getServiciosPagos = async (req,res) =>{

    const {id_servicio,id_usuario} = req.body

    try {
        const serviciosPagos = await ServicioPago.findAll({where: {id_servicio: id_servicio , id_usuario: id_usuario}});
        res.json({serviciosPagos})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador' 
        })
    }

    

}

 const getServicioPago = async(req,res) =>{

    const {id} = req.params;
    const {id_usuario} = req.body

        const servicioPago= await ServicioPago.findAll({ where: { id_servicio: id  ,id_usuario: id_usuario} });
         if (servicioPago.length>0) {
            res.json(servicioPago)
         } else {
            res.status(400).json({
                msg: `Datos no encontrados.`
            })
         }
    

}

 const postServicioPago = async (req,res) =>{

    const {body} = req;
    try {

       const servicioPago =  ServicioPago.build(body);
       await servicioPago.save();
       res.json(servicioPago)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

 const putServicioPago = async(req,res) =>{

    const {id} = req.params;
    const {body} = req;

    try {

        const servicioPago = await ServicioPago.findByPk(id);
        if (!servicioPago) {
            return res.status(404).json({
                msg:'No existe un pago con el id ' + id
            });
        }
        await servicioPago.update(body)

        res.json(servicioPago)
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

 const deleteServicioPago= async(req,res) =>{

    const {id} = req.params;


    try {

        const servicioPago = await ServicioPago.findByPk(id);
        if (!servicioPago) {
            return res.status(404).json({
                msg:'No existe un pago con el id ' + id
            });
        }
        
        await servicio.destroy();

        res.json({
            msg: 'Fue borrado el pago exitosamente',
            servicio})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {getServicioPago,getServiciosPagos,deleteServicioPago,postServicioPago,putServicioPago}