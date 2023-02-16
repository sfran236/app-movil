const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const pago_servicio_det = dbConnection.define('pago_servicios_det',{
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    linea: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        defaultValue: 1
    },
    monto: {
        type: DataTypes.NUMBER
    },
    fecha_pago: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW 
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
    id_servicio: {
        type: DataTypes.INTEGER
    },
});

module.exports = pago_servicio_det