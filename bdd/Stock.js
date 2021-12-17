const {sequelize, DataTypes} = require('./../BDD.js')

const stock = sequelize.define('Stock', {
    idArticle: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    quantiteDispo: DataTypes.INTEGER,
    quantiteMin: DataTypes.INTEGER
}, {
    tableName: 'Stock',
    timestamps: false
});

module.exports = {
    stock
}