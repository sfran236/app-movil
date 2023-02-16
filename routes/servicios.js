
const {Router } = require('express');
const { check } = require('express-validator');
const { getServicios, getServicio, putServicio, postServicio, deleteServicio } = require('../controllers/servicios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/', getServicios);

router.get('/:id',getServicio);
  
router.put('/:id',[
    check('nombre','el nombre es obligatorio').not().isEmpty(), 
    validarCampos
], putServicio);

router.post('/', [
    check('nombre','el nombre es obligatorio').not().isEmpty(), 
    validarCampos
] ,postServicio);

router.delete('/:id',[
    validarJWT,
    validarCampos
], deleteServicio);



module.exports = router;
