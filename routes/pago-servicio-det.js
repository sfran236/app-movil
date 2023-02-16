
const {Router } = require('express');
const { postServicioPagoDet, getServicioPagoDet, getServiciosPagosPorServicio } = require('../controllers/pago-servicio-det');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();


router.post('/', [
    validarJWT,
    validarCampos
] ,postServicioPagoDet);

router.get('/', [
    validarJWT,
    validarCampos
] ,getServicioPagoDet);

router.get('/:id', [
    validarJWT,
    validarCampos
] ,getServiciosPagosPorServicio);



module.exports = router;
