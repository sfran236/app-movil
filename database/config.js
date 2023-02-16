const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize('app-movil','dba','123',{
    host: 'localhost',
    dialect: 'postgres',
    schema : 'dba',
    define: {
        timestamps: false
    },
    logging:false
});

module.exports = {dbConnection} 