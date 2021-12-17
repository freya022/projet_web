const {sequelize, DataTypes} = require('./../BDD.js')

const reapprovisionnement = sequelize.define('Reapprovisionnement', {
    idReapprovisionnement: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    idArticle: DataTypes.INTEGER,
    idStock: DataTypes.INTEGER,
    quantite: DataTypes.INTEGER
}, {
    timestamps: false,
    tableName: 'Reapprovisionnement'
});

module.exports = {
    reapprovisionnement
}