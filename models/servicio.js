const { DataTypes } = require("sequelize");
const { dbConnection } = require("../database/config");

const servicio = dbConnection.define('servicios',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
});

module.exports = servicio