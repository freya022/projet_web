const {sequelize, DataTypes} = require('./../BDD.js')

const ligneCommande = sequelize.define("LigneCommande", {
        idCommande: {type: DataTypes.INTEGER, primaryKey: true},
        idArticle: {type: DataTypes.INTEGER, primaryKey: true},
        quantite: DataTypes.INTEGER
    },
    {
        tableName: "LigneCommande",
        timestamps: false
    }
);

module.exports = {
    ligneCommande
}
