const {sequelize, DataTypes} = require('./../BDD.js')

const ArticleVelo = sequelize.define(
    "ArticleVelo",
    {
        idVelo: {type: DataTypes.INTEGER, primaryKey: true},
        typeVelo: DataTypes.TEXT,
        tailleVelo: DataTypes.TEXT,
        poidsVelo: DataTypes.FLOAT,
    },
    {
        tableName: "ArticleVelo",
        timestamps: false
    }
);

module.exports = {
    ArticleVelo
}

