const {sequelize, DataTypes} = require('./../BDD.js')

const ArticleVelo = sequelize.define(
    "ArticleVelo",
    {
        idArticle: {type: DataTypes.INTEGER, primaryKey: true, references: {model: 'Article', key: 'idArticle'}},
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

