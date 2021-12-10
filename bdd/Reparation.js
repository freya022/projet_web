const {sequelize, DataTypes} = require('./../BDD.js')

const reparation = sequelize.define(
    "Reparation",
    {
        id_reparation: {type: DataTypes.INTEGER, primaryKey: true},
        article_reparation: {type: DataTypes.TEXT, references: {model: 'Articles', key: 'nom_article'}},
        magasin_reparation: {type: DataTypes.TEXT, references: {model: 'magasin', key: 'nomMagasin'}},
        prix: DataTypes.FLOAT,
        temps_reparation: DataTypes.TEXT,
    },
    {
        tableName: "Reparation",
        timestamps: false
    }
);

module.exports = {
    reparation
}
