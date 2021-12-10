const {sequelize, DataTypes} = require('./../BDD.js')

const reparation = sequelize.define(
    "Reparation",
    {
        idReparation: {type: DataTypes.INTEGER, primaryKey: true},
        articleReparation: {type: DataTypes.TEXT, references: {model: 'Articles', key: 'nom_article'}},
        magasinReparation: {type: DataTypes.TEXT, references: {model: 'magasin', key: 'nomMagasin'}},
        prix: DataTypes.FLOAT,
        tempsReparation: DataTypes.TEXT,
    },
    {
        tableName: "Reparation",
        timestamps: false
    }
);

module.exports = {
    reparation
}
