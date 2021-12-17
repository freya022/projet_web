const {sequelize, DataTypes} = require('./../BDD.js')

const article = sequelize.define(
    "ArticlePiece",
    {
        idArticle: {type: DataTypes.INTEGER, primaryKey: true},
    },
    {
        tableName: "article",
        timestamps: false
    }
);

module.exports = {
    article
}