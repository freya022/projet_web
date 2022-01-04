const {sequelize, DataTypes} = require('./../BDD.js')

const commande = sequelize.define("Commande", {
        idCommande: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        idClient: DataTypes.INTEGER,
        fini: DataTypes.BOOLEAN
    }, {
        tableName: "Commande",
        timestamps: false
    }
);

module.exports = {
    commande
}
