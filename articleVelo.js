const {sequelize, DataTypes} = require('./../BDD.js')

const ArticleVelo = sequelize.define(
    "ArticleVelo",
    {
        idArticle: {type: DataTypes.INTEGER, primaryKey: true},
        nomVelo: DataTypes.TEXT,
        descriptionVelo: DataTypes.TEXT,
        tailleVelo: DataTypes.TEXT,
        poidsVelo: DataTypes.FLOAT,
        prix: DataTypes.FLOAT,
    },
    {
        tableName: "ArticleVelo",
        timestamps: false
    }
);

module.exports = {
    ArticleVelo
}

