const {Router } = require('express');
const { check } = require('express-validator');
const {login,logout} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('contraseña','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

router.post('/logout',logout );



module.exports = router;