const ServicioPago = require('../models/pago-servicio');
const ServicioPagoDet = require('../models/pago-servicio-det');
const Usuario = require('../models/usuario');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;



 const postServicioPagoDet = async (req,res) =>{

    const {id_servicio,id_usuario,nro_ref,monto,monto_deuda_total} = req.body;
    try {

        const servicioPago = await ServicioPago.findOne({ where: { id_servicio: id_servicio  ,id_usuario: id_usuario, nro_ref: nro_ref ,monto_total: monto_deuda_total} });
       
        if (!servicioPago) {
           return res.status(400).json({
               msg:'Usted no tiene un pago a realizar. '
           });
       }
       const usuario = await Usuario.findByPk(id_usuario)

       if (usuario.saldo < monto) {
        return res.status(400).json({
            msg:'Usted no tiene saldo para realizar la operacion.'
        });
   }

       if (servicioPago.saldo < monto) {
            return res.status(400).json({
                msg:'El monto a pagar supera el saldo de la deuda.'
            });
       }
       servicioPago.saldo = servicioPago.saldo - monto
       usuario.saldo = usuario.saldo - monto
      
       req.body['id_pago'] = servicioPago.id_pago;

       const servicioPagoDet =  ServicioPagoDet.build(req.body);
       
       console.log('ser',servicioPagoDet)
       await servicioPagoDet.save();
 
       await servicioPago.save();
       await usuario.save();

       

       res.json(servicioPagoDet)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const getServicioPagoDet = async (req,res) =>{

    let {id_usuario,fecha_ini,fecha_fin} = req.body

    fecha_ini = new Date(fecha_ini)
    fecha_fin = new Date(fecha_fin)
    

    const servicioPagoDet = await ServicioPagoDet.findAll({ where: {  id_usuario: id_usuario , fecha_pago: { [Op.between]: [fecha_ini,fecha_fin] }} });
 

    if (!servicioPagoDet.length>0) {
        return res.status(400).json({
            msg:'Datos no encontrados.'
        }); 
    }
    res.json(servicioPagoDet)

}

const getServiciosPagosPorServicio = async (req,res) =>{
    const {id} = req.params
    const {id_usuario} = req.body

    const servicioPagoDet = await ServicioPagoDet.findAll({ where: { id_servicio: id  ,id_usuario: id_usuario} });
 

    if (!servicioPagoDet.length>0) {
        return res.status(400).json({
            msg:'Datos no encontrados.'
        }); 
    }
    res.json(servicioPagoDet)

}


module.exports = {postServicioPagoDet,getServicioPagoDet,getServiciosPagosPorServicio}