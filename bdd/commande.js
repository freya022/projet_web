const {sequelize, DataTypes} = require('./../BDD.js')

const commande = sequelize.define("Commande", {
        idCommande: {type: DataTypes.INTEGER, primaryKey: true},
        nomArticle: {type: DataTypes.TEXT, references: {model: 'Article', key: 'nomArticle'}},
        prix: {type: DataTypes.FLOAT, references: {model: 'Article', key: 'prix'}},
        quantite: DataTypes.INTEGER,
        prixCommande: DataTypes.INTEGER,
    },
    {
        tableName: "Commande",
        timestamps: false
    }
);

module.exports = {
    commande
}
