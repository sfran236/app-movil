const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const pago_servicio = dbConnection.define('pago_servicios',{
    id_pago: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_servicio: {
        type: DataTypes.INTEGER
    },
    id_usuario: {
        type: DataTypes.INTEGER
    },
    nro_ref: {
        type: DataTypes.STRING
    },
    monto_total: {
        type: DataTypes.NUMBER
    },
    saldo: {
        type: DataTypes.NUMBER
    },
});

module.exports = pago_servicio