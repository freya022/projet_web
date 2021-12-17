const {sequelize, DataTypes} = require('./../BDD.js')

const article = sequelize.define(
    "ArticlePiece",
    {
        idArticle: {type: DataTypes.INTEGER} //TODO ajouter attributs
    },
    {
        tableName: "articlepiece",
        timestamps: false
    }
);

module.exports = {
    article
}