const {sequelize, DataTypes} = require('./../BDD.js')

const articles = sequelize.define(
    "Articles",
    {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        nom_articles: DataTypes.TEXT, //nom pour savoir si c'est une pièce ou un vélo
        description: DataTypes.TEXT,
        prix: DataTypes.FLOAT,
    },
    {
        tableName: "articles",
        timestamps: false
    }
);

module.exports = {
    articles
}

