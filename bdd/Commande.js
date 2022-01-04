const {sequelize, DataTypes} = require('./../BDD.js')

const commande = sequelize.define("Commande", {
        id_commande: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        id_client: DataTypes.INTEGER,
        fini: DataTypes.BOOLEAN
    }, {
        tableName: "Commande",
        timestamps: false
    }
);

module.exports = {
    commande
}
