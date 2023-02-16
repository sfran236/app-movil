
const {Router } = require('express');
const { check } = require('express-validator');
const { putServicioPago, postServicioPago, deleteServicioPago, getServiciosPagos, getServicioPago } = require('../controllers/pago-servicio');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
], getServiciosPagos);

router.get('/:id',[
    validarJWT,
    validarCampos
],getServicioPago);
  
router.put('/:id',[
    validarJWT,
    validarCampos
], putServicioPago);

router.post('/', [
    // check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarJWT, 
    validarCampos
] ,postServicioPago);

// router.delete('/:id',[
//     validarJWT,
//     validarCampos
// ], deleteServicioPago);



module.exports = router;
