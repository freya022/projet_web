const {sequelize, DataTypes} = require('./../BDD.js')

const articleVelo = sequelize.define(
    "ArticleVelo",
    {
        idArticle: {type: DataTypes.INTEGER, primaryKey: true},
        typeVelo: DataTypes.TEXT,
        tailleVelo: DataTypes.TEXT,
        poidsVelo: DataTypes.FLOAT
    },
    {
        tableName: "ArticleVelo",
        timestamps: false
    }
);

module.exports = {
    articleVelo
}

