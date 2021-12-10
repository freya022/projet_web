const {sequelize, DataTypes} = require('./../BDD.js');

const magasin = sequelize.define('magasin', {
    idMagasin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    ville: {
        type: DataTypes.STRING,
        allowNull: false
    },

    reparation: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,

    },

    telephone: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'magasin',
    timestamps: false
});

module.exports = {
    magasin
}