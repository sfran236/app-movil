
const {Router } = require('express');
const { check } = require('express-validator');
const { getUsuario,getUsuarios,deleteUsuario,postUsuario,putUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/', getUsuarios);

router.get('/:id',getUsuario);
  
router.put('/:id', putUsuario);

router.post('/', [
    check('nombre','el nombre es obligatorio').not().isEmpty(), 
    check('contraseña','el password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    validarCampos
] ,postUsuario);

router.delete('/:id',[
    validarJWT,
    validarCampos
], deleteUsuario);



module.exports = router;
