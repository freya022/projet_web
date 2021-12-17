const {sequelize, DataTypes} = require('./../BDD.js')

const articlePiece = sequelize.define(
    "ArticlePiece",
    {
        idArticle: {type: DataTypes.INTEGER, primaryKey: true} //TODO ajouter attributs
    },
    {
        tableName: "articlepiece",
        timestamps: false
    }
);

module.exports = {
    articlePiece
}