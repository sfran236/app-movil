const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const usuario = dbConnection.define('usuarios',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    contraseña: {
        type: DataTypes.STRING
    },
    nro_documento: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "A"
    },
    saldo: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    
});

module.exports = usuario