const {sequelize, DataTypes} = require('./../BDD.js')

const articles = sequelize.define(
    "Article",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        nomArticles: DataTypes.TEXT, //nom pour savoir si c'est une pièce ou un vélo
        description: DataTypes.TEXT,
        prix: DataTypes.FLOAT,
    },
    {
        tableName: "article",
        timestamps: false
    }
);

module.exports = {
    articles
}

