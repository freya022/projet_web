const config = require('./Config.js')
const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(config.databaseName, config.user, config.password, {
    port: config.port,
    host: 'localhost',
    dialect: "postgres"
});

module.exports = {
    sequelize
}