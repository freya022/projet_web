const {sequelize, DataTypes} = require('./../BDD.js')

const commande = sequelize.define("Commande", {
        idCommande: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        idArticle: DataTypes.INTEGER,
        idClient: DataTypes.INTEGER
    },
    {
        tableName: "Commande",
        timestamps: false
    }
);

module.exports = {
    commande
}
