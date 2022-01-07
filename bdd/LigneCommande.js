const {sequelize, DataTypes} = require('./../BDD.js')

const ligneCommande = sequelize.define("LigneCommande", {
        idLigneCommande: {type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true},
        idCommande: {type: DataTypes.INTEGER},
        idArticle: {type: DataTypes.INTEGER},
        quantite: DataTypes.INTEGER
    }, {
        tableName: "LigneCommande",
        timestamps: false
    }
);

module.exports = {
    ligneCommande
}
