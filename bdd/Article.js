const {sequelize, DataTypes} = require('./../BDD.js')

const article = sequelize.define(
    "Article",
    {
        idArticle: {type: DataTypes.INTEGER, primaryKey: true},
        nomArticle: DataTypes.TEXT,
        categorie: DataTypes.TEXT,
        description: DataTypes.TEXT,
        lienImage: DataTypes.TEXT,
        prix: DataTypes.FLOAT,
    },
    {
        tableName: "article",
        timestamps: false
    }
);

module.exports = {
    article
}

