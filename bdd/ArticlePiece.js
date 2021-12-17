const {sequelize, DataTypes} = require('./../BDD.js')

const article = sequelize.define(
    "ArticlePiece",
    {
        idArticle: {type: DataTypes.INTEGER},
    },
    {
        tableName: "articlepiece",
        timestamps: false
    }
);

module.exports = {
    article
}