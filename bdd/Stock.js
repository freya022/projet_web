const {sequelize, DataTypes} = require('./../BDD.js')

const stock = sequelize.define('Stock', {
    idArticle: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nom: DataTypes.TEXT,
    description: DataTypes.TEXT,
    prix: DataTypes.NUMERIC,
    typeVelo: DataTypes.TEXT,
    quantiteDispo: DataTypes.INTEGER,
    quantiteMin: DataTypes.INTEGER
}, {
    tableName: 'Stock'
});

module.exports = {
    stock
}