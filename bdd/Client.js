const {sequelize, DataTypes} = require('./../BDD.js')

const client = sequelize.define("Client", {
        idClient: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nom: DataTypes.TEXT,
        mdp: DataTypes.TEXT
    },
    {
        tableName: "client",
        timestamps: false
    }
);

module.exports = {
    client
}
