const {sequelize, DataTypes} = require('./../BDD.js');

const livraison = sequelize.define('livraison', {
    idLivraison: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    dateLivraisonPrevu: {
        type: DataTypes.DATE,
    },

    dateArrive: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'livraison',
    timestamps: false
});

module.exports = {
    livraison
}