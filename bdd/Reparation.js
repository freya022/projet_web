const {sequelize, DataTypes} = require('./../BDD.js')

const reparation = sequelize.define("Reparation", {
        idReparation: {type: DataTypes.INTEGER, primaryKey: true},
        idArticle: {type: DataTypes.INTEGER, references: {model: 'Article', key: 'idArticle'}},
        idMagasin: {type: DataTypes.INTEGER, references: {model: 'Magasin', key: 'idMagasin'}},
        prix: DataTypes.FLOAT,
        tempsReparation: DataTypes.TEXT
    },
    {
        tableName: "Reparation",
        timestamps: false
    }
);

module.exports = {
    reparation
}
